import { Input, type InputProps } from "@heroui/react";

const PasswordInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      label="Password"
      autoComplete="current-password"
      type="password"
      name="password"
      placeholder="Enter password"
      isRequired
    />
  );
};

export default PasswordInput;
