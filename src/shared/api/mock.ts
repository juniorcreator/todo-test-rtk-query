const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const database = {
  getData: (key: string) => JSON.parse(localStorage.getItem(key) || "[]"),
  setData: (key: string, data: any) =>
    localStorage.setItem(key, JSON.stringify(data)),
};

export const api = {
  register: async (name: string, email: string, password: string) => {
    await delay(400);
    const users = database.getData("users");
    console.log(users, "users mock.js");

    if (users.find((user: any) => user.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = { id: crypto.randomUUID(), name, email, password };
    console.log(newUser, "newUser mock.js");
    database.setData("users", [...users, newUser]);
  },
  login: async (email: string, password: string) => {
    await delay(500);
    const users = database.getData("users");
    console.log(users, "users login mock.js");
    const user = users.find((user: any) => user.email === email);

    if (!user) {
      throw new Error("User does not exist");
    }
    if (user.password !== password) {
      throw new Error("Wrong password");
    }
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    localStorage.removeItem("user");
  },
};
