import type { IUser } from "@/app/model/types.ts";

export interface ITodo {
  id: string;
  boardId: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
}

export type StoredData = ITodo | ITodo[] | IBoard | IBoard[] | IUser | IUser[];
