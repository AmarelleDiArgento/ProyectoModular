use proyectomodular;
-- ------------------------------------------------------------
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
-- POD PROCEDURE :D
-- PROCEDURE POD INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS podins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE podins (
  _code varchar(5),
  _nit varchar(15),
  _rdian VARCHAR(45),
  _daterdian date,
  _billing_limit BIGINT,
  _warehouse VARCHAR(10),
  _costcenter INT,
  _name VARCHAR(255),
  _email VARCHAR(100),
  _address VARCHAR(255),
  _phone VARCHAR(12),
  _status TINYINT(4)
  )
BEGIN  

INSERT INTO proyectomodular.pod
(code, nit, rdian, daterdian, billing_limit, warehouse, costcenter, name, email, address, phone, status, create_time, update_time)
VALUES
(_code, _nit, _rdian, _daterdian, _billing_limit, _warehouse, _costcenter, _name, _email, _address, _phone, _status, now(), now());

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS podupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE podupd (
  _pod_id INT(11),
  _code varchar(5),
  _nit varchar(15),
  _rdian VARCHAR(45),
  _daterdian date,
  _billing_limit BIGINT,
  _warehouse VARCHAR(10),
  _costcenter INT,
  _name VARCHAR(255),
  _email VARCHAR(100),
  _address VARCHAR(255),
  _phone VARCHAR(12),
  _status TINYINT(4)
)
BEGIN

UPDATE proyectomodular.pod
SET
code = _code,
nit = _nit,
rdian = _rdian,
daterdian = _daterdian,
billing_limit = _billing_limit,
warehouse = _warehouse,
costcenter = _costcenter, 
name = _name,
email = _email,
address = _address,
phone = _phone,
status = _status,
update_time = now()
WHERE pod_id = _pod_id;

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

SELECT pod.pod_id, pod.code, pod.nit, pod.rdian, pod.daterdian, pod.billing_limit, pod.warehouse, 
pod.costcenter, pod.name, pod.email, pod.address, pod.phone, pod.status, pod.create_time, pod.update_time
FROM proyectomodular.pod
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

SELECT pod.pod_id, pod.code, pod.nit, pod.rdian, pod.daterdian, pod.billing_limit, pod.warehouse, 
pod.costcenter, pod.name, pod.email, pod.address, pod.phone, pod.status, pod.create_time, pod.update_time
FROM proyectomodular.pod;

END$$

DELIMITER ;
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
    WHERE md.status = 1 and pv.status = 1 and rp.rp_rol_id  = _rol_id;

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
-- PROCEDURE CLIENT INSERT
-- ------------------------------------------------------------
DROP procedure IF EXISTS usercliins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE usercliins (
_user_id VARCHAR(45) ,
_username varchar(255),
_email VARCHAR(255)
)
BEGIN

INSERT INTO proyectomodular.user
(user_id,username, email, rol_id, status, create_time, update_time)
VALUES
(_user_id,_username, _email, 1, 0, now(),now());
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE user UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS userupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userupd (
_old_id VARCHAR(45) ,
_user_id VARCHAR(45) ,
_username VARCHAR(255),
_email VARCHAR(255),
_rol_id INT,
_status INT)

BEGIN

UPDATE proyectomodular.user
SET
user_id = _user_id,
username =_username,
email =_email,	
rol_id=_rol_id,
status=_status,
update_time = now()
WHERE 
user_id = _old_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE user ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS userone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userone (
_user_id VARCHAR(45))
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
  _user VARCHAR(255),
  _password VARCHAR(255)
)
BEGIN
select user_id, username, u.rol_id as rol_id, r.name as rol_name, status, min(pu.ps_pod_id) as pod_id
from user as u 
left join rol as r on u.rol_id = r.rol_id 
left join pod_user as pu on u.user_id = pu.ps_user_id
where (email = _user or user_id = _user) and password = _password
group by user_id;
END$$

DELIMITER ;



-- ------------------------------------------------------------
-- PROCEDURE USER PASSWORD UPDATE
-- ------------------------------------------------------------
DROP procedure IF EXISTS userpasupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userpasupd (
  _user_id VARCHAR(255),
  _password_old VARCHAR(255),
  _password_new VARCHAR(255)
)
BEGIN
declare exist int;
select count(user_id) into exist from user as u where u.user_id = _user_id and u.password = _password_old;
if(exist > 0) then
UPDATE proyectomodular.user as u SET  
password = _password_new,
update_time = now()
WHERE u.user_id = _user_id;
ELSE 
select 'without results' as message;
  END IF;
END$$

DELIMITER ;


-- ------------------------------------------------------------
-- PROCEDURE USER PASSWORD RESET
-- ------------------------------------------------------------
DROP procedure IF EXISTS userpasres;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE userpasres (
  _user_id VARCHAR(255),
  _password VARCHAR(255)
)
BEGIN

UPDATE proyectomodular.user as u SET  
password = _password,
update_time = now()
WHERE u.user_id = _user_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------------------------------------------------------------------
-- POD_USER PROCEDURE :D
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

declare cont int;
select  count(ps_user_id) into cont from pod_user 
where ps_user_id = _ps_user_id and ps_pod_id = _ps_pod_id;

if cont>0 then
select 'duplicate record' as error;
else 
INSERT INTO proyectomodular.pod_user (ps_user_id,ps_pod_id) 
VALUES
(_ps_user_id,_ps_pod_id);
end if;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD_USER INSERT LIST
-- ------------------------------------------------------------

DELIMITER $$

DROP PROCEDURE IF EXISTS pods_userins $$
CREATE PROCEDURE pods_userins(_user_id varchar(45), _list MEDIUMTEXT)
BEGIN

DECLARE _next TEXT DEFAULT NULL;
DECLARE _nextlen INT DEFAULT NULL;
DECLARE _pods TEXT DEFAULT NULL;

CALL pod_userdel(_user_id);

delete from pod_user where ps_user_id not in(
SELECT user_id FROM proyectomodular.user);

iterator:
LOOP

-- salir del bucle si la lista parece vacía o era nula;
-- esta precaución adicional es necesaria para evitar un bucle sin fin en el proceso.
  IF LENGTH(TRIM(_list)) = 0 OR _list IS NULL THEN
    LEAVE iterator;
  END IF;

  -- capture the next value from the list
  SET _next = SUBSTRING_INDEX(_list,',',1);
  -- guardar la longitud del valor capturado; necesitaremos eliminar esto
  -- muchos caracteres + 1 desde el principio de la cadena
  -- antes de la próxima iteración
  SET _nextlen = LENGTH(_next);

-- recortar el valor de los espacios iniciales y finales, en el caso de cadenas CSV descuidadas
  SET _pods = TRIM(_next);

-- Insertar el valor extraído en la tabla de destino.
  
  call pod_userins(_user_id,_pods);

-- reescriba la cadena original usando la función de cadena INSERT (),
-- Los argumentos son la cadena original, la posición de inicio, cuántos caracteres se eliminarán,
-- y qué "insertar" en su lugar (en este caso, nosotros "insertamos"
-- una cadena vacía, que elimina _nextlen + 1 caracteres)
  SET _list = INSERT(_list,1,_nextlen + 1,'');
END LOOP;

END $$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE POD_USER DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS pod_userdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE pod_userdel (
  _ps_user_id varchar(45)
  )
BEGIN

DELETE FROM proyectomodular.pod_user
WHERE ps_user_id = _ps_user_id;

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
SELECT  p.privilege_id, p.name, p.module_id, m.name as module_name, p.icon, p.route, p.status
FROM proyectomodular.privilege AS p
inner join module as m on p.module_id = m.module_id
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

SELECT  p.privilege_id, p.name, p.module_id, m.name as module_name, p.icon, p.route, p.status
FROM proyectomodular.privilege AS p
inner join module as m on p.module_id = m.module_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------------------------------------------------------------------
-- TAX PROCEDURE :D
-- PROCEDURE TAX INSERT
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
-- PROCEDURE TAX UPDATE 
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
-- PROCEDURE TAX ONE BY ID
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
-- PROCEDURE TAX DELETE BY ID
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
-- PROCEDURE TAX LIST ALL
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
  _image VARCHAR(250),
  _status tinyint(4)
)
BEGIN
INSERT INTO proyectomodular.product (code,name,net_price,category_id,image,status) 
VALUES
(_code,_name,_net_price,_category_id,_image,_status);
SELECT LAST_INSERT_ID() as id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRODUCT UPDATE 
-- ------------------------------------------------------------
DROP procedure IF EXISTS productupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productupd (
  _product_id BIGINT,
  _code varchar(100),
  _name varchar(255),
  _net_price varchar(45),
  _category_id int(11),
  _image VARCHAR(250),
  _status tinyint(4))
BEGIN

UPDATE proyectomodular.product
SET
code=_code,
name=_name,
net_price=_net_price,
category_id=_category_id,
image =_image,
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
CREATE PROCEDURE productone (
_product_id BIGINT
)
BEGIN

	SELECT p.product_id, p.code, p.name, p.net_price, p.category_id, c.name as category_name, 
		GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ', ') as tax_id , 
		GROUP_CONCAT(DISTINCT t.name ORDER BY t.name ASC SEPARATOR ', ') as tax_name , 
		sum(t.percent) as tax_percent, p.image, p.status
	FROM proyectomodular.product AS p
		left join product_tax as pt on p.product_id = pt.pt_product_id
		left join tax as t on pt.pt_tax_id = t.tax_id
	left join category as c on p.category_id = c.category_id
	WHERE p.product_id = _product_id 
	group by p.product_id;

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

SELECT p.product_id, p.code, p.name, p.net_price, p.category_id, c.name as category_name, t.tax_id, t.name as tax_name, sum(t.percent) as tax_percent, p.status, p.image
FROM proyectomodular.product AS p
left join product_tax as pt on p.product_id = pt.pt_product_id
left join tax as t on pt.pt_tax_id = t.tax_id
left join category as c on p.category_id = c.category_id
WHERE p.code = _code 
group by p.product_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRODUCT ONE BY CODE OR ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS productonebycodeorid;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productonebycodeorid (
_codeOrId varchar(100)
)
BEGIN

declare codeOrIdN int;
SET codeOrIdN = (CAST(_codeOrId as UNSIGNED));

SELECT p.product_id, p.code, p.name, p.net_price, p.category_id, c.name as category_name, t.tax_id, t.name as tax_name, t.percent as tax_percent, p.status, p.image
FROM proyectomodular.product AS p
left join product_tax as pt on p.product_id = pt.pt_product_id
left join tax as t on pt.pt_tax_id = t.tax_id
left join category as c on p.category_id = c.category_id
WHERE p.code = _codeOrId or p.product_id = @codeOrIdN;
END$$

DELIMITER ;



-- ------------------------------------------------------------
-- PROCEDURE PRODUCT DELETE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS productdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE productdel (_product_id BIGINT)
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

	SELECT p.product_id, p.code, p.name, p.net_price, p.category_id, c.name as category_name,
    GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ', ') as tax_ids , 
    GROUP_CONCAT(DISTINCT t.name ORDER BY t.name ASC SEPARATOR ', ') as tax_name , 
    sum(t.percent) as tax_percent, p.status, p.image
	FROM proyectomodular.product AS p
	left join product_tax as pt on p.product_id = pt.pt_product_id
	left join tax as t on pt.pt_tax_id = t.tax_id
	inner join category as c on p.category_id = c.category_id
	group by p.product_id
    order by p.category_id, p.name;


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

declare cont int;
select  count(rp_rol_id) into cont from rol_privilege where rp_privilege_id = _rp_privilege_id and rp_rol_id =_rp_rol_id;
if cont then
select 'duplicate record' as error;
else 
INSERT INTO proyectomodular.rol_privilege (rp_privilege_id, rp_rol_id, view, `create`,`update`,`delete`) 
VALUES (_rp_privilege_id, _rp_rol_id, _view, _create,_update,_delete);
end if;

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
UPDATE proyectomodular.rol_privilege
SET
 rp_privilege_id = _rp_privilege_id,
 rp_rol_id= _rp_rol_id,
 `view`= _view,
 `create`= _create,
 `update`= _update,
 `delete` = _delete
WHERE rp_rol_id = _rp_rol_id AND rp_privilege_id= _rp_privilege_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE ROL_PRIVILEGE ONE BY ID
-- ------------------------------------------------------------
DROP procedure IF EXISTS rol_privilegeone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE rol_privilegeone (_privilege_id INT)
BEGIN
SELECT  rp.rp_privilege_id, rp.rp_rol_id, rp.view, rp.create, rp.update, rp.delete
FROM proyectomodular.rol_privilege AS rp
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
-- SALE PROCEDURE :D
-- PROCEDURE SALE NUM FACTURA
-- ------------------------------------------------------------

DROP procedure IF EXISTS salenum;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE salenum (
in _pod_id int(11),
out numfac bigint
)
BEGIN
declare num bigint;

select max(p.invoice_num) + 1 into num 
from (select invoice_num
from sale as s 
where s.pod_id = _pod_id) as p ;

if num is not null then
set numfac = num;
else
set numfac = 1;
end if;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE INSERT
-- ------------------------------------------------------------

DROP procedure IF EXISTS saleins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saleins (

  in _pod_id INT(11),
  in _user_id VARCHAR(45),
  in _client_id VARCHAR(45),
  in _cardpayment VARCHAR(12),
  in _authorization varchar(45),
  in _discount INT(11),
  in _list_product MEDIUMTEXT
)
BEGIN
declare num bigint;

	call proyectomodular.salenum(_pod_id, @numfac);

	INSERT INTO proyectomodular.sale
	(invoice_num, date, pod_id, cardpayment, authorization, discount, user_id, client_id)
	VALUES
	(@numfac,NOW(),_pod_id, _cardpayment, _authorization, _discount, _user_id, _client_id);
	SELECT LAST_INSERT_ID() INTO num;
	call proyectomodular.sale_productsins(num ,_discount, _list_product);
SELECT num AS sale_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE UPDATE CARD PAYMENT
-- ------------------------------------------------------------

DROP procedure IF EXISTS saleupdacco;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saleupdacco (
  _sale_id BIGINT,
  _user VARCHAR(255),
  _password VARCHAR(255)
)
BEGIN

declare validar INT(11);
select s.rol_id into validar
from user as s
where (email = _user or user_id = _user) and password = _password;

if  validar = 2 then
UPDATE proyectomodular.sale
SET
accountant= 0
WHERE sale_id = _sale_id;
else 
select 'not allowed' as message;
end if;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCTS INSERT
-- ------------------------------------------------------------

DELIMITER $$

DROP PROCEDURE IF EXISTS sale_productsins $$
CREATE PROCEDURE sale_productsins(
	_venta BIGINT, 
	_discount int,
	_list MEDIUMTEXT
    )
BEGIN

DECLARE _next TEXT DEFAULT NULL;
DECLARE _nextlen INT DEFAULT NULL;
DECLARE _value TEXT DEFAULT NULL;
DECLARE _product_id BIGINT;
DECLARE _quantity INT;


iterator:
LOOP

-- salir del bucle si la lista parece vacía o era nula;
-- esta precaución adicional es necesaria para evitar un bucle sin fin en el proceso.
  IF LENGTH(TRIM(_list)) = 0 OR _list IS NULL THEN
    LEAVE iterator;
  END IF;

  -- capture the next value from the list
  SET _next = SUBSTRING_INDEX(_list,',',1);
  -- guardar la longitud del valor capturado; necesitaremos eliminar esto
  -- muchos caracteres + 1 desde el principio de la cadena
  -- antes de la próxima iteración
  SET _nextlen = LENGTH(_next);

-- recortar el valor de los espacios iniciales y finales, en el caso de cadenas CSV descuidadas
  SET _value = TRIM(_next);

-- Insertar el valor extraído en la tabla de destino.

  SET _product_id = left(_value,locate(':',_value)-1);
  SET _quantity = right(_value,length(_value)-locate(':',_value));
  -- SELECT left(_value,locate(':',_value)-1) AS product, right(_value,length(_value)-locate(':',_value)) as quantity;
  
  call sale_productins(_venta,_discount,_product_id,_quantity);

-- reescriba la cadena original usando la función de cadena INSERT (),
-- Los argumentos son la cadena original, la posición de inicio, cuántos caracteres se eliminarán,
-- y qué "insertar" en su lugar (en este caso, nosotros "insertamos"
-- una cadena vacía, que elimina _nextlen + 1 caracteres)
  SET _list = INSERT(_list,1,_nextlen + 1,'');
END LOOP;

END $$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT INSERT
-- ------------------------------------------------------------

DROP procedure IF EXISTS sale_productins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE sale_productins (
  _sp_sale_id BIGINT,
  _discount int,
  _sp_product_id BIGINT,
  _quantity INT(11)
)
BEGIN
declare net real;
declare gross real;
declare tax real;

select (net_price * ((100 - _discount) / 100)) * _quantity into net
from product as p
where p.product_id = _sp_product_id;

select 	(net / (1 + (sum(t.percent) /100))) into gross
from product as p 
inner join product_tax as pt on p.product_id = pt.pt_product_id
inner join tax as t on pt.pt_tax_id = t.tax_id
where p.product_id = _sp_product_id
group by p.product_id;

select (net - gross)  into tax;
INSERT INTO proyectomodular.sale_product
(sp_product_id, sp_sale_id, gross_price, tax_price, net_price, quantity)
VALUES
(_sp_product_id, _sp_sale_id, gross, tax, net, _quantity);

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT UPDATE
-- ------------------------------------------------------------

DROP procedure IF EXISTS sale_productupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE sale_productupd (
  _sp_product_id BIGINT,
  _sp_sale_id BIGINT,
  _gross_price real,
  _net_price real,
  _quantity INT(11)
)
BEGIN

UPDATE proyectomodular.sale_product
SET
sp_sale_id = _sp_sale_id,
gross_price = _gross_price,
net_price = _net_price,
quantity = _quantity
WHERE sp_product_id = _sp_product_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT DELETE
-- ------------------------------------------------------------

DROP procedure IF EXISTS sale_productdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE sale_productdel (
  _sp_product_id BIGINT,
  _sp_sale_id BIGINT
)
BEGIN

DELETE FROM proyectomodular.sale_product
WHERE sp_product_id = _sp_product_id and sp_sale_id = _sp_sale_id;

END$$

DELIMITER ;


-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT ALL
-- ------------------------------------------------------------

DROP procedure IF EXISTS saleall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saleall (
)
BEGIN

	select concat(po.code, ' - ', invoice_num) as invoice_num, s.sale_id, s.date, po.pod_id, po.name as pod_name, s.user_id, u.username as user_name, s.client_id, c.username as client_name, sum(sp.tax_price) as tax_price, sum(sp.gross_price) gross_price, sum(sp.net_price) as net_price
	FROM pod as po 
	inner join sale as s on po.pod_id = s.pod_id
	inner join sale_product as sp on s.sale_id = sp.sp_sale_id
	inner join product as p on sp.sp_product_id = p.product_id
	inner join user as u on s.user_id = u.user_id  
	inner join user as c on s.client_id = c.user_id 
	group by s.sale_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT ONE
-- ------------------------------------------------------------

DROP procedure IF EXISTS saleone;
sale_id
DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saleone (
  _sp_sale_id BIGINT
)
BEGIN

	SELECT 	po.name as pod_name, po.nit, po.rdian, po.billing_limit, po.daterdian, po.phone, po.address, po.code, s.invoice_num, s.sale_id, s.date, s.cardpayment, 
			c.username as client_name, u.username as user_name, p.product_id, sp.quantity, p.name, sp.net_price,
			sp.gross_price as gross_price, sp.tax_price
	FROM pod as po 
	inner join sale as s on po.pod_id = s.pod_id
	inner join sale_product as sp on s.sale_id = sp.sp_sale_id
	inner join product as p on sp.sp_product_id = p.product_id
	inner join user as u on s.user_id = u.user_id  
	inner join user as c on s.client_id = c.user_id 
	where s.sale_id = _sp_sale_id;
				
END$$

DELIMITER ;
   
-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT ALL FOR DATE
-- ------------------------------------------------------------

DROP procedure IF EXISTS sale_productDay;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE sale_productDay (
  _begin varchar(10),
  _end varchar(10)
)
BEGIN

    Select p.name as Productos, sum(sp.quantity) as Cantidad, sum(sp.net_price) as Precio
    from sale as s 
    inner join sale_product as sp on s.sale_id = sp.sp_sale_id
    inner join product as p on sp.sp_product_id = p.product_id
	where s.date between concat(_begin, " 00:00:00") and concat(_end, " 23:59:59")
    and s.accountant = 1 
    group by product_id
    order by p.name asc; 
	
END$$

DELIMITER ;
 
    
-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT ALL FOR DATE
-- ------------------------------------------------------------

DROP procedure IF EXISTS saledate;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saledate (
  _begin varchar(10),
  _end varchar(10)
)
BEGIN

	SELECT concat(po.code, ' - ', invoice_num) as invoice_num, s.sale_id, s.date, po.pod_id, po.name as pod_name, 
    s.user_id, u.username as user_name, s.client_id, c.username as client_name, 
    sum(sp.tax_price) as tax_price, sum(sp.gross_price) gross_price, sum(sp.net_price) as net_price
	FROM pod as po 
	left join sale as s on po.pod_id = s.pod_id
	left join sale_product as sp on s.sale_id = sp.sp_sale_id
	left join product as p on sp.sp_product_id = p.product_id
	left join user as u on s.user_id = u.user_id  
	left join user as c on s.client_id = c.user_id 
	where s.date between concat(_begin, " 00:00:00") and concat(_end, " 23:59:59")
    and s.accountant = 1
	group by sale_id
    order by sale_id desc;
	
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PRODUCT_TAX PROCEDURE :D
-- PROCEDURE PRODUCT_TAX INSERT
-- ------------------------------------------------------------

DROP procedure IF EXISTS producttaxins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE  producttaxins(
  _pt_product_id INT(11),
  _pt_tax_id INT(11)
)
BEGIN

declare cont int;
select  count(pt_product_id) into cont from product_tax where pt_product_id = _pt_product_id and pt_tax_id = _pt_tax_id;
if cont then
select 'duplicate record' as error;
else 
INSERT INTO proyectomodular.product_tax
(pt_product_id, pt_tax_id) VALUES
(_pt_product_id, _pt_tax_id);
end if;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE PRODUCT_TAX INSERT LIST
-- ------------------------------------------------------------

DELIMITER $$

DROP PROCEDURE IF EXISTS producttaxsins $$
CREATE PROCEDURE producttaxsins(_product_id BIGINT, _list MEDIUMTEXT)
BEGIN

DECLARE _next TEXT DEFAULT NULL;
DECLARE _nextlen INT DEFAULT NULL;
DECLARE _taxs TEXT DEFAULT NULL;
CALL producttaxdel(_product_id);

iterator:
LOOP

-- salir del bucle si la lista parece vacía o era nula;
-- esta precaución adicional es necesaria para evitar un bucle sin fin en el proceso.
  IF LENGTH(TRIM(_list)) = 0 OR _list IS NULL THEN
    LEAVE iterator;
  END IF;

  -- capture the next value from the list
  SET _next = SUBSTRING_INDEX(_list,',',1);
  -- guardar la longitud del valor capturado; necesitaremos eliminar esto
  -- muchos caracteres + 1 desde el principio de la cadena
  -- antes de la próxima iteración
  SET _nextlen = LENGTH(_next);

-- recortar el valor de los espacios iniciales y finales, en el caso de cadenas CSV descuidadas
  SET _taxs = TRIM(_next);

-- Insertar el valor extraído en la tabla de destino.

  -- SELECT left(_taxs,locate(':',_taxs)-1) AS product, right(_taxs,length(_taxs)-locate(':',_taxs)) as quantity;
  
  call producttaxins(_product_id,_taxs);

-- reescriba la cadena original usando la función de cadena INSERT (),
-- Los argumentos son la cadena original, la posición de inicio, cuántos caracteres se eliminarán,
-- y qué "insertar" en su lugar (en este caso, nosotros "insertamos"
-- una cadena vacía, que elimina _nextlen + 1 caracteres)
  SET _list = INSERT(_list,1,_nextlen + 1,'');
END LOOP;

END $$

DELIMITER ;



-- ------------------------------------------------------------
-- PROCEDURE PRODUCT_TAX DELETE
-- ------------------------------------------------------------

DROP procedure IF EXISTS producttaxdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE  producttaxdel(
  _pt_product_id INT(11)
)
BEGIN
DELETE FROM proyectomodular.product_tax
WHERE pt_product_id = _pt_product_id;

END$$

DELIMITER ;

