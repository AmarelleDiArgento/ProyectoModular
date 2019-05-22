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

-- ------------------------------------------------------------
-- PROCEDURE ROL PERMISSIONS
-- ------------------------------------------------------------
DROP procedure IF EXISTS rolpermissions;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rolpermissions (
  _rol_id INT(11) 
)
BEGIN

SELECT rp.rp_privilege_id,rp.rp_rol_id,rp.view,rp.create,rp.update,
    rp.delete,pv.name as privilege_name,pv.module_id,pv.icon,pv.route,
    pv.status as status_privilege,md.name as module_name, md.status as status_module 
    FROM rol_privilege rp 
    INNER JOIN  privilege pv ON rp.rp_privilege_id = pv.privilege_id 
    INNER JOIN  module md ON md.module_id = pv.module_id  
    WHERE md.status = 1 and pv.status = 1 and rp.rp_rol_id  = 1;

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
SELECT  u.user_id, u.username, u.email, u.password, u.rol_id as rol_id, r.name as rol_name, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u
inner join rol as r on u.rol_id = r.rol_id
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

SELECT  u.user_id, u.username, u.email, u.password, u.rol_id as rol_id, r.name as rol_name, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u
inner join rol as r on u.rol_id = r.rol_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE USER Login
-- ------------------------------------------------------------
DROP procedure IF EXISTS userlogin;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userlogin (
  _email VARCHAR(255),
  _password VARCHAR(255)
)
BEGIN
select user_id, username, u.rol_id as rol_id, r.name as rol_name, status  
from user as u 
inner join rol as r on u.rol_id = r.rol_id 
where email = _email and password = _password;
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

SELECT p.product_id, p.code, p.name, p.net_price, p.category_id, c.name as category_name, p.tax_id, t.name as tax_name, t.percent as tax_percent, p.status
FROM proyectomodular.product AS p
inner join tax as t on p.tax_id = t.tax_id
inner join category as c on p.category_id = c.category_id
WHERE p.product_id = _product_id ;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRODUCT ONE BY CODE
-- ------------------------------------------------------------
DROP procedure IF EXISTS productonebycode;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productonebycode (
_code varchar(100)
)
BEGIN

SELECT p.product_id, p.code, p.name, p.net_price, p.category_id, c.name as category_name, p.tax_id, t.name as tax_name, t.percent as tax_percent, p.status
FROM proyectomodular.product AS p
inner join tax as t on p.tax_id = t.tax_id
inner join category as c on p.category_id = c.category_id
WHERE p.code = _code ;
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

SELECT p.product_id, p.code, p.name, p.net_price, p.category_id, c.name as category_name, p.tax_id, t.name as tax_name, t.percent as tax_percent, p.status
FROM proyectomodular.product AS p
inner join tax as t on p.tax_id = t.tax_id
inner join category as c on p.category_id = c.category_id;

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
-- ROL_PRIVILEGE PROCEDURE :D
-- PROCEDURE ROL_PRIVILEGE INSERT
-- ------------------------------------------------------------

DROP procedure IF EXISTS rol_privilegeins;

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
DROP procedure IF EXISTS rol_privilegeupd;

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

SELECT  rp.rp_privilege_id, p.name as privilege_name, rp.rp_rol_id, r.name as rol_name, rp.view, rp.create, rp.update, rp.delete
FROM proyectomodular.rol as r
inner join proyectomodular.rol_privilege AS rp on r.rol_id = rp.rp_rol_id
inner join proyectomodular.privilege as p on rp.rp_privilege_id = p.privilege_id
WHERE rp.rp_rol_id = _rp_rol_id and p.status = 1;
END$$

DELIMITER ;

-- ------------------------------------------------------------------------------------------------------------------------
-- POD PROCEDURE :D
-- PROCEDURE POD INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS podins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE podins (
  _name varchar(120),
  _address varchar(255),
  _phone varchar(12),
  _status tinyint(4)
)
BEGIN
INSERT INTO proyectomodular.pod (name,address,phone,status) 
VALUES
(_name,_address,_phone,_status);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS podupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE podupd (
  _pod_id int(11),
  _name varchar(120),
  _address varchar(255),
  _phone varchar(12),
  _status tinyint(4)
)
BEGIN

UPDATE proyectomodular.pod
SET  
  name = _name,
  address = _address, 
  phone = _phone,
  status = _status
WHERE 
pod_id = _pod_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS podone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE podone (_pod_id INT)
BEGIN
SELECT  p.name,p.address,p.phone,p.status
FROM proyectomodular.pod AS p
WHERE pod_id = _pod_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS poddel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE poddel (_pod_id INT)
BEGIN

DELETE FROM proyectomodular.pod
WHERE pod_id = _pod_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD LIST ALL
-- ------------------------------------------------------------
DROP procedure IF EXISTS podall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE podall ()
BEGIN

SELECT  p.name,p.address,p.phone,p.status
FROM proyectomodular.pod AS p;

END$$

DELIMITER ;

-- ------------------------------------------------------------------------------------------------------------------------
-- POD PROCEDURE :D
-- PROCEDURE POD_USER INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS pod_userins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE pod_userins (
  _ps_user_id varchar(45),
  _ps_pod_id int(11)
)
BEGIN
INSERT INTO proyectomodular.pod_user (ps_user_id,ps_pod_id) 
VALUES
(_ps_user_id,_ps_pod_id);
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD_USER DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS pod_userdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE pod_userdel (
  _ps_user_id varchar(45),
  _ps_pod_id int(11)
  )
BEGIN

DELETE FROM proyectomodular.pod_user
WHERE ps_user_id = _ps_user_id AND ps_pod_id = _ps_pod_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD_USER - LISTAR USUARIOS POR PUNTO DE VENTA
-- ------------------------------------------------------------
DROP procedure IF EXISTS pod_useralluserbypod;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE pod_useralluserbypod (
_ps_pod_id int(11)
)
BEGIN
SELECT u.user_id, u.username, email, u.rol_id, r.name, u.status, u.create_time, u.update_time
FROM rol as r
inner join user as u on r.rol_id = u.rol_id 
inner join pod_user as pu on u.user_id = pu.ps_user_id
inner join pod as p on pu.ps_pod_id = p.pod_id
where p.pod_id  = _ps_pod_id 
order by u.username;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD_USER - LISTAR PUNTO DE VENTA POR USUARIOS
-- ------------------------------------------------------------
DROP procedure IF EXISTS pod_userallpodbyuser;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE pod_userallpodbyuser (
  _ps_user_id varchar(45)
)
BEGIN
SELECT p.name,p.address,p.phone,p.status 
FROM user as u 
inner join pod_user as pu on u.user_id = pu.ps_user_id
inner join pod as p on pu.ps_pod_id = p.pod_id
where u.user_id = _ps_user_id;
END$$

DELIMITER ;

