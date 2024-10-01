DROP TABLE IF EXISTS "user";


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (100) UNIQUE NOT NULL,
    "name" VARCHAR(200),
    "password" VARCHAR (100) NOT NULL
);
	  
