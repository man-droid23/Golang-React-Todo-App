package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/man-droid23/todo-app/controllers"
)

func TodoRoutes(app *fiber.App) {
	todos := app.Group("/api")
	todos.Get("/todos", controllers.GetTodos)
	todos.Get("/todos/:id", controllers.GetTodo)
	todos.Post("/todos", controllers.AddTodo)
	todos.Delete("/todos/:id", controllers.DeleteTodo)
	todos.Put("/todos/:id", controllers.UpdateTodo)
	todos.Post("/todos/:id/done", controllers.DoneTodo)
}
