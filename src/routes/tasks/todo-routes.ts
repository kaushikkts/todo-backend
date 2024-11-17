import { Router } from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodosController,
  updateTodoController,
} from "../../controllers/todo/todo-controller";
import { Todo } from "../../interface/Todo";

const todoRouter: Router = Router();

todoRouter.get("/todos/:userId", async (req, res) => {
  // Fetch todos from database and return them
  const userId = req.params?.userId;
  if (!userId) {
    res.status(400).json({ message: "Invalid user id" });
    return;
  }
  try {
    const todos = await getAllTodosController(userId);
    res.json(todos);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch todos" });
  }
});

todoRouter.patch("/todo", async (req, res) => {
  // Fetch a specific todo from database and return it

  const todoId = req.body?.id;
  const userId = req.body?.userId;
  if (!todoId || !userId) {
    res.status(400).json({ message: "Invalid todo id or user id" });
    return;
  }
  // Implement the logic to update a specific todo from the database and return it
  try {
    const update = await updateTodoController(req.body);
    res.json(update);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Failed to update todo", error: err.message });
  }
}); //

// @ts-ignore
todoRouter.post("/todo", async (req, res) => {
  const todo: Todo = req.body;
  try {
    const id = await createTodoController(todo);
    res.status(201).json({ id });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to create todo", error: err.message });
  }
});

todoRouter.delete("/todo", async (req, res) => {
  const userId = req.body.userId;
  const todoId = req.body.id;
  if (!userId || !todoId) {
    res.status(400).json({ message: "Invalid user id or todo id" });
    return;
  }
  try {
    const deleteResponse = await deleteTodoController(userId, todoId);
    if (!deleteResponse) {
      res.status(400).json({ message: "Todo not found" });
      return;
    }
    res.status(204).send(deleteResponse);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Failed to delete todo", error: e.message });
  }
});

export default todoRouter;
