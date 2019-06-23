USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
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

SELECT * FROM products;
