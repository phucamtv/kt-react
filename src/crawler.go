package src

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

var (
	writeMarkdownOn = false
)

func CrawlChapter(client *http.Client, chap Chapter, baseDir string) error {
	res, err := client.Get("http://kinhthanh.httlvn.org" + chap.Uri)
	if nil != err {
		return err
	}

	defer res.Body.Close()

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		return err
	}

	// parse HTML content
	if content, err := parseContent(doc); nil != err {
		return err
	} else {
		audioLinks := parseAudioLinks(doc)

		return write(baseDir, chap, content, audioLinks)
	}
}

func parseContent(doc *goquery.Document) (string, error) {
	return doc.Find(".bible-read > div").Html()
}

func parseAudioLinks(doc *goquery.Document) []string {
	audioLinks := []string{}
	doc.Find(".audio-collapse > div > audio").Each(
		func(i int, audio *goquery.Selection) {
			path, found := audio.Attr("src")
			if found {
				audioLinks = append(audioLinks, path)
			}
		},
	)

	return audioLinks
}

func write(baseDir string, chap Chapter, content string, audioLinks []string) error {
	dirPath := fmt.Sprintf(baseDir+"/build/%s/%02d", chap.Translation, chap.BookNumber)

	if !IsDir(dirPath) {
		if err := os.MkdirAll(dirPath, 0755); nil != err {
			return err
		}
	}

	if writeMarkdownOn {
		if err := writeMarkdown(dirPath, chap, content, audioLinks); nil != err {
			return err
		}
	}

	if err := writeJson(dirPath, chap, content, audioLinks); nil != err {
		return err
	}

	return nil
}

func writeMarkdown(dirPath string, chap Chapter, content string, audioLinks []string) error {
	fMarkdownPath := fmt.Sprintf("%s/%02d.md", dirPath, chap.Chapter)

	if fMarkdown, err := os.Create(fMarkdownPath); nil != err {
		return err
	} else {
		defer func() {
			defer fMarkdown.Close()
		}()

		_, _ = fMarkdown.WriteString("---\n")
		_, _ = fMarkdown.WriteString("translation: " + chap.Translation + "\n")

		if chap.Group != "" {
			_, _ = fMarkdown.WriteString("group: " + chap.Group + "\n")
		}

		_, _ = fMarkdown.WriteString("bookName: " + chap.BookName + "\n")
		_, _ = fMarkdown.WriteString("bookNumber: " + fmt.Sprintf("%d", chap.BookNumber) + "\n")

		if len(audioLinks) > 0 {
			_, _ = fMarkdown.WriteString("audio: " + strings.Join(audioLinks, "; ") + "\n")
		}

		_, _ = fMarkdown.WriteString("---\n")
		_, _ = fMarkdown.WriteString(content)
	}

	return nil
}

func writeJson(dirPath string, chap Chapter, content string, audioLinks []string) error {
	fJsonPath := fmt.Sprintf("%s/%02d.json", dirPath, chap.Chapter)
	fJson, err := os.Create(fJsonPath)
	if nil != err {
		return err
	} else {
		defer fJson.Close()
	}

	page := Page{
		Translation: chap.Translation,
		Group:       chap.Group,
		BookName:    chap.BookName,
		BookNumber:  chap.BookNumber,
		Audio:       audioLinks,
		Content:     content,
	}

	jsonContent, err := json.MarshalIndent(page, "", "    ")
	if nil != err {
		return err
	} else {
		_, _ = fJson.Write(jsonContent)
	}

	return nil
}
