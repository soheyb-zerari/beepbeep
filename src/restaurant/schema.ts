/* eslint-disable prettier/prettier */
import {
  pgTable,
  serial,
  timestamp,
  boolean,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('restaurant', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  isOpen: boolean(),
  createdAt: timestamp('created_at').defaultNow(),
});
