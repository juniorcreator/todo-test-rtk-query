import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/shared/lib/useAuth.ts";
import { useNavigate } from "react-router";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
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

  return {
    formData,
    loading,
    error,
    handleSubmit,
    handleChange,
  };
};
