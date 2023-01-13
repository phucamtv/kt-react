package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"sync"

	"github.com/PuerkitoBio/goquery"
	"patv/src"
)

var (
	client       *http.Client
	cwd          string
	chapChan     chan src.Chapter
	workerSize   = 10
	translations = []string{"NKJV"} // "VI1934", "BD2011", "NVB", "BPT", "BDY", "NKJV", "NIV"
)

func main() {
	ctx := context.Background()
	client = &http.Client{}
	chapChan = make(chan src.Chapter, workerSize)
	wg := sync.WaitGroup{}

	if wd, err := os.Getwd(); nil != err {
		panic(err)
	} else {
		cwd = wd
	}

	// start workers
	for i := 0; i < workerSize; i++ {
		go func(ctx context.Context, worker int) {
			for {
				chap := <-chapChan
				wg.Add(1)

				fmt.Println("worker #", worker, chap.Uri)

				if err := src.CrawlChapter(client, chap, cwd); nil != err {
					fmt.Println("error: ", err.Error())
				}

				wg.Done()
			}
		}(ctx, i)
	}

	// parse translations
	for _, tran := range translations {
		if err := crawl(tran); nil != err {
			panic(err)
		}
	}

	wg.Wait()
}

func crawl(tran string) error {
	uri := "http://kinhthanh.httlvn.org/?v=" + tran

	res, err := client.Get(uri)
	if nil != err {
		return err
	}

	defer res.Body.Close()

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return err
	}

	testament := ""
	group := ""
	// book := ""
	bookNumber := uint(0)

	// .book-list
	// .col-md-6.col-sm-6 (left)
	//      .col-md-12 > h3 "Cựu Ước"
	//      .col-md-12 > h4 "Năm sách Môi-se"
	//      .col-md-12 > h4 "Năm sách Môi-se"
	//      .col-md-12 > span "Sáng Thế Ký"
	//      .col-md-12 > .dropdown.pull-right > ul > li > a "1"
	// .col-md-6.col-sm-6 (right)
	//      h3 Tân Ước

	bookList := doc.Find(".book-list")
	if bookList.Size() == 0 {
		return fmt.Errorf("book list not found")
	}

	bookList.Find(".col-md-6").Each(
		// loop through left & right
		func(i int, column *goquery.Selection) {
			column.Find(".col-md-12").EachWithBreak(
				func(i int, box *goquery.Selection) bool {
					if box.Find("h3").Size() > 0 {
						testament = box.Find("h3").Text()
						group = ""
						// book = ""
					} else if box.Find("h4").Size() > 0 {
						group = box.Find("h4").Text()
						// book = ""
					} else {
						bookName := box.Find("span").Text()
						bookNumber += 1

						box.Find(".dropdown.pull-right > ul > li > a").EachWithBreak(
							func(i int, link *goquery.Selection) bool {
								chapter, _ := strconv.ParseUint(link.Text(), 10, 0)
								uri, _ := link.Attr("href")

								chapChan <- src.Chapter{
									Translation: tran,
									BookNumber:  bookNumber,
									BookName:    bookName,
									Chapter:     uint(chapter),
									Group:       group,
									Testament:   testament,
									Uri:         uri,
								}

								return true
							},
						)

						return true
					}

					return true
				},
			)
		},
	)

	return nil
}
