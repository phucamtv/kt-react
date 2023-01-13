package src

type (
	Chapter struct {
		Testament   string
		Group       string
		Translation string
		BookNumber  uint
		BookName    string
		Chapter     uint
		Uri         string
		Audio       []string
	}
	
	Page struct {
		Translation string
		Group       string `json:"group,omitempty"`
		BookName    string
		BookNumber  uint
		Audio       []string
		Content     string
	}
)
