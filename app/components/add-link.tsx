"use client";
import { LinkInterface } from "@/types/link";
import { FC, useState } from "react";
import { Input } from "@/components/ui/input"
import { addLink } from "@/actions/linkActions";
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

const linkFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(30, {
      message: "name must not be longer than 30 characters.",
    }),
  icon: z.string().optional(), // .url({ message: "Please enter a valid URL." }),
  url: z.string().url(),
  description: z.string().optional(),
  rank: z.coerce.number().optional()
});


type LinkFormValues = z.infer<typeof linkFormSchema>
export interface AddLinkProps {
  navItems: Pick<LinkInterface, "name" | "icon" | "id">[]
}

const AddLink: FC<AddLinkProps> = ({navItems}) => {  
  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: "onChange",
    
  })

  const createLink = (params: Omit<LinkInterface, "id" | "categoryId">) => {
    const id = (navItems.at(-1)?.id || 0) + 1;
    const addItem = {
      id,
      ...params
    }

    addLink(addItem);
    navItems.push(addItem)
  };

  function onSubmit(data: LinkFormValues) {
    const parsedData = linkFormSchema.parse(data);
    createLink(parsedData);
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

export default AddLink;