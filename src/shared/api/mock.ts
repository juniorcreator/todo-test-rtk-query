import type { IBoard, ITodo } from "@/entities/todo/types.ts";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const database = {
  getData: (key: string) => JSON.parse(localStorage.getItem(key) || "[]"),
  setData: (key: string, data: any) =>
    localStorage.setItem(key, JSON.stringify(data)),
};

export const api = {
  register: async (name: string, email: string, password: string) => {
    await delay(400);
    const users = database.getData("users");
    console.log(users, "users mock.js");

    if (users.find((user: any) => user.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = { id: crypto.randomUUID(), name, email, password };
    console.log(newUser, "newUser mock.js");
    database.setData("users", [...users, newUser]);
  },
  login: async (email: string, password: string) => {
    await delay(500);
    const users = database.getData("users");
    console.log(users, "users login mock.js");
    const user = users.find((user: any) => user.email === email);

    if (!user) {
      throw new Error("User does not exist");
    }
    if (user.password !== password) {
      throw new Error("Wrong password");
    }
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser: async () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  logout: () => {
    localStorage.removeItem("user");
  },
  createBoard: async (title: string) => {
    await delay(500);
    const userStr = localStorage.getItem("user");

    if (!userStr) throw new Error("Not authenticated");
    const user = JSON.parse(userStr);
    const boards = database.getData("boards");

    const newBoard = {
      id: crypto.randomUUID(),
      title,
      ownerId: user.id,
    };

    database.setData("boards", [...boards, newBoard]);
  },
  getBoards: async () => {
    await delay(500);
    const userStr = localStorage.getItem("user");
    if (!userStr) return [];
    const user = JSON.parse(userStr);

    console.log(user, "users mock.js");
    const boards = database.getData("boards");
    console.log(boards, "boards mock.js");

    return boards.filter((board: IBoard) => board.ownerId === user.id);
  },
  getBoard: async (id: string) => {
    await delay(500);
    const boards: IBoard[] = database.getData("boards");
    return boards.find((board: IBoard) => board.id === id);
  },
  deleteBoard: async (id: string) => {
    await delay(500);
    const boards: IBoard[] = database.getData("boards");
    const todos: ITodo[] = database.getData("todos");
    database.setData(
      "boards",
      boards.filter((board: IBoard) => board.id !== id),
    );
    database.setData(
      "todos",
      todos.filter((todo: ITodo) => todo.boardId !== id),
    );
  },
  getTodos: async (boardId: string) => {
    await delay(500);
    const todos: ITodo[] = database.getData("todos");
    console.log(todos, "todos mock.js");

    return todos.filter((todo: ITodo) => todo.boardId === boardId);
  },
  createTodo: async (data: ITodo) => {
    await delay(500);
    const todos: ITodo[] = database.getData("todos");
    database.setData("todos", [...todos, data]);
  },
  updateTodo: async (
    todoId: string,
    data: { title: string; description: string },
  ) => {
    await delay(500);
    const todos: ITodo[] = database.getData("todos");
    const newTodos = todos.map((todo: ITodo) => {
      return todo.id === todoId ? { ...todo, ...data } : todo;
    });
    database.setData("todos", newTodos);
  },
  deleteTodo: async (id: string) => {
    await delay(500);
    const todos: ITodo[] = database.getData("todos");
    database.setData(
      "todos",
      todos.filter((todo: ITodo) => todo.id !== id),
    );
  },
};
