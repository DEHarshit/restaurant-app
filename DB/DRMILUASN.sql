drop database DRMILUASN;
create database DRMILUASN;
show databases;
use DRMILUASN;

DESC DISHES;
DESC STOCK;

SELECT * FROM DISHES;
SELECT * FROM RECIPES;
SELECT * FROM STOCK;
SELECT * FROM INGREDIENTS;
SELECT * FROM USERS;
SELECT * FROM BILLS;
SELECT * FROM BILLDETAILS;
SELECT * FROM ORDERS;
SELECT * FROM ORDETAILS;

DROP TABLE IF EXISTS ORDETAILS;
DROP TABLE IF EXISTS ORDERS;
DROP TABLE IF EXISTS RECIPES;
DROP TABLE IF EXISTS STOCK;
DROP TABLE IF EXISTS INGREDIENTS;
DROP TABLE IF EXISTS BILLDETAILS;
DROP TABLE IF EXISTS DISHES;
DROP TABLE IF EXISTS BILLS;
DROP TABLE IF EXISTS USERS;
DROP VIEW TOTAL_STOCK;

CREATE TABLE IF NOT EXISTS USERS(
ID INT NOT NULL AUTO_INCREMENT,
NAME VARCHAR(20) UNIQUE,
PASSWORD VARCHAR(20),
PREVPASS VARCHAR(20),
ROLE VARCHAR(15),
EMAIL VARCHAR(40),
PHONE BIGINT,
PRIMARY KEY(ID)
);


CREATE TABLE IF NOT EXISTS BILLS(
ID INT NOT NULL AUTO_INCREMENT,
USERID INT,
GEN_DATE DATE,
TOTAL_AMOUNT INT,
PRIMARY KEY(ID),
FOREIGN KEY (USERID) REFERENCES USERS(ID)
);


CREATE TABLE IF NOT EXISTS INGREDIENTS( -- INGREDIENT DICTIONARY
ID INT NOT NULL AUTO_INCREMENT,
NAME VARCHAR(20) UNIQUE,
TYPE VARCHAR(20),
UOM VARCHAR(10),
PRIMARY KEY (ID)
);
CREATE TABLE IF NOT EXISTS DISHES(
ID INT NOT NULL AUTO_INCREMENT,
NAME VARCHAR(30) UNIQUE,
DESCRIPTION VARCHAR(150),
IMAGE VARCHAR(100),
SPECIAL BOOL,
PRICE FLOAT,
ISVEG BOOL,
ISPRE BOOL,
COUNT INT,
TYPE SET('M','A','E','N'), -- MORNING, LUNCH, EVENING, NIGHT
PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS BILLDETAILS(
BID INT,
DID INT,
QTY INT,
FOREIGN KEY (BID) REFERENCES BILLS(ID),
FOREIGN KEY (DID) REFERENCES DISHES(ID)
);
CREATE TABLE IF NOT EXISTS RECIPES(
DID INT,
INAME VARCHAR(30),
QTY FLOAT NOT NULL,
FOREIGN KEY (DID) REFERENCES DISHES(ID),
FOREIGN KEY (INAME) REFERENCES INGREDIENTS(NAME) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS STOCK(
ID INT NOT NULL AUTO_INCREMENT,
INAME VARCHAR(30),
QTY FLOAT,
SUPPLIED_DATE DATE,
EXP_DATE DATE,
PRIMARY KEY (ID),
FOREIGN KEY (INAME) REFERENCES INGREDIENTS(NAME) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ORDERS(
ID INT NOT NULL AUTO_INCREMENT,
NAME VARCHAR(20),
ORDPHONE BIGINT,
STATUS VARCHAR(20),
DATE DATETIME,
PRIMARY KEY(ID),
FOREIGN KEY (NAME) REFERENCES USERS(NAME)
);

ALTER TABLE ORDERS ADD PRICE INT;

CREATE TABLE IF NOT EXISTS ORDETAILS(
OID INT,
DNAME VARCHAR(30),
QTY INT,
FIN BOOL,
FOREIGN KEY (OID) REFERENCES ORDERS(ID) ON DELETE CASCADE,
FOREIGN KEY (DNAME) REFERENCES DISHES(NAME) 
);

ALTER TABLE ORDETAILS ADD PRICE INT;

INSERT INTO USERS (NAME,PASSWORD,PREVPASS,ROLE,EMAIL,PHONE) VALUES
('Admin','123123','123123','Admin','admin123@gmail.com','9098978767'),
('Chef','123123','123123','Chef','chef123@gmail.com','9998808652'),
('Customer','123123','123123','Customer','customer123@gmail.com','9875789068');
INSERT INTO INGREDIENTS (NAME, TYPE, UOM) VALUES
('Chicken', 'Meat', 'g'),
('Beef', 'Meat', 'g'),
('Pork', 'Meat', 'g'),
('Fish', 'Meat', 'g'),
('Tofu', 'Meat', 'g'),
('Onions', 'Vegetables', 'g'),
('Tomatoes', 'Vegetables', 'g'),
('Lettuce', 'Vegetables', 'g'),
('Bell peppers', 'Vegetables', 'g'),
('Mushrooms', 'Vegetables', 'g'),
('Carrots', 'Vegetables', 'g'),
('Potatoes', 'Vegetables', 'g'),
('Rice', 'Groceries', 'g'),
('Pasta', 'Groceries', 'g'),
('Bread', 'Groceries', 'g'),
('Lentils', 'Groceries', 'g'),
('Beans', 'Groceries', 'g'),
('Milk', 'Groceries', 'ml'),
('Cheese', 'Groceries', 'g'),
('Eggs', 'Groceries', 'amount'),
('Butter', 'Groceries', 'g'),
('Cream', 'Groceries', 'ml'),
('Salt', 'Condiment', 'g'),
('Pepper', 'Condiment', 'g'),
('Garlic', 'Condiment', 'g'),
('Basil', 'Condiment', 'g'),
('Oregano', 'Condiment', 'g'),
('Thyme', 'Condiment', 'g'),
('Paprika', 'Condiment', 'g'),
('Cumin', 'Condiment', 'g'),
('Tomato sauce', 'Condiment', 'ml'),
('Soy sauce', 'Condiment', 'ml'),
('Olive oil', 'Condiment', 'ml'),
('Balsamic vinegar', 'Condiment', 'ml'),
('Mustard', 'Condiment', 'ml'),
('Mayonnaise', 'Condiment', 'ml'),
('Ketchup', 'Condiment', 'ml'),
('Sugar', 'Condiment', 'g'),
('Flour', 'Groceries', 'g'),
('Baking powder', 'Groceries', 'g'),
('Yeast', 'Groceries', 'g'),
('Yogurt', 'Groceries', 'ml'),
('Lemon', 'Vegetables', 'g'),
('Ginger', 'Vegetables', 'g'),
('Coriander', 'Vegetables', 'g'),
('Chilli Powder', 'Condiment', 'g'),
('Tumeric', 'Condiment', 'g'),
('Mint Leaves', 'Vegetables', 'g'),
('Cardamon', 'Condiment', 'g'),
('Cinnamon Stick', 'Condiment', 'g'),
('Vegetable Oil', 'Groceries', 'g'),
('Cloves', 'Condiment', 'g'),
('Garam Masala', 'Condiment', 'g'),
('Mutton','Meat','g'),
('Paneer','Groceries','g'),
('Chilli Sauce','Condiment','ml'),
('Vinegar','Condiment','g'),
('Spring Onion','Vegetables','g'),
('Cabbage','Vegetables','g');

CREATE VIEW TOTAL_STOCK AS
SELECT INGREDIENTS.NAME AS INAME,COALESCE(SUM(STOCK.QTY), 0) AS QTY
FROM INGREDIENTS
LEFT JOIN STOCK 
ON INGREDIENTS.NAME = STOCK.INAME
GROUP BY INGREDIENTS.NAME;


SELECT * FROM TOTAL_STOCK;

DROP PROCEDURE IF EXISTS isAvailable;
DELIMITER //
CREATE PROCEDURE isAvailable()
BEGIN

END //
DELIMITER;

DROP PROCEDURE IF EXISTS AvailableDishes;
DELIMITER //
CREATE PROCEDURE AvailableDishes()
BEGIN
    DECLARE d_count INT;
    DECLARE dish_id VARCHAR(17);
    DECLARE recipe_cursor CURSOR FOR
        SELECT DISTINCT DID
        FROM ORDERS;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
	SELECT DISTINCT COUNT(DID) INTO d_count FROM RECIPES;
	OPEN recipe_cursor;
		recipe_loop: LOOP
        FETCH recipe_cursor INTO dish_id;

        IF done THEN
            LEAVE recipe_loop;
        END IF;

    END LOOP;
	CLOSE recipe_cursor;
    
END //
DELIMITER ;
