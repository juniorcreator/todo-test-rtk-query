import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { type ChangeEvent, useState } from "react";
import type { ITodo } from "@/entities/todo/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";
import TodoCard from "@/entities/todo/ui/TodoCard.tsx";

const TodoItemUpdate = ({ todo }: { todo: ITodo }) => {
  const client = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(todo);

  const updateMutation = useMutation({
    mutationFn: () => api.updateTodo(todo.id, editForm),
    onSuccess: () => {
      setIsEditing(false);
      client.invalidateQueries({ queryKey: ["todos", todo.boardId] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => api.deleteTodo(todo.id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos", todo.boardId] });
    },
  });

  const handleSave = () => updateMutation.mutate();
  const handleDelete = () => deleteMutation.mutate();
  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(todo);
  };

  if (!isEditing) {
    return (
      <TodoCard
        todo={todo}
        actions={
          <>
            <Button
              size="sm"
              variant="flat"
              onPress={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              isLoading={deleteMutation.isPending}
              onPress={handleDelete}
              size="sm"
              variant="light"
              color="danger"
            >
              Delete
            </Button>
          </>
        }
      />
    );
  }

  return (
    <Card shadow="sm" className="hover:shadow-md">
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <Input
            onValueChange={(value: string) =>
              setEditForm({ ...editForm, title: value })
            }
            size="sm"
            label="Name"
            value={editForm.title}
          />
          )
        </div>
        <Textarea
          size="sm"
          label="Description"
          value={editForm.description}
          onValueChange={(value: string) =>
            setEditForm({ ...editForm, description: value })
          }
        />
        <Select
          size="sm"
          className="w-40 mt-2"
          label="Status"
          selectedKeys={[editForm.status]}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setEditForm({
              ...editForm,
              status: e.target.value as ITodo["status"],
            })
          }
        >
          <SelectItem key="todo">To do</SelectItem>
          <SelectItem key="inProgress">In Progress</SelectItem>
          <SelectItem key="done">Done</SelectItem>
        </Select>

        <div className="flex justify-end gap-2">
          <div className="mt-3">
            <Button size="sm" variant="flat" onPress={handleCancel}>
              Cancel
            </Button>
            <Button
              isLoading={updateMutation.isPending}
              onPress={handleSave}
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

export default TodoItemUpdate;
