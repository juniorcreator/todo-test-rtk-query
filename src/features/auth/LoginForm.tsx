import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { api } from "@/shared/api/mock.ts";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData, " formData login");
  };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    console.log(formData, " formData login");

    try {
      await api.login(formData.email, formData.password);
      console.log("logined");
    } catch (error: any) {
      setError(error.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email"
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        isRequired
      />
      <Input
        label="Password"
        autoComplete="current-password"
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleInputChange}
        isRequired
      />

      {error && <p className="text-tiny text-danger">{error}</p>}
      <Button
        isLoading={loading}
        color="success"
        type="submit"
        className="text-white"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
