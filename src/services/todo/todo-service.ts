import { Todo } from "../../interface/Todo";
import prisma from "../../db";

export const getAllTodosService = async (userId: string) => {
  try {
    return await prisma.task.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        status: true,
        startDate: true,
        endDate: true,
      },
    });
  } catch (e) {
    console.error(`Failed to fetch todos: - ${e}`);
    throw Error(e);
  }
};

export const updateTodoService = async (todo: Todo) => {
  try {
    return await prisma.task.update({
      where: {
        userId: todo.userId,
        id: todo.id,
      },
      data: {
        title: todo.title,
        content: todo.content,
        // @ts-ignore
        status: todo.status,
        startDate: todo.startDate,
        endDate: todo.endDate,
      },
      select: {
        id: true,
      },
    });
  } catch (e) {
    console.error(`Failed to fetch todos: - ${e}`);
    throw Error(e);
  }
};

export const createTodoService = async (todo: Todo) => {
  try {
    const createTodo = await prisma.task.create({
      data: {
        title: todo.title,
        content: todo.content,
        status: "NOT_STARTED",
        startDate: todo.startDate,
        endDate: todo.endDate,
        userId: todo.userId,
      },
      select: {
        id: true,
      },
    });
    return createTodo.id;
  } catch (e) {
    console.error(`Failed to create task: - ${e}`);
    throw Error(e);
  }
};

export const deleteTodoService = async (userId: string, id: string) => {
  try {
    return await prisma.task.delete({
      where: {
        userId: userId,
        id: id,
      },
      select: {
        id: true,
      },
    });
  } catch (e) {
    console.log(`Failed to delete task with id ${id}`);
    throw Error(e);
  }
};
