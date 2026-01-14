import { Input, Button } from "@heroui/react";
import { useRegisterForm } from "@/features/auth/register/model/useRegisterForm.ts";
import PasswordInput from "@/shared/ui/PasswordInput.tsx";
import FormError from "@/shared/ui/FormError.tsx";

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { formData, loading, handleChange, handleSubmit, error } =
    useRegisterForm(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Name"
        autoComplete="name"
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData.name}
        onValueChange={(value) => handleChange("name", value)}
        isRequired
      />
      <Input
        label="Email"
        autoComplete="email"
        type="email"
        name="email"
        placeholder="Enter email test@email.com"
        value={formData.email}
        onValueChange={(value) => handleChange("email", value)}
        isRequired
      />
      <PasswordInput
        value={formData.password}
        onValueChange={(val) => handleChange("password", val)}
      />
      <FormError message={error} />
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
