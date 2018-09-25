CREATE DATABASE bamazon;

USE bamazon;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100)  NOT NULL,
    price DECIMAL(25, 2) NOT NULL,
    stock_quantity SMALLINT NOT NULL,
    product_sales DECIMAL(8, 2) NOT NULL
);

UPDATE products SET stock_quantity = 200 + 2 WHERE item_id = 2;
               
SELECT * FROM products;

DROP TABLE products;

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INTEGER NOT NULL
);

DROP TABLE departments;

SELECT DISTINCT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales 
FROM departments INNER JOIN products ON (departments.department_name = products.department_name)  
WHERE (departments.department_name = products.department_name) ORDER BY department_id ASC;





