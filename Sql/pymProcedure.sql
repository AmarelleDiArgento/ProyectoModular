USE proyectomodular;

-- ------------------------------------------------------------------------------------------------------------------------
-- ROLL PROCEDURE :D
-- PROCEDURE ROLL INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS rolins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rolins (_name varchar(100) )
BEGIN
INSERT INTO proyectomodular.rol (name) 
VALUES
(_name);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE ROLL UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS rolupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rolupd (_rol_id INT, _name varchar(100) )
BEGIN

UPDATE proyectomodular.rol
SET
name = _name
WHERE 
rol_id = _rol_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE ROLL ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS rolone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rolone (_rol_id INT)
BEGIN
SELECT  r.rol_id, r.name
FROM proyectomodular.rol AS r
WHERE rol_id = _rol_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE ROLL DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS roldel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE roldel (_rol_id INT)
BEGIN

DELETE FROM proyectomodular.rol
WHERE rol_id = _rol_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE ROLL LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS rolall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rolall ()
BEGIN

SELECT  r.rol_id, r.name
FROM proyectomodular.rol AS r;

END$$

DELIMITER ;


-- ------------------------------------------------------------------------------------------------------------------------
-- CATEGORY PROCEDURE :D
-- PROCEDURE CATEGORY INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS categoryins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE categoryins (_name varchar(100) )
BEGIN
INSERT INTO proyectomodular.category (name) 
VALUES
(_name);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE CATEGORY UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS categoryupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE categoryupd (_category_id INT, _name varchar(100) )
BEGIN

UPDATE proyectomodular.category
SET
name = _name
WHERE 
category_id = _category_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE CATEGORY ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS categoryone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE categoryone (_category_id INT)
BEGIN
SELECT  c.category_id, c.name
FROM proyectomodular.category AS c
WHERE category_id = _category_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE CATEGORY DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS categorydel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE categorydel (_category_id INT)
BEGIN

DELETE FROM proyectomodular.category
WHERE category_id = _category_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE CATEGORY LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS categoryall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE categoryall ()
BEGIN

SELECT  c.category_id, c.name
FROM proyectomodular.category AS c;

END$$

DELIMITER ;


-- ------------------------------------------------------------------------------------------------------------------------
-- USER PROCEDURE :D
-- PROCEDURE user INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS userins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userins (
_user_id VARCHAR(45) ,
_username varchar(255),
_email VARCHAR(255),
_password VARCHAR(255),
_rol_id INT,
_status tinyint)
BEGIN

INSERT INTO proyectomodular.user
(user_id,username, email, password, rol_id, status, create_time, update_time)
VALUES
(_user_id,_username, _email, _password, _rol_id, _status, now(),now());
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE user UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS userupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userupd (

_user_id VARCHAR(45) ,
_username VARCHAR(255),
_email VARCHAR(255),
_password VARCHAR(255),
_rol_id INT,
_status tinyint)

BEGIN

UPDATE proyectomodular.user
SET
user_id = _user_id ,
username =_username,
email =_email,
password = _password,
rol_id=_rol_id,
update_time = now()
WHERE 
user_id = _user_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE user ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS userone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userone (_user_id INT)
BEGIN
SELECT  u.user_id, u.username, u.email, u.password, u.rol_id, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u
WHERE user_id = _user_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE user DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS userdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userdel (_user_id INT)
BEGIN

DELETE FROM proyectomodular.user
WHERE user_id = _user_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE user LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS userall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userall ()
BEGIN

SELECT  u.user_id, u.username, u.email, u.password, u.rol_id, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u;

END$$

DELIMITER ;

-- ------------------------------------------------------------------------------------------------------------------------
-- taxL PROCEDURE :D
-- PROCEDURE taxL INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS taxins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE taxins (
_name varchar(100), 
_percent decimal(10,2)
)
BEGIN
INSERT INTO proyectomodular.tax (name,percent) 
VALUES
(_name,_percent);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE taxL UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS taxupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE taxupd (
_tax_id INT, 
_name varchar(100),
_percent decimal(10,2) )
BEGIN

UPDATE proyectomodular.tax
SET
name = _name,
percent = _percent
WHERE 
tax_id = _tax_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE taxL ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS taxone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE taxone (_tax_id INT)
BEGIN
SELECT  t.tax_id, t.name, t.percent
FROM proyectomodular.tax AS t
WHERE tax_id = _tax_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE taxL DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS taxdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE taxdel (_tax_id INT)
BEGIN

DELETE FROM proyectomodular.tax
WHERE tax_id = _tax_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE taxL LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS taxall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE taxall ()
BEGIN

SELECT  t.tax_id, t.name, t.percent
FROM proyectomodular.tax AS t;

END$$

DELIMITER ;

