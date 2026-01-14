interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return <p className="text-tiny text-danger text-center">{message}</p>;
};

export default FormError;
