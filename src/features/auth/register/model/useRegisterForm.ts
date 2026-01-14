import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/shared/lib/useAuth.ts";

export const useRegisterForm = (onSuccess?: () => void) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(formData.name, formData.email, formData.password);
      toast.success("Registered, now login");
      if (onSuccess) onSuccess();
      setFormData({ name: "", email: "", password: "" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Register error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
