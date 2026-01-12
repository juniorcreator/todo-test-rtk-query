import { Spinner, Button, Avatar } from "@heroui/react";
import { api } from "@/shared/api/mock.ts";
import CreateBoardForm from "@/features/board/CreateBoardForm.tsx";
import BoardsCard from "@/features/board/BoardsCard.tsx";
import { useQuery } from "@tanstack/react-query";
import type { IBoard } from "@/entities/todo/types.ts";
import { useLogout } from "@/entities/session/queries.ts";

const BoardsList = () => {
  const logout = useLogout();
  const { data: boards, isLoading } = useQuery({
    queryFn: api.getBoards,
    queryKey: ["boards"],
  });
  const { data: user, isLoading: userLoading } = useQuery({
    queryFn: api.getUser,
    queryKey: ["userId"],
  });

  if (isLoading || userLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My boards</h1>
        <div className="flex items-center">
          <Avatar
            className="mr-3"
            isBordered
            color="success"
            name={user.name}
          />
          <Button size="sm" onPress={logout} color="primary" variant="bordered">
            Logout
          </Button>
        </div>
      </div>
      <CreateBoardForm />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards?.map((board: IBoard) => (
          <BoardsCard key={board.id} board={board} />
        ))}
        {boards?.length === 0 && (
          <p className="text-white">List is empty, create new board</p>
        )}
      </div>
    </div>
  );
};

export default BoardsList;
