import { Card, CardBody, CardFooter } from "@heroui/react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";
import type { IBoard } from "@/entities/todo/types.ts";

const BoardsCard = ({ board }: { board: IBoard }) => {
  const client = useQueryClient();

  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: (id: string) => api.deleteBoard(id),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["boards"] });
      await client.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Card className="w-full h-35 overflow-y-auto">
      <CardBody className="flex itens items-center justify-center">
        <h3 className="text-xl font-bold">{board.title}</h3>
        <Link
          className="bg-blue-600 text-white w-full text-center p-2 rounded-xl cursor-pointer"
          to={`/boards/${board.id}`}
        >
          Visit
        </Link>
      </CardBody>
      <CardFooter>
        <span
          onClick={() => deleteMutation(board.id)}
          className="bg-red-500 text-white text-xs text-center px-2 p-1 rounded-xl cursor-pointer"
        >
          {isPending ? "load...." : "delete"}
        </span>
      </CardFooter>
    </Card>
  );
};

export default BoardsCard;
