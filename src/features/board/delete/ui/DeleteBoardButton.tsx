import { Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";

interface DeleteBoardButtonProps {
  boardId: string;
}

const DeleteBoardButton = ({ boardId }: DeleteBoardButtonProps) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => api.deleteBoard(id),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["boards"] });
      await client.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Button
      className="text-white"
      size="sm"
      color="danger"
      isLoading={isPending}
      onPress={() => mutate(boardId)}
    >
      delete
    </Button>
  );
};

export default DeleteBoardButton;
