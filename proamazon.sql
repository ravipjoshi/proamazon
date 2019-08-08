DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL  AUTO_INCREMENT,
  product_name VARCHAR(30) NULL,
  product_description VARCHAR(150) NULL,
  department_name VARCHAR(15) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("JANE STONE","JANE STONE Fashion Inspirational Leather Bracelets Silver Plated Ornaments for Women Girls","Jwellery",7.99, 100);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("Powstro Digital Coin Counter","Powstro Digital Coin Counter, Automatic Piggy Banks Saving Box Jar with LCD Display Large Capacity Including Dollars and Half Dollars for Office Kids Adults","Toys",7.99, 100);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("Darice 120-Piece Deluxe Art Set","Darice 120-Piece Deluxe Art Set – Art Supplies for Drawing, Painting and More in a Plastic Case","Gift",10.85, 5);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("ZEEFO Retro LED","ZEEFO Retro LED Night Light Wireless PIR Motion Sensor, Activated Step Lighting Lamps","Jwellery",9.96, 10);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("LED Tactical Flashlight","LED Tactical Flashlight","Electronics",9.97, 20);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("AmazonBasics 6-Outlet Surge Protector Power Strip","AmazonBasics 6-Outlet Surge Protector Power Strip","Electronics",9.98, 70);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("All-Natural Lip Balm ","All-Natural Lip Balm  for Women Girls","Cosmetics",6.95, 250);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("MH ZONE Bath Body Brush","Natural Bristles Back Body Scrubber with 17 Handle, Use Wet or Dry skin, Relaxing and Exfoliating for Men and Women","BodyCare",11.99, 5);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("Lightning Deal Ring","Lightning Deal Ring,ZYooh Women Two Tone Silver Floral Ring Diamond Gold Sunflower Jewelry Gift","Jwellery",0.99, 500);

INSERT INTO products (product_name,product_description,department_name,price,stock_quantity)
VALUES ("USB WiFi adapter","Plugable USB 2.0 Wireless N 802.11n 150 Mbps Nano WiFi Network Adapter (Realtek RTL8188EUS Chipset) Plug and Play for Windows","Electronics",7.95, 13);





SELECT * FROM products;