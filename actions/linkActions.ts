"use server";
import { eq, asc, sql } from "drizzle-orm"; // Added sql import for raw SQL functions
import { revalidatePath } from "next/cache";
import db from "@/db/drizzle";
import { category, link } from "@/db/schema";
import { CategoryInterface } from "@/types/category";
import { LinkInterface } from "@/types/link";

export const addLinksBatch = async (paramsArray: LinkInterface[]) => {
  // Basic validation
  if (!Array.isArray(paramsArray)) {
    throw new Error('Invalid input: expected an array');
  }

  // Validate required fields for each link
  const invalidLinks = paramsArray.filter(link => 
    !link.title || 
    !link.url || 
    typeof link.categoryId !== 'number' ||
    !link.name // Added validation for new required field
  );

  if (invalidLinks.length > 0) {
    throw new Error(`Invalid links found: missing title, url or categoryId in ${invalidLinks.length} link(s)`);
  }

  // Convert LinkInterface[] to Drizzle-compatible format with explicit type assertion
  const records = paramsArray.map(({ id, title, url, categoryId, rank, createdAt, updatedAt, name }) => ({
    id: id === undefined ? sql`DEFAULT` : id, // Handle ID with Drizzle SQL function
    name,
    url,
    description: title,
    rank: rank ?? null, // Convert undefined to null for Drizzle
    createTime: createdAt ? sql`'${createdAt.toISOString()}'` : sql`now()`, // Format Date for PostgreSQL
    updateTime: updatedAt ? sql`'${updatedAt.toISOString()}'` : sql`now()`,
    categoryId
  }));

  await db.insert(link).values(records);
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