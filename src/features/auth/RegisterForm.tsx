import { Input, Button } from "@heroui/react";
import { useState } from "react";
import { api } from "../../shared/api/mock.ts";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData, " formData register");
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.register(formData.name, formData.email, formData.password);
    } catch (error: any) {
      setError(error.message || "Register error");
    } finally {
      setLoading(false);
    }

    console.log(formData, " formData register");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Name"
        autoComplete="name"
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onChange={handleInputChange}
        isRequired
      />
      <Input
        label="Email"
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Enter email test@email.com"
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
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
