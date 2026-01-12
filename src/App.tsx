import { HeroUIProvider } from "@heroui/react";
import { Routes, Route, Navigate, Outlet } from "react-router";
import Login from "@/pages/Login.tsx";
import BoardsList from "@/pages/BoardsList.tsx";
import BoardDetail from "@/pages/BoardDetail.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSession } from "@/entities/session/queries.ts";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const PrivateRoute = () => {
  const { data: user, isLoading } = useSession();
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <HeroUIProvider className="h-full">
        <QueryClientProvider client={queryClient}>
          <div className="p-5 h-full bg-gray-400">
            <Toaster />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/boards" element={<BoardsList />} />
                <Route path="/boards/:boardId" element={<BoardDetail />} />
                <Route path="/" element={<Navigate to="/" />} />
              </Route>
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </div>
        </QueryClientProvider>
      </HeroUIProvider>
    </>
  );
};

export default App;
