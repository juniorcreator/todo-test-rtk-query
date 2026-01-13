import { Card, CardBody, CardFooter } from "@heroui/react";
import { Link } from "react-router";
import type { IBoard } from "@/entities/board/model/types.ts";
import type { ReactNode } from "react";

interface BoardCardProps {
  board: IBoard;
  actionSlot: ReactNode;
}

const BoardCard = ({ board, actionSlot }: BoardCardProps) => {
  return (
    <Card className="w-full h-40 overflow-y-auto">
      <CardBody className="flex itens items-center justify-center">
        <h3 className="text-xl font-bold">{board.title}</h3>
      </CardBody>
      <CardFooter className="flex flex-col">
        <Link
          className="bg-blue-600 text-white w-full text-center p-2 rounded-xl cursor-pointer mb-1"
          to={`/boards/${board.id}`}
        >
          Visit
        </Link>
        {actionSlot && actionSlot}
      </CardFooter>
    </Card>
  );
};

export default BoardCard;
