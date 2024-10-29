/* eslint-disable prettier/prettier */
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/**/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
