CREATE TABLE IF NOT EXISTS "restaurant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"isOpen" boolean,
	"created_at" timestamp DEFAULT now()
);
