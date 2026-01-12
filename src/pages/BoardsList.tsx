import { Link } from "react-router";
import { Card, CardBody, Spinner, Button } from "@heroui/react";
import { api } from "@/shared/api/mock.ts";
import CreateBoardForm from "@/features/board/CreateBoardForm.tsx";
import { useQuery } from "@tanstack/react-query";
import type { IBoard } from "@/entities/todo/types.ts";

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
    <div className="max-w-5xl mx-auto p-5">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My boards</h1>
        <Button onPress={api.logout} color="danger" variant="flat">
          Logout
        </Button>
      </div>

      <CreateBoardForm />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards?.map((board: IBoard) => (
          <Link key={board.id} to={`/boards/${board.id}`}>
            <Card isPressable className="w-full h-30 hover:scale-[1.02]">
              <CardBody className="flex itens items-center justify-center">
                <h3 className="text-xl font-bold">{board.title}</h3>
              </CardBody>
            </Card>
          </Link>
        ))}
        {boards?.length === 0 && (
          <p className="text-white">List is empty, create new board</p>
        )}
      </div>
    </div>
  );
};

export default BoardsList;
