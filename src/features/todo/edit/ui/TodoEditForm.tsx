import { Button, Card, CardBody, Input, Textarea } from "@heroui/react";
import type { ITodo } from "@/entities/todo/model/types.ts";
import { useTodoForm } from "@/features/todo/update/model/useTodoForm.ts";
import TodoStatusSelect from "@/features/todo/edit/ui/TodoStatusSelect.tsx";

interface TodoEditFormProps {
  todo: ITodo;
  onCancel: () => void;
  onSubmit: (data: ITodo) => void;
  isLoading: boolean;
}

const TodoEditForm = ({
  todo,
  onSubmit,
  onCancel,
  isLoading,
}: TodoEditFormProps) => {
  const { todoState, updateField } = useTodoForm(todo);

  return (
    <Card shadow="sm" className="hover:shadow-md">
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <Input
            onValueChange={(value: string) => updateField("title", value)}
            size="sm"
            label="Name"
            value={todoState.title}
          />
        </div>
        <Textarea
          size="sm"
          label="Description"
          value={todoState.description}
          onValueChange={(value: string) => updateField("description", value)}
        />
        <TodoStatusSelect
          value={todoState.status}
          onChange={(value: string) => updateField("status", value)}
        />

        <div className="flex justify-end gap-2">
          <div className="mt-3">
            <Button size="sm" variant="flat" onPress={onCancel}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              onPress={() => onSubmit(todoState)}
              size="sm"
              variant="light"
              color="primary"
            >
              Save
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TodoEditForm;
