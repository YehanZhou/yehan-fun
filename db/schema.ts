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
  icon: text("icon"),
  description: text("description"),
  rank: integer("rank"),
  createTime: time("create_time").default("now()").notNull(),
  updateTime: time("update_time").default("now()").notNull(),
});

export const categoryRelations = relations(category, ({many}) => ({
  links: many(link)
}));

export const link = pgTable("link", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon"),
  url: text("url").notNull(),
  description: text("description"),
  rank: integer("rank"),
  createTime: time("create_time").default("now()").notNull(),
  updateTime: time("update_time").default("now()").notNull(),
	categoryId: integer('category_id'),
});

export const linkRelations = relations(link, ({ one }) => ({
  author: one(category, {
    fields: [link.categoryId],
    references: [category.id],
  }),
}));


