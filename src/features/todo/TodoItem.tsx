import { Button } from "@heroui/react";
import { useState } from "react";
import type { ITodo } from "@/entities/todo/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";
import TodoCard from "@/entities/todo/ui/TodoCard.tsx";
import DeleteTodoButton from "@/features/todo/delete/ui/DeleteTodoButton.tsx";
import TodoEditForm from "@/features/todo/edit/ui/TodoEditForm.tsx";

const TodoItem = ({ todo }: { todo: ITodo }) => {
  const client = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (data: ITodo) => api.updateTodo(todo.id, data),
    onSuccess: () => {
      setIsEditing(false);
      client.invalidateQueries({ queryKey: ["todos", todo.boardId] });
    },
  });

  if (isEditing) {
    return (
      <TodoEditForm
        todo={todo}
        isLoading={updateMutation.isPending}
        onSubmit={(data) => updateMutation.mutate(data)}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <TodoCard
      todo={todo}
      actions={
        <>
          <Button size="sm" variant="flat" onPress={() => setIsEditing(true)}>
            Change
          </Button>
          <DeleteTodoButton id={todo.id} boardId={todo.boardId} />
        </>
      }
    />
  );
};

export default TodoItem;
