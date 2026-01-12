import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: api.getUser,
    retry: false,
  });
};

export const useLogout = () => {
  const client = useQueryClient();

  return () => {
    api.logout().then(() => {
      client.setQueryData(["session"], null);
      window.location.reload();
    });
  };
};
