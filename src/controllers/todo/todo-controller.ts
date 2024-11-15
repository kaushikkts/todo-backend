import {
  createTodoService,
  deleteTodoService,
  getAllTodosService,
  updateTodoService,
} from "../../services/todo/todo-service";
import { Todo } from "../../interface/Todo";

export const createTodoController = async (todo: Todo) => {
  try {
    todo.startDate = new Date(todo.startDate);
    todo.endDate = new Date(todo.endDate);
    return await createTodoService(todo);
  } catch (error) {
    console.error(
      `[Todo Controller] Failed to create todo: - ${error.message}`,
    );
    throw error;
  }
};

export const updateTodoController = async (todo: Todo) => {
  try {
    todo.startDate = new Date(todo.startDate);
    todo.endDate = new Date(todo.endDate);
    return await updateTodoService(todo);
  } catch (error) {
    console.error(
      `[Todo Controller] Failed to update todo: - ${error.message}`,
    );
    throw error;
  }
};

export const getAllTodosController = async (userId: string) => {
  try {
    return await getAllTodosService(userId);
  } catch (error) {
    console.error(
      `[Todo Controller] Failed to fetch todos: - ${error.message}`,
    );
    throw error;
  }
};

export const deleteTodoController = async (userId: string, id: string) => {
  try {
    return await deleteTodoService(userId, id);
  } catch (error) {
    console.error(`[Todo Controller] Failed to delete todo: ${error.message}`);
  }
};
