CREATE DATABASE bamazon;

USE bamazon;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100)  NOT NULL,
    price DECIMAL(8, 2) NULL,
    stock_quantity SMALLINT
);

UPDATE products SET stock_quantity = 1 WHERE item_id = 2;
               
SELECT * FROM products;