import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "@/shared/lib/useAuth.ts";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
  };
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      toast.success("Logged successfully");
      navigate("/boards");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login error");
      }
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
