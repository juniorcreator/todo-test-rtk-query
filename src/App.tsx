import { HeroUIProvider } from "@heroui/react";
import { Routes, Route, Link, Navigate } from "react-router";
import Login from "./pages/Login.tsx";
import BoardsList from "./pages/BoardsList.tsx";
import BoardDetail from "./pages/BoardDetail.tsx";

const App = () => {
  return (
    <>
      <HeroUIProvider className="h-full">
        <div className="p-5 h-full bg-gray-400">
          <Link className="text-red-500" to="/login">
            login
          </Link>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/" />} />
            <Route path="/boards" element={<BoardsList />} />
            <Route path="/boardsdetail" element={<BoardDetail />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </HeroUIProvider>
    </>
  );
};

export default App;
