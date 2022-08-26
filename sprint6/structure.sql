-- CREAR LA DB
drop database if exists grupo3db;
create database grupo3db;

-- USAR LA DB
use grupo3db;

-- CREAR LAS TABLAS

-- TABLA USERS
drop table if exists users
create table users(
id int 6 not null primary key unique,
username varchar(45) not null unique,
email varchar(45) not null unique,
password varchar(255) not null unique,
image  varchar(255),
first_name  varchar(255),
last_name  varchar(255),
address varchar(255),
phone varchar(255),
roles_id int 2 not null);



-- TABLA roles
drop table if exists roles
create table roles(
id int 2 not null primary key unique,
role varchar(45) not null unique);



-- TABLA favourites
drop table if exists favourites
create table favourites(
id int 4 not null primary key unique,
users_id int 6 not null,
products_id int 6 not null);


-- TABLA products
drop table if exists products
create table products(
id int 6 not null primary key unique,
name varchar(100) not null unique,
price decimal(10,2) not null,
description text(500),
image  varchar(255),
discount tinyint(3),
categories_id int 6 not null,
status_id int 6 not null);




-- TABLA categories
drop table if exists roles
create table roles(
id int 6 not null primary key unique,
category varchar(45) not null unique);




-- TABLA status
drop table if exists status
create table status(
id int 6 not null primary key unique,
status varchar(45) not null unique);

-- TABLA cart
drop table if exists cart
create table cart(
id int 6 not null primary key unique,
quantity tinyint(2),
total decimal(10,2) not null,
users_id int 6 not null,
products_id int 6 not null);



-- TABLA sales
drop table if exists sales
create table sales(
id int 10 not null primary key unique,
created_at timestamp,
updated_at timestamp,
cart_id int 6 not null);



-- TABLA sales_details
drop table if exists sales_details
create table sales_details(
id int 10 not null primary key unique,
sales_id int 10 not null);



-- CREAR LAS RELACIONES

-- RELACIÓN 1 a n entre tablas sales (1) y sales_details (n)
alter table sales_details add constraint fk_sales_sales_details
foreign key(sales_id)
references sales(sales_id) on delete no action on update no action;



-- RELACIÓN 1 a n entre tablas cart (1) y sales (n)
alter table sales add constraint fk_cart_sales
foreign key(cart_id)
references cart(cart_id) on delete no action on update no action;



-- RELACIÓN 1 a n entre tablas products (1) y cart (n)
alter table cart add constraint fk_products_cart
foreign key(products_id)
references products(products_id) on delete no action on update no action;





-- RELACIÓN 1 a n entre tablas categories (1) y products (n)
alter table products add constraint fk_categories_products
foreign key(categories_id)
references categories(categories_id) on delete no action on update no action;




-- RELACIÓN 1 a n entre tablas status (1) y products (n)
alter table products add constraint fk_status_products
foreign key(status_id)
references status(status_id) on delete no action on update no action;





-- RELACIÓN 1 a n entre tablas products (1) y favourites (n)
alter table favourites add constraint fk_products_favourites
foreign key(products_id)
references products(products_id) on delete no action on update no action;





-- RELACIÓN 1 a n entre tablas users (1) y favourites (n)
alter table favourites add constraint fk_users_favourites
foreign key(users_id)
references users(users_id) on delete no action on update no action;




-- RELACIÓN 1 a n entre tablas roles (1) y users (n)
alter table users add constraint fk_roles_users
foreign key(roles_id)
references roles(roles_id) on delete no action on update no action;

