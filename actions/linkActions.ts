"use server";
import {eq,asc} from "drizzle-orm";
import {revalidatePath} from "next/cache";
import db from "@/db/drizzle";
import {category,link} from "@/db/schema";
import { CategoryInterface } from "@/types/category";
import { drizzle } from 'drizzle-orm/neon-serverless';
// import { LinkInterface } from "@/types/link";
// const db = drizzle({ schema });

// export const getLinksByCategoryId = async (categoryId:number) => {
//   const links: LinkInterface[] = await db.select().from(link).orderBy(asc(link.id)).where(eq(link.categoryId, categoryId));
//   return links;
// }
// const db = drizzle({ schema });

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

export const addCategory = async (params: CategoryInterface) => {
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
    console.log('links=', category.links)
    category.links.sort((a, b) => (a.rank || 0) - (b.rank || 0));
  });
  return data;
};