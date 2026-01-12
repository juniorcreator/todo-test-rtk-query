import { HeroUIProvider } from "@heroui/react";
import { Routes, Route, Link, Navigate } from "react-router";
import Login from "@/pages/Login.tsx";
import BoardsList from "@/pages/BoardsList.tsx";
import BoardDetail from "@/pages/BoardDetail.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <HeroUIProvider className="h-full">
        <QueryClientProvider client={queryClient}>
          <div className="p-5 h-full bg-gray-400">
            <Link className="text-red-500" to="/login">
              login
            </Link>
            <Link to="/boards">boards</Link>
            <Link to="/boardsdetail">board detail</Link>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/" />} />
              <Route path="/boards" element={<BoardsList />} />
              <Route path="/boards/:boardId" element={<BoardDetail />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </div>
        </QueryClientProvider>
      </HeroUIProvider>
    </>
  );
};

export default App;
