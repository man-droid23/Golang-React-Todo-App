package requests

import "github.com/go-playground/validator/v10"

type TodoRequest struct {
	Title string `json:"title" form:"title"`
	Body  string `json:"body" form:"body"`
}

func (t *TodoRequest) Validate() error {
	validate := validator.New()
	return validate.Struct(t)
}
