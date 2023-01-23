package models

type Todo struct {
	ID    int    `json:"id" form:"id"`
	Title string `json:"title" form:"title"`
	Body  string `json:"body" form:"body"`
	Done  bool   `json:"done" form:"done"`
}

var Todos = []Todo{}
