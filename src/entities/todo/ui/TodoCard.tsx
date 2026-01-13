import { type ReactNode } from "react";
import type { ITodo } from "@/entities/todo/types.ts";
import { Card, CardBody, Chip } from "@heroui/react";
import { todoStatusColor } from "@/entities/todo/lib/todoStatusColor.ts";

interface TodoCardProps {
  todo: ITodo;
  actions?: ReactNode;
}

const TodoCard = ({ todo, actions }: TodoCardProps) => {
  return (
    <Card shadow="sm" className="hover:shadow-md">
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <Chip size="sm" color={todoStatusColor[todo.status]} variant="flat">
            {todo.status}
          </Chip>
        </div>
        <p className="text-default-500 text-sm mb-4">{todo.description}</p>

        {actions && <div className="flex justify-end gap-2">{actions}</div>}
        {/*{isEditing ? (*/}
        {/*  <Textarea*/}
        {/*    size="sm"*/}
        {/*    label="Description"*/}
        {/*    value={editForm.description}*/}
        {/*    onValueChange={(value: string) =>*/}
        {/*      setEditForm({ ...editForm, description: value })*/}
        {/*    }*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <p className="text-default-500 text-sm mb-4">{todo.description}</p>*/}
        {/*)}*/}
        {/*{isEditing && (*/}
        {/*  <Select*/}
        {/*    size="sm"*/}
        {/*    className="w-40 mt-2"*/}
        {/*    label="Status"*/}
        {/*    selectedKeys={[editForm.status]}*/}
        {/*    onChange={(e: ChangeEvent<HTMLSelectElement>) =>*/}
        {/*      setEditForm({*/}
        {/*        ...editForm,*/}
        {/*        status: e.target.value as ITodo["status"],*/}
        {/*      })*/}
        {/*    }*/}
        {/*  >*/}
        {/*    <SelectItem key="todo">To do</SelectItem>*/}
        {/*    <SelectItem key="inProgress">In Progress</SelectItem>*/}
        {/*    <SelectItem key="done">Done</SelectItem>*/}
        {/*  </Select>*/}
        {/*)}*/}

        {/*<div className="flex justify-end gap-2">*/}
        {/*  {isEditing ? (*/}
        {/*    <div className="mt-3">*/}
        {/*      <Button*/}
        {/*        size="sm"*/}
        {/*        variant="flat"*/}
        {/*        onPress={() => setIsEditing(false)}*/}
        {/*      >*/}
        {/*        Cancel*/}
        {/*      </Button>*/}
        {/*      <Button*/}
        {/*        isLoading={updateLoading}*/}
        {/*        onPress={() => updateMutation()}*/}
        {/*        size="sm"*/}
        {/*        variant="light"*/}
        {/*        color="primary"*/}
        {/*      >*/}
        {/*        Save*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div>*/}
        {/*      <Button*/}
        {/*        size="sm"*/}
        {/*        variant="flat"*/}
        {/*        onPress={() => setIsEditing(true)}*/}
        {/*      >*/}
        {/*        Change*/}
        {/*      </Button>*/}
        {/*      <Button*/}
        {/*        isLoading={deleteLoading}*/}
        {/*        onPress={() => deleteMutation()}*/}
        {/*        size="sm"*/}
        {/*        variant="light"*/}
        {/*        color="danger"*/}
        {/*      >*/}
        {/*        Delete*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
      </CardBody>
    </Card>
  );
};

export default TodoCard;
