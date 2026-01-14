import { HeroUIProvider } from "@heroui/react";
import { Routes, Route, Navigate } from "react-router";
import BoardsList from "@/pages/boards/BoardsPage.tsx";
import BoardDetailPage from "@/pages/board-detail/BoardDetailPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/app/providers/AuthProvider.tsx";
import LoginRegisterPage from "@/pages/login-register/LoginRegisterPage.tsx";
import MainLayout from "@/app/layouts/MainLayout.tsx";
import PrivateRoute from "@/app/routes/PrivateRoute.tsx";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider className="h-full">
        <AuthProvider>
          <MainLayout>
            <Toaster />
            <Routes>
              <Route path="/login" element={<LoginRegisterPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/boards" element={<BoardsList />} />
                <Route path="/boards/:boardId" element={<BoardDetailPage />} />
                <Route path="/" element={<Navigate to="/" />} />
              </Route>
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
};

export default App;
