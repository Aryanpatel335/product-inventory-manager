from __future__ import print_function
from dataclasses import dataclass
from re import M
import pandas as pd
import mysql.connector
from mysql.connector import errorcode


import mysql.connector
from mysql.connector import errorcode
data = pd.read_csv (r'C:\Users\aryan\Documents\PROJECTS\JAVA_SQL_INVENTORY_PROJECT\DataForSql.csv')   

df = pd.DataFrame(data)
mydb = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  password="<Password>",
  database="products"
)

mycursor = mydb.cursor()
# mycursor.execute("DROP TABLE Products")
# mycursor.execute("CREATE TABLE Products (id int NOT NULL AUTO_INCREMENT, PID VARCHAR(255), ProductCode VARCHAR(255) NOT NULL, ProductName VARCHAR(255) NOT NULL, Category VARCHAR(255) NOT NULL, SalePrice DECIMAL(5,2) , PRIMARY KEY (id) )")

for row in df.itertuples():
    mycursor.execute('''
                INSERT INTO Products (PID, ProductCode, ProductName,Category, SalePrice)
                VALUES (%s, %s,%s, %s,%s)
                ''',
                (
                row.PID,
                row.ProductCode,
                row.ProductName,
                row.Category,
                row.SalePrice
                ))
    # print(row.ProductName)
mydb.commit()