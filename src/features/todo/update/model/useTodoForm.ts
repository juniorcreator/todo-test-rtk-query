import { useState } from "react";
import type { ITodo } from "@/entities/todo/types.ts";

export const useTodoForm = (initTodo: ITodo) => {
  const [todoState, setTodoState] = useState<ITodo>(initTodo);

  const updateField = (field: keyof ITodo, value: string) => {
    setTodoState((prev) => ({ ...prev, [field]: value }));
  };

  return {
    todoState,
    updateField,
  };
};
