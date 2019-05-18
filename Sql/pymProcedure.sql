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

-- ------------------------------------------------------------------------------------------------------------------------
-- PRODUCT PROCEDURE :D
-- PROCEDURE PRODUCT INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS productins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productins (
  _code varchar(100),
  _name varchar(255),
  _net_price varchar(45),
  _category_id int(11),
  _tax_id int(11),
  _status tinyint(4)
)
BEGIN
INSERT INTO proyectomodular.product (code,name,net_price,category_id,tax_id,status) 
VALUES
(_code,_name,_net_price,_category_id,_tax_id,_status);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRODUCT UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS productupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productupd (
  _product_id int(11),
  _code varchar(100),
  _name varchar(255),
  _net_price varchar(45),
  _category_id int(11),
  _tax_id int(11),
  _status tinyint(4))
BEGIN

UPDATE proyectomodular.product
SET
code=_code,
name=_name,
net_price=_net_price,
category_id=_category_id,
tax_id=_tax_id,
status=_status
WHERE 
product_id = _product_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRODUCT ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS productone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productone (_product_id INT)
BEGIN
SELECT p.product_id,p.code,p.name,p.net_price,p.category_id,p.tax_id,p.status
FROM proyectomodular.product AS p
WHERE product_id = _product_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRODUCT DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS productdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productdel (_product_id INT)
BEGIN

DELETE FROM proyectomodular.product
WHERE product_id = _product_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRODUCT LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS productall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productall ()
BEGIN

SELECT  p.product_id,p.code,p.name,p.net_price,p.category_id,p.tax_id,p.status
FROM proyectomodular.product AS p;

END$$

DELIMITER ;

USE proyectomodular;

-- ------------------------------------------------------------------------------------------------------------------------
-- MODULE PROCEDURE :D
-- PROCEDURE MODULE INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS moduleins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE moduleins (
_name varchar(100),
_status tinyint(4))
BEGIN
INSERT INTO proyectomodular.module (name,status) 
VALUES
(_name,_status);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE MODULE UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS moduleupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE moduleupd (
_module_id INT, 
_name varchar(100),
_status tinyint(4))
BEGIN

UPDATE proyectomodular.module
SET
name = _name,
status = _status
WHERE 
module_id = _module_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE MODULE ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS moduleone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE moduleone (_module_id INT)
BEGIN
SELECT  m.module_id, m.name, m.status
FROM proyectomodular.module AS m
WHERE module_id = _module_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE MODULE DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS moduledel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE moduledel (_module_id INT)
BEGIN

DELETE FROM proyectomodular.module
WHERE module_id = _module_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE MODULE LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS moduleall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE moduleall ()
BEGIN

SELECT  m.module_id, m.name, m.status
FROM proyectomodular.module AS m;

END$$

DELIMITER ;

USE proyectomodular;

-- ------------------------------------------------------------------------------------------------------------------------
-- privilege PROCEDURE :D
-- PROCEDURE PRIVILEGE INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS privilegeins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE privilegeins (
  _name varchar(100),
  _module_id int(11),
  _icon varchar(75),
  _route varchar(75),
  _status tinyint(4))
BEGIN
INSERT INTO proyectomodular.privilege (name, module_id, icon, route, status) 
VALUES
(_name, _module_id, _icon, _route, _status);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRIVILEGE UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS privilegeupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE privilegeupd (
  _privilege_id int(11),
  _name varchar(100),
  _module_id int(11),
  _icon varchar(75),
  _route varchar(75),
  _status tinyint(4))
BEGIN

UPDATE proyectomodular.privilege
SET
  name=_name,
  module_id=_module_id,
  icon=_icon ,
  route=_route,
  status=_status
  WHERE 
privilege_id = _privilege_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRIVILEGE ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS privilegeone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE privilegeone (_privilege_id INT)
BEGIN
SELECT  p.privilege_id, p.name, p.module_id, p.icon, p.route, p.status
FROM proyectomodular.privilege AS p
WHERE privilege_id = _privilege_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRIVILEGE DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS privilegedel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE privilegedel (_privilege_id INT)
BEGIN

DELETE FROM proyectomodular.privilege
WHERE privilege_id = _privilege_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRIVILEGE LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS privilegeall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE privilegeall ()
BEGIN

SELECT  p.privilege_id, p.name, p.module_id, p.icon, p.route, p.status
FROM proyectomodular.privilege AS p;

END$$

DELIMITER ;

-- ------------------------------------------------------------------------------------------------------------------------
-- MODULE PROCEDURE :D
-- PROCEDURE MODULE INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS moduleins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE moduleins (
_name varchar(100),
_status tinyint(4))
BEGIN
INSERT INTO proyectomodular.module (name,status) 
VALUES
(_name,_status);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE MODULE UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS moduleupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE moduleupd (

_rp_privilege_id, 
_rp_rol_id, 
_view, 
_create, 
_update, 
_delete tinyint(4))
BEGIN

UPDATE proyectomodular.module
SET

rp_privilege_id = _rp_privilege_id, 
rp_rol_id = _rp_rol_id, 
`view` = _view, 
`create`=_create, 
`update`=_update, 
`delete`=delete	
WHERE 
module_id = _module_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------------------------------------------------------------------
-- ROL_PRIVILEGE PROCEDURE :D
-- PROCEDURE ROL_PRIVILEGE INSERT
-- ------------------------------------------------------------

DROP procedure IF EXISTS privilegeins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rol_privilegeins (
 _rp_privilege_id INT(11),
 _rp_rol_id INT(11),
 _view TINYINT(4),
 _create TINYINT(4),
 _update TINYINT(4),
 _delete TINYINT(4))
BEGIN
INSERT INTO proyectomodular.rol_privilege (rp_privilege_id, rp_rol_id, view, `create`,`update`,`delete`) 
VALUES
(_rp_privilege_id, _rp_rol_id, _view, _create,_update,_delete);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE ROL_PRIVILEGE UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS privilegeupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rol_privilegeupd (
 _rp_privilege_id INT(11),
 _rp_rol_id INT(11),
 _view TINYINT(4),
 _create TINYINT(4),
 _update TINYINT(4),
 _delete TINYINT(4))
BEGIN
UPDATE proyectomodular.rol_privilegeupd
SET
 rp_privilege_id = _rp_privilege_id,
 rp_rol_id= _rp_rol_id,
 `view`= _view,
 `create`= _create,
 `update`= _update,
 `delete` = _delete
WHERE rp_rol_id = _rp_rol_id AND rp_privilege_id= _rp_privilege_id;
END$$

-- ------------------------------------------------------------
-- PROCEDURE ROL_PRIVILEGE ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS rol_privilegeone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rol_privilegeone (_privilege_id INT)
BEGIN
SELECT  rp.rp_privilege_id, rp.rp_rol_id, rp.view, rp.create, rp.update, rp.delete
FROM proyectomodular.rol_privilegeone AS rp
WHERE rp_rol_id = _rp_rol_id AND rp_privilege_id= _rp_privilege_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE ROL_PRIVILEGE DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS rol_privilegedel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rol_privilegedel (
  _rp_privilege_id int(11),
  _rp_rol_id int(11)
)
BEGIN

DELETE FROM proyectomodular.rol_privilege
WHERE rp_rol_id = _rp_rol_id AND rp_privilege_id= _rp_privilege_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE ROL_PRIVILEGE LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS rol_privilegeall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rol_privilegeall (
_rp_rol_id int(11)
)
BEGIN

SELECT  rp.rp_privilege_id, rp.rp_rol_id, rp.view, rp.create, rp.update, rp.delete
FROM proyectomodular.rol_privilege AS rp
WHERE rp.rp_rol_id = _rp_rol_id;
END$$

DELIMITER ;