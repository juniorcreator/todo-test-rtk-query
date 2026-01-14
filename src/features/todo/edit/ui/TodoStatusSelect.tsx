import { Select, SelectItem } from "@heroui/react";
import type { ChangeEvent } from "react";
import type { ITodo } from "@/entities/todo/model/types.ts";

interface TodoStatusSelectProps {
  value: string;
  onChange: (value: ITodo["status"]) => void;
}

const TodoStatusSelect = ({ value, onChange }: TodoStatusSelectProps) => {
  return (
    <Select
      size="sm"
      className="w-40 mt-2"
      label="Status"
      selectedKeys={[value]}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onChange(e.target.value as ITodo["status"])
      }
    >
      <SelectItem key="todo">To do</SelectItem>
      <SelectItem key="inProgress">In Progress</SelectItem>
      <SelectItem key="done">Done</SelectItem>
    </Select>
  );
};

export default TodoStatusSelect;
