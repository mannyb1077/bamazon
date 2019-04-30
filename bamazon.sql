DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products (
--item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price INTEGER (11) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
  );


 INSERT INTO products (product_name, deparment_name, price, stock_quantity)
    VALUES ("Samsung TV", "Electronics", "1000", 1),
    ("Amplifier", "Electronics", 550, 3),
    ("Speakers", "Audio", 680, 12),
    ("Universal Remote", "Control Systems", 380, 7),
    ("Printer", "Office", 150, 1),
    ("Dimmer", "Lighting", 160, 27),
    ("Switch", "Lighting", 150, 10),
    ("HDMI Cable", "Cables", 60, 30),
    ("Network Cable", "Cables", 51, 25),
    ("Router", "Network", 980, 3);


