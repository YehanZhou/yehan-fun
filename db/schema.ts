import { integer, text, boolean, time, pgTable } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});


export const category = pgTable("category", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  description: text("description").notNull(),
  rank: integer("rank").notNull(),
  createTime: time("create_time").default("now()").notNull(),
  updateTime: time("update_time").default("now()").notNull(),
  // links: categoryRelations()
});

export const categoryRelations = relations(category, ({many}) => ({
  links: many(link)
}));

export const link = pgTable("link", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  url: text("url").notNull(),
  description: text("description").notNull(),
  rank: integer("rank").notNull(),
  createTime: time("create_time").default("now()").notNull(),
  updateTime: time("update_time").default("now()").notNull(),
  public: boolean("public").default(false).notNull(),
  status: integer("status").default(1).notNull(),
  categoryId: integer("category_id").notNull().references(()=>category.id),
});

export const linkRelations = relations(link, ({ one }) => ({
  author: one(category, {
    fields: [link.id],
    references: [category.id],
  }),
}));


