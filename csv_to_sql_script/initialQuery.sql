SELECT * FROM products;
ALTER TABLE products RENAME COLUMN ProductCode TO Productcode;
ALTER TABLE products RENAME COLUMN ProductName TO Productname;
ALTER TABLE products RENAME COLUMN SalePrice TO Saleprice;

ALTER TABLE products
MODIFY COLUMN status varchar(255); 

-- ALTER TABLE users
-- ADD email varchar(255);
-- ALTER TABLE users RENAME COLUMN email TO Email;

-- CREATE TABLE Users (
-- 	id int NOT NULL AUTO_INCREMENT,
-- 	Googlesubid varchar(255),
--     Username varchar(255),
-- 	PRIMARY KEY (id)

-- );

SELECT * FROM Users;

-- INSERT INTO Users (Googlesubid, Username, Email)
-- VALUES ("117614101106840983613","Aryan Patel", "aryanp862002@gmail.com");

-- INSERT INTO Users (Googlesubid, Username, Email)
-- VALUES ("113693557071138178953","bob ping", "totifuruti11@gmail.com");

UPDATE Users SET Email = "wetheforniteplayers12458@gmail.com" WHERE id=5;  
