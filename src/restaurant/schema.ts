/* eslint-disable prettier/prettier */
import {
  pgTable,
  serial,
  timestamp,
  boolean,
  varchar,
} from 'drizzle-orm/pg-core';

export const restaurant = pgTable('restaurant', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  isOpen: boolean(),
  createdAt: timestamp('created_at').defaultNow(),
});
