package controllers

import (
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/man-droid23/todo-app/dto/requests"
	"github.com/man-droid23/todo-app/models"
)

func GetTodos(c *fiber.Ctx) error {
	return c.Status(http.StatusOK).JSON(models.Todos)
}

func GetTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	i, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(400).SendString("Invalid ID")
	}
	for _, todo := range models.Todos {
		if todo.ID == i {
			return c.Status(http.StatusOK).JSON(todo)
		}
	}
	return c.Status(404).SendString("Todo not found")
}

func AddTodo(c *fiber.Ctx) error {
	var todo requests.TodoRequest
	if err := c.BodyParser(&todo); err != nil {
		return c.Status(400).SendString("Invalid data")
	}
	if err := todo.Validate(); err != nil {
		return c.Status(400).SendString("Invalid data")
	}
	models.Todos = append(models.Todos, models.Todo{
		ID:    len(models.Todos) + 1,
		Title: todo.Title,
		Body:  todo.Body,
		Done:  false,
	})
	return c.Status(201).SendString("Todo added")
}

func DeleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	i, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(400).SendString("Invalid ID")
	}
	for index, todo := range models.Todos {
		if todo.ID == i {
			models.Todos = append(models.Todos[:index], models.Todos[index+1:]...)
			return c.Status(200).SendString("Todo deleted")
		}
	}
	return c.Status(404).SendString("Todo not found")
}

func UpdateTodo(c *fiber.Ctx) error {
	var todo requests.TodoRequest
	if err := c.BodyParser(&todo); err != nil {
		return c.Status(400).SendString("Invalid data")
	}
	if err := todo.Validate(); err != nil {
		return c.Status(400).SendString("Invalid data")
	}
	id := c.Params("id")
	i, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(400).SendString("Invalid ID")
	}
	for index, t := range models.Todos {
		if t.ID == i {
			models.Todos[index].Title = todo.Title
			models.Todos[index].Body = todo.Body
			return c.Status(200).SendString("Todo updated")
		}
	}
	return c.Status(404).SendString("Todo not found")
}

func DoneTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	i, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(400).SendString("Invalid ID")
	}
	for index, todo := range models.Todos {
		if todo.ID == i {
			models.Todos[index].Done = true
			return c.Status(200).SendString("Todo done")
		}
	}
	return c.Status(404).SendString("Todo not found")
}
