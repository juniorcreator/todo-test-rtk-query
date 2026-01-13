export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IAuthContextValue {
  user: IUser | null | undefined;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}
