"use server";
import {eq,asc} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import db from "@/db/drizzle";
import {category,link} from "@/db/schema";
import { CategoryInterface } from "@/types/category";

export const addLink = async (params: any) => {
  await db.insert(link).values(params);
  revalidatePath("/");
};

export const deleteLink = async (id: number) => {
  await db.delete(link).where(eq(link.id, id));
  revalidatePath("/");
};

export const editLink = async (id: number, params: any) => {
  await db
    .update(link)
    .set(params)
    .where(eq(link.id, id));

  revalidatePath("/");
};

export const getCategories = async () => {
    const data: Omit<CategoryInterface, 'links'>[] = await db.select().from(category).orderBy(asc(category.id));
    return data;
};

export const addCategory = async (params: Omit<CategoryInterface, 'links'>) => {
  await db.insert(category).values(params);
  revalidatePath("/");
};

export const deleteCategory = async (id: number) => {
  await db.delete(category).where(eq(category.id, id));
  revalidatePath("/");
};


export const editCategory = async (id: number, params: any) => {
  await db
    .update(category)
    .set(params)
    .where(eq(category.id, id));

  revalidatePath("/");
};

export const getCateLinks = async () => {
  const data = await db.query.category.findMany({
    with: {
      links: true,
    },
  });
  // 对 links 进行排序
  data.forEach(category => {
    category.links.sort((a, b) => (a.rank || 0) - (b.rank || 0));
  });
  console.log('data=', data)
  return data;
};