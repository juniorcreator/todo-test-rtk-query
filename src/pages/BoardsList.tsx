import { Link } from "react-router";
import { Card, CardBody, Spinner, Button, CardFooter } from "@heroui/react";
import { api } from "@/shared/api/mock.ts";
import CreateBoardForm from "@/features/board/CreateBoardForm.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IBoard } from "@/entities/todo/types.ts";

const BoardsList = () => {
  const client = useQueryClient();
  const { data: boards, isLoading } = useQuery({
    queryFn: api.getBoards,
    queryKey: ["boards"],
  });
  const { mutate: deleteMutation, isPending: deleteLoading } = useMutation({
    mutationFn: (id: string) => api.deleteBoard(id),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["boards"] });
      await client.invalidateQueries({ queryKey: ["todos"] });
    },
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
          <Card key={board.id} className="w-full h-35 overflow-y-auto">
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
                {deleteLoading ? "load...." : "delete"}
              </span>
            </CardFooter>
          </Card>
        ))}
        {boards?.length === 0 && (
          <p className="text-white">List is empty, create new board</p>
        )}
      </div>
    </div>
  );
};

export default BoardsList;
