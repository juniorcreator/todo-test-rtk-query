import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";
import type { IBoard } from "@/entities/board/model/types.ts";
import BoardsCard from "@/entities/board/ui/BoardCard.tsx";
import CreateBoardForm from "@/features/board/criate/ui/CreateBoardForm.tsx";
import DeleteBoardButton from "@/features/board/delete/ui/DeleteBoardButton.tsx";

const BoardsList = () => {
  const { data: boards, isLoading } = useQuery({
    queryFn: api.getBoards,
    queryKey: ["boards"],
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <>
      <CreateBoardForm />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards?.map((board: IBoard) => (
          <BoardsCard
            key={board.id}
            board={board}
            actionSlot={<DeleteBoardButton boardId={board.id} />}
          />
        ))}
        {boards?.length === 0 && (
          <p className="text-white">List is empty, create new board</p>
        )}
      </div>
    </>
  );
};

export default BoardsList;
