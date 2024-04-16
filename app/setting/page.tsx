"use client";
import { FC, useState } from "react";
import { CategoryInterface } from "@/types/category";
// import Category from "./components/Category";
import AddCategory from "./components/AddCategory";
import { addCategory } from "@/actions/linkActions";

// interface Props {
//   categories: CategoryInterface[];
// }

const Categories: FC = () => {
  // State to manage the list of todo items
  const [categoryItems, setCategoryItems] = useState<CategoryInterface[]>([]);

  // Function to create a new todo item
  const createCategory = (params: Omit<CategoryInterface, "id">) => {
    const id = (categoryItems.at(-1)?.id || 0) + 1;
    const addItem = {
      id,
      ...params
    }

    addCategory(addItem);
    setCategoryItems((prev) => [...prev, addItem]);
  };

  // Function to change the text of a todo item
  // const changeTodoText = (id: number, text: string) => {
  //   setCategoryItems((prev) =>
  //     prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
  //   );
  //   editTodo(id, text);
  // };

  // // Function to delete a todo item
  // const deleteTodoItem = (id: number) => {
  //   setCategoryItems((prev) => prev.filter((todo) => todo.id !== id));
  //   deleteTodo(id);
  // };

  // Rendering the Todo List component
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center p-16">
      {/* <div className="text-5xl font-medium">To-do app</div> */}
      <div className="mt-8 flex w-full flex-col gap-2">
        {/* Mapping through todoItems and rendering Todo component for each */}
        {/* {categoryItems.map((category) => (
          <Category
            key={category.id}
            category={category}
            // changeTodoText={changeTodoText}
            // toggleIsTodoDone={toggleIsTodoDone}
            // deleteTodoItem={deleteTodoItem}
          />
        ))} */}
      </div>
      {/* Adding Todo component for creating new todos */}
      <AddCategory createCategory={createCategory} />
    </main>
  );
};

export default Categories;