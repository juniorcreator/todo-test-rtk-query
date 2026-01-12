import { type ChangeEvent, useState } from "react";
import type { ITodo } from "@/entities/todo/types.ts";
import {
  Button,
  Input,
  Card,
  CardBody,
  Textarea,
  Chip,
  Select,
  SelectItem,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/mock.ts";

const TodoItem = ({ todo }: { todo: ITodo }) => {
  const client = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(todo);
  const { mutate: updateMutation, isPending: updateLoading } = useMutation({
    mutationFn: () => api.updateTodo(todo.id, editForm),
    onSuccess: () => {
      setIsEditing(false);
      client.invalidateQueries({ queryKey: ["todos", todo.boardId] });
    },
  });
  const { mutate: deleteMutation, isPending: deleteLoading } = useMutation({
    mutationFn: () => api.deleteTodo(todo.id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos", todo.boardId] });
    },
  });

  const todoStatusColor: Record<string, "default" | "primary" | "success"> = {
    todo: "default",
    inProgress: "primary",
    done: "success",
  };

  return (
    <Card shadow="sm" className="hover:shadow-md">
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          {isEditing ? (
            <Input
              onValueChange={(value: string) =>
                setEditForm({ ...editForm, title: value })
              }
              size="sm"
              label="Name"
              value={editForm.title}
            />
          ) : (
            <h4 className="font-semibold text-lg">{todo.title}</h4>
          )}
          <Chip
            size="sm"
            color={todoStatusColor[editForm.status]}
            variant="flat"
          >
            {todo.status}
          </Chip>
        </div>
        {isEditing ? (
          <Textarea
            size="sm"
            label="Description"
            value={editForm.description}
            onValueChange={(value: string) =>
              setEditForm({ ...editForm, description: value })
            }
          />
        ) : (
          <p className="text-default-500 text-sm mb-4">{todo.description}</p>
        )}
        {isEditing && (
          <Select
            size="sm"
            className="w-40 mt-2"
            label="Status"
            selectedKeys={[editForm.status]}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setEditForm({ ...editForm, status: e.target.value as any })
            }
          >
            <SelectItem key="todo">To do</SelectItem>
            <SelectItem key="inProgress">In Progress</SelectItem>
            <SelectItem key="done">Done</SelectItem>
          </Select>
        )}

        <div className="flex justify-end gap-2">
          {isEditing ? (
            <div className="mt-3">
              <Button
                size="sm"
                variant="flat"
                onPress={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                isLoading={updateLoading}
                onPress={() => updateMutation()}
                size="sm"
                variant="light"
                color="primary"
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <Button
                size="sm"
                variant="flat"
                onPress={() => setIsEditing(true)}
              >
                Change
              </Button>
              <Button
                isLoading={deleteLoading}
                onPress={() => deleteMutation()}
                size="sm"
                variant="light"
                color="danger"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default TodoItem;
