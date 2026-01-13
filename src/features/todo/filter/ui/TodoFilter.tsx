import { Select, SelectItem } from "@heroui/react";
import type { ChangeEvent } from "react";

interface TodoFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const TodoFilter = ({ value, onChange }: TodoFilterProps) => {
  return (
    <div className="bg-default-50 p-4 rounded-xl border border-default-200 w-full">
      <Select
        size="sm"
        className="w-40 mt-2"
        label="Status"
        selectedKeys={[value]}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
      >
        <SelectItem key="all">All</SelectItem>
        <SelectItem key="todo">To do</SelectItem>
        <SelectItem key="inProgress">In Progress</SelectItem>
        <SelectItem key="done">Done</SelectItem>
      </Select>
    </div>
  );
};

export default TodoFilter;
