import { Avatar, Spinner } from "@heroui/react";
import LogoutButton from "@/shared/ui/LogoutButton.tsx";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";

const Header = () => {
  const { data: user, isLoading } = useQuery({
    queryFn: api.getUser,
    queryKey: ["userId"],
  });

  if (isLoading) {
    return <Spinner size="sm" />;
  }

  if (!user) return null;

  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold">My boards</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="tex-sm font-semibold">{user.name}</span>
          <Avatar className="mr-3" isBordered color="success" />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
