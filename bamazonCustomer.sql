DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY "brooklyn25";


USE bamazon;

CREATE TABLE products (
  item_q
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(250) NOT NULL,
  department_name VARCHAR(250),
  price INTEGER(10),
  stock_quantity INTEGER (10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Electronics", "600", "100"),
("iMac", "Electronics","2500","100"),
("iPhone", "Electronics","1000","10000"),
 ("Dishwasher", "Home Appliances","600","20"),
("Refridgerator", "Home Appliances","2000","30"),
("Microwave", "Home Appliances","350", "47"),
 ("The Traveler", "Books","25", "250"),
("Hatchet", "Books","20","500"),
("1984", "Books","18","4891"),
("Ready Player One", "Books","20","600");





SELECT 
    *
FROM
    products;
