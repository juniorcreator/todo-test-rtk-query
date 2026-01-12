import { Button, Select, SelectItem, Spinner } from "@heroui/react";
import { Link, useParams } from "react-router";
import { type ChangeEvent, useState } from "react";
import TodoItem from "@/features/todo/TodoItem.tsx";
import CreateTodoForm from "@/features/todo/CreateTodoForm.tsx";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";
import type { ITodo } from "@/entities/todo/types.ts";

const BoardDetail = () => {
  const [filter, setFilter] = useState("all");
  const { boardId } = useParams();
  const { data: board, isLoading: boardLoading } = useQuery({
    queryFn: () => api.getBoard(boardId!),
    queryKey: ["board", boardId],
  });
  const { data: todos, isLoading: todosLoading } = useQuery({
    queryFn: () => api.getTodos(boardId!),
    queryKey: ["todos", boardId],
  });

  console.log(filter, " filter");
  if (boardLoading || todosLoading) {
    return (
      <div className="p-10 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!board) return <div>Board not found</div>;

  const filteredTodos = todos?.filter((todo: ITodo) =>
    filter === "all" ? true : todo.status === filter,
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button as={Link} to="/boards" variant="shadow" size="sm">
          ⏮️ Back
        </Button>
        <h1 className="text-3xl font-bold">Board: {board.title}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-ful md:w-1/3 flex flex-col gap-2 sticky top-4">
          <div className="bg-default-50 p-4 rounded-xl border border-default-200">
            <Select
              selectedKeys={[filter]}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setFilter(event.target.value)
              }
              label="Todo Filter"
            >
              <SelectItem key="all">All todos</SelectItem>
              <SelectItem key="tod">To do</SelectItem>
              <SelectItem key="inProgress">In progress</SelectItem>
              <SelectItem key="done">Done</SelectItem>
            </Select>
          </div>
          <CreateTodoForm boardId={board.id} />
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {filteredTodos?.length === 0 && (
            <div className="text-center py-10 text-default-400">
              No todos found
            </div>
          )}
          {filteredTodos?.map((todo: ITodo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
