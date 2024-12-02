"use client";
import { CategoryInterface } from "@/types/category";
import { FC, useState } from "react";
import { Input } from "@/components/ui/input"
import { addCategory } from "@/actions/linkActions";
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusCircledIcon } from '@radix-ui/react-icons'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(30, {
      message: "name must not be longer than 30 characters.",
    }),
  icon: z.string().optional(), // .url({ message: "Please enter a valid URL." }),
  description: z.string().optional(),
  rank: z.coerce.number().optional()
});


type CategoryFormValues = z.infer<typeof categoryFormSchema>
export interface AddCategoryProps {
  navItems: Pick<CategoryInterface, "name" | "icon" | "id">[]
}

const AddCategory: FC<AddCategoryProps> = ({navItems}) => {  
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    mode: "onChange",
    
  })

  const createCategory = (params: Omit<CategoryInterface, "id" | "links">) => {
    const id = (navItems.at(-1)?.id || 0) + 1;
    const addItem = {
      id,
      ...params
    }

    addCategory(addItem);
    navItems.push(addItem)
  };

  function onSubmit(data: CategoryFormValues) {
    const parsedData = categoryFormSchema.parse(data);
    createCategory(parsedData);
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="w-full">
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-half">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rank</FormLabel>
                  <FormControl>
                    <Input {...field} type="number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Confirm</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  
  );
};

export default AddCategory;