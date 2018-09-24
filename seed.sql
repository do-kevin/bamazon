-- CUSTOMER VIEW

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blade Runner 2049", "Movies, Music & Games", 19.99, 700),
       ("Mistborn: The Final Empire", "Books & Audible", 17.99, 200),
       ("Lady Bird", "Movies, Music & Game", 14.99, 400),
       ("Witcher 3: Wild Hunt Complete Edition", "Movies, Music & Game", 59.99, 327),
       ("Perry Ellis Men's Slim Fit Dress Pants", "Clothing, Shoes & Jewelry", 49.99, 100),
       ("Charmin Ultra Soft Toilet Paper, Family Mega Roll", "Food and Grocery", 29.99, 1000),
       ("Burley Design Bee Bike Trailer, Yellow", "Sports & Outdoors", 299.00, 50),
       ("American Gods", "Books & Audible", 19.99, 80),
       ("Monstress", "Books & Audible", 9.99, 300),
       ("Kellogg's Fruit Loops Cereal", "Food and Grocery", 12.82, 5000),
       ("From Hell (Hardcover)", "Books & Audible", 39.99, 5),
       ("Sennheiser HD 800 Reference Dynamic Headphone", "Electronics, Computers & Office", 1099.95, 4),
       ("Apple MacBook Pro MD102LL/A 13.3ft", "Electronics, Computers & Office", 1799.99, 2);
		
       
	SELECT * FROM products;
    
    -- Superviser View
    INSERT INTO departments (department_name, over_head_costs)
    VALUES ("Electronics, Computers & Office", 10000),
    ("Clothing, Shoes & Jewelry", 60000);
    
    SELECT * FROM departments;