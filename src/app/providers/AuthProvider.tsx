import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";
import type { IAuthContextValue } from "@/app/model/types.ts";
import { AuthContext } from "@/app/model/authContext";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const client = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: api.getUser,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.login(email, password),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["session"] });
    },
  });
  const logoutMutation = useMutation({
    mutationFn: api.logout,
    onSuccess: async () => {
      await client.setQueryData(["session"], null);
    },
  });
  const registerMutation = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => api.register(name, email, password),
    onSuccess: async () => {
      await client.setQueryData(["session"], null);
    },
  });

  const value = useMemo<IAuthContextValue>(
    () => ({
      user,
      isLoading,
      login: async (email: string, password: string) => {
        await loginMutation.mutateAsync({ email, password });
      },
      logout: async () => {
        await logoutMutation.mutateAsync();
      },
      register: async (name: string, email: string, password: string) => {
        await registerMutation.mutateAsync({ name, email, password });
      },
    }),
    [user, isLoading, loginMutation, logoutMutation, registerMutation],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
