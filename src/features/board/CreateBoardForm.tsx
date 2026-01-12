import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { api } from "@/shared/api/mock.ts";

const CreateBoardForm = () => {
  const [title, setTitle] = useState("");
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: api.createBoard,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["boards"] });
      console.log(title, " title");
      setTitle("");
    },
    onError: (err) => {
      console.log(err, " CreateBoardForm");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      mutation.mutate(title);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end mb-8">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="sm"
        label="New board"
        placeholder="name of board"
        variant="bordered"
        className="max-w-xs"
      />
      <Button isLoading={mutation.isPending} color="primary" type="submit">
        Create
      </Button>
    </form>
  );
};

export default CreateBoardForm;
