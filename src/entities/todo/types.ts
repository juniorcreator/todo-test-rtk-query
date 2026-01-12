export interface ITodo {
  id?: string;
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
