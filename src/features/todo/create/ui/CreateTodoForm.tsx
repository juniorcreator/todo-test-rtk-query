import { type ChangeEvent, useState } from "react";
import { Button, Input, Textarea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";
import type { ITodo } from "@/entities/todo/model/types.ts";

const CreateTodoForm = ({ boardId }: { boardId: string }) => {
  const client = useQueryClient();
  const [todo, setTodo] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ITodo) => api.createTodo(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos", boardId] });
      setTodo({ title: "", description: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.title.trim() && todo.description.trim()) {
      mutate({
        id: crypto.randomUUID(),
        title: todo.title,
        description: todo.description,
        status: "todo",
        boardId,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-default-50 p-4 rounded-xl border border-default-200"
    >
      <h3 className="font-semibold text-default-700">New todo</h3>
      <Input
        value={todo.title}
        size="sm"
        label="Name"
        name="title"
        placeholder="Todo name"
        isRequired
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setTodo({ ...todo, [event.target.name]: event.target.value })
        }
      />
      <Textarea
        value={todo.description}
        size="sm"
        label="Description"
        name="description"
        placeholder="Todo description"
        isRequired
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setTodo({ ...todo, [event.target.name]: event.target.value })
        }
      />
      <Button isLoading={isPending} color="primary" type="submit">
        Add todo
      </Button>
    </form>
  );
};

export default CreateTodoForm;
