SELECT * FROM products;
ALTER TABLE products RENAME COLUMN ProductCode TO Productcode;
ALTER TABLE products RENAME COLUMN ProductName TO Productname;
ALTER TABLE products RENAME COLUMN SalePrice TO Saleprice;

ALTER TABLE products
MODIFY COLUMN status varchar(255);
