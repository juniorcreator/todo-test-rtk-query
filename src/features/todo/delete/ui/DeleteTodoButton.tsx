import { Button } from "@heroui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";

interface DeleteTodoButtonProps {
  id: string;
  boardId: string;
}

const DeleteTodoButton = ({ id, boardId }: DeleteTodoButtonProps) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.deleteTodo(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos", boardId] });
    },
  });
  return (
    <Button
      isLoading={isPending}
      onPress={() => mutate()}
      size="sm"
      variant="light"
      color="danger"
    >
      Delete
    </Button>
  );
};

export default DeleteTodoButton;
