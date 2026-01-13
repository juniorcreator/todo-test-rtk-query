import BoardDetail from "@/widgets/board-detail/ui/BoardDetail.tsx";
import { useParams } from "react-router";

const BoardDetailPage = () => {
  const { boardId } = useParams();
  if (!boardId) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <BoardDetail boardId={boardId}></BoardDetail>
    </div>
  );
};

export default BoardDetailPage;
