import type { ReactNode } from "react";
import { useAuth } from "@/shared/lib/useAuth.ts";
import { Avatar } from "@heroui/react";
import LogoutButton from "@/shared/ui/LogoutButton.tsx";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <div className="p-5 h-full bg-gray-400">
      <header className="flex items-center justify-center">
        <div className="flex items-center">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <div className="tex-sm mr-2 text-white bg-blue-400 p-1 px-4 rounded-xl">
                  {user.name}
                </div>
                <Avatar className="mr-3" isBordered color="success" />
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      </header>
      {children}
    </div>
  );
};

export default MainLayout;
