export interface ITodo {
  id: string;
  boardId: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
}

export interface IBoard {
  id: string;
  title: string;
  ownerId: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type StoredData = ITodo | ITodo[] | IBoard | IBoard[] | IUser | IUser[];
