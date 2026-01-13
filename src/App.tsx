import { HeroUIProvider } from "@heroui/react";
import { Routes, Route, Navigate, Outlet } from "react-router";
import Login from "@/pages/Login.tsx";
import BoardsList from "@/pages/boards/BoardsPage.tsx";
import BoardDetailPage from "@/pages/board-detail/BoardDetailPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/providers/AuthProvider.tsx";
import { useAuth } from "@/shared/lib/useAuth.ts";

const queryClient = new QueryClient();

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();
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
          <AuthProvider>
            <div className="p-5 h-full bg-gray-400">
              <Toaster />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/boards" element={<BoardsList />} />
                  <Route
                    path="/boards/:boardId"
                    element={<BoardDetailPage />}
                  />
                  <Route path="/" element={<Navigate to="/" />} />
                </Route>
                <Route path="*" element={<div>Page not found</div>} />
              </Routes>
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </HeroUIProvider>
    </>
  );
};

export default App;
