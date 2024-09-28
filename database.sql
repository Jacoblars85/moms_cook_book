DROP TABLE IF EXISTS "user";


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (16) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
);
	  
