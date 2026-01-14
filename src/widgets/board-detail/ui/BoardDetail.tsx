import { Button, Spinner } from "@heroui/react";
import { Link } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";
import type { ITodo } from "@/entities/todo/model/types.ts";
import TodoItem from "@/features/todo/TodoItem.tsx";
import TodoFilter from "@/features/todo/filter/ui/TodoFilter.tsx";
import CreateTodoForm from "@/features/todo/create/ui/CreateTodoForm.tsx";

const BoardDetail = ({ boardId }: { boardId: string }) => {
  const [filter, setFilter] = useState("all");
  const { data: board, isLoading: boardLoading } = useQuery({
    queryFn: () => api.getBoard(boardId!),
    queryKey: ["board", boardId],
  });
  const { data: todos, isLoading: todosLoading } = useQuery({
    queryFn: () => api.getTodos(boardId!),
    queryKey: ["todos", boardId],
  });

  if (boardLoading || todosLoading) {
    return (
      <div className="p-10 flex justify-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!board) return <div>Board not found</div>;

  const filteredTodos = todos?.filter((todo: ITodo) =>
    filter === "all" ? true : todo.status === filter,
  );

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Button as={Link} to="/boards" variant="shadow" size="sm">
          ⏮️ Back
        </Button>
        <h1 className="text-3xl font-bold">Board: {board.title}</h1>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col gap-2 items-start">
          <TodoFilter value={filter} onChange={setFilter} />
          <CreateTodoForm boardId={boardId} />
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {filteredTodos?.length === 0 && (
            <div className="text-center py-10 text-white font-bold">
              No todos found.😢
            </div>
          )}
          {filteredTodos?.map((todo: ITodo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardDetail;
