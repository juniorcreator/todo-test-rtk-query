import { Button, Input } from "@heroui/react";
import { useLoginForm } from "@/features/auth/login/model/useLoginForm.ts";
import PasswordInput from "@/shared/ui/PasswordInput.tsx";
import FormError from "@/shared/ui/FormError.tsx";

const LoginForm = () => {
  const { formData, loading, error, handleSubmit, handleChange } =
    useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email"
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onValueChange={(value) => handleChange("email", value)}
        isRequired
      />
      <PasswordInput
        value={formData.password}
        onValueChange={(value) => handleChange("password", value)}
      />
      <FormError message={error} />
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
