import Header from "@/widgets/header/ui/Header.tsx";
import BoardsList from "@/widgets/boards-list/ui/BoardsList.tsx";

const BoardsPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-5 min-h-screen">
      <Header />
      <main>
        <BoardsList />
      </main>
    </div>
  );
};

export default BoardsPage;
