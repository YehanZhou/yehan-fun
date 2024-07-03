"use server";
import {eq,asc} from "drizzle-orm";
import {revalidatePath} from "next/cache";

import db from "@/db/drizzle";
import {category,link} from "@/db/schema";
import { CategoryInterface } from "@/types/category";
import { LinkInterface } from "@/types/link";

export const getLinksByCategoryId = async (categoryId:number) => {
  const links: LinkInterface[] = await db.select().from(link).orderBy(asc(link.id)).where(eq(link.categoryId, categoryId));
  return links;
}
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
    const data: CategoryInterface[] = await db.select().from(category).orderBy(asc(category.id));
    // const dataLink:Category[] = data.map(async item => ({...item, links: await getLinksByCategoryId(item.id)}))
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

// export const  getCateLinks = async (id: number) => {
//   const data = await db.query.category.findMany({
//     with: {
//       links: true,
//     },
//   });
//   return data;
// }