"use client";
import { CategoryInterface } from "@/types/category";
import { ChangeEvent, FC, useState } from "react";

interface Props {
  createCategory: (params: Omit<CategoryInterface, "id">) => void;
}

const AddTodo: FC<Props> = ({ createCategory }) => {
  // State for handling input value
  const [name, setName] = useState("");
  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // State for handling input value
  const [icon, setIcon] = useState("");
  const handleIconInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIcon(e.target.value);
  };

  // State for handling input value
  const [description, setDescription] = useState("");
  const handleDescriptionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  // State for handling input value
  const [rank, setRank] = useState(0);
  const handleRankInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRank(+e.target.value);
  };

  // Event handler for adding a new todo
  const handleAdd = async () => {
    createCategory({
      name,
      icon,
      description,
      rank,
    });
    setName("");
  };

  // Rendering the AddTodo component
  return (
    <div className="mt-2 flex w-full gap-1">
      {/* Input field for entering new todo text */}
      name: <input
        type="text"
        className="w-full rounded border border-gray-200 px-2 py-1 outline-none"
        onChange={handleNameInput}
        value={name}
      />
      icon: <input
        type="text"
        className="w-full rounded border border-gray-200 px-2 py-1 outline-none"
        onChange={handleIconInput}
        value={icon}
      />
      description: <input
        type="text"
        className="w-full rounded border border-gray-200 px-2 py-1 outline-none"
        onChange={handleDescriptionInput}
        value={description}
      />
      rank: <input
        type="number"
        className="w-full rounded border border-gray-200 px-2 py-1 outline-none"
        onChange={handleRankInput}
        value={rank}
      />
      {/* Button for adding a new todo */}
      <button
        className="flex h-9 w-14 items-center justify-center rounded bg-green-600 px-2 py-1 text-green-50"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default AddTodo;