-- Deploy fresh database tables
-- \i "/docker-entrypoint-initdb.d/tables/users.sql"
-- \i "/docker-entrypoint-initdb.d/tables/login.sql"
-- \i "/docker-entrypoint-initdb.d/seed/seed.sql"

BEGIN TRANSACTION;

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash varchar(100) NOT NULL,
    email text UNIQUE NOT NULL
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL,
    age INT DEFAULT 0,
    pet varchar(100)
);


insert into users (name, email, entries, joined, age, pet) values ('a', 'a@a.com', 5, '2018-01-01',22,"Dragon");
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'a@a.com');


COMMIT;
