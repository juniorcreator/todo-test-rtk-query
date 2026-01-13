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
          <div className="font-bold">Title: {todo.title}</div>
          <Chip size="sm" color={todoStatusColor[todo.status]} variant="flat">
            {todo.status}
          </Chip>
        </div>
        <p className="text-default-500 text-sm mb-4">
          Description: {todo.description}
        </p>

        {actions && <div className="flex justify-end gap-2">{actions}</div>}
      </CardBody>
    </Card>
  );
};

export default TodoCard;
