-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema proyectomodular
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proyectomodular
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proyectomodular` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `proyectomodular` ;

-- -----------------------------------------------------
-- Table `proyectomodular`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`module`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`module` (
  `module_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `status` TINYINT(4) NOT NULL,
  PRIMARY KEY (`module_id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`pod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`pod` (
  `pod_id` INT(11) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(5) NOT NULL,
  `nit` VARCHAR(15) NOT NULL,
  `rdian` VARCHAR(45) NOT NULL,
  `daterdian` DATE NOT NULL,
  `billing_limit` BIGINT(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(12) NULL DEFAULT NULL,
  `status` TINYINT(4) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `update_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`pod_id`),
  UNIQUE INDEX `code` (`code` ASC) VISIBLE,
  UNIQUE INDEX `nit` (`nit` ASC) VISIBLE,
  UNIQUE INDEX `rdian` (`rdian` ASC) VISIBLE,
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = 'Point of sale';


-- -----------------------------------------------------
-- Table `proyectomodular`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`rol` (
  `rol_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`rol_id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`user` (
  `user_id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `rol_id` INT(11) NOT NULL,
  `status` TINYINT(4) NOT NULL DEFAULT 1,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `update_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `fk_user_rol` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_rol`
    FOREIGN KEY (`rol_id`)
    REFERENCES `proyectomodular`.`rol` (`rol_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`pod_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`pod_user` (
  `ps_user_id` VARCHAR(45) NOT NULL,
  `ps_pod_id` INT(11) NOT NULL,
  INDEX `fk_user_has_pod_pod1` (`ps_pod_id` ASC) VISIBLE,
  INDEX `fk_user_has_pod_user1` (`ps_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_pod_pod1`
    FOREIGN KEY (`ps_pod_id`)
    REFERENCES `proyectomodular`.`pod` (`pod_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_pod_user1`
    FOREIGN KEY (`ps_user_id`)
    REFERENCES `proyectomodular`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`privilege`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`privilege` (
  `privilege_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `module_id` INT(11) NOT NULL,
  `icon` VARCHAR(75) NOT NULL,
  `route` VARCHAR(75) NOT NULL,
  `status` TINYINT(4) NOT NULL,
  PRIMARY KEY (`privilege_id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  UNIQUE INDEX `icon` (`icon` ASC) VISIBLE,
  UNIQUE INDEX `route` (`route` ASC) VISIBLE,
  INDEX `fk_privilege_module1` (`module_id` ASC) VISIBLE,
  CONSTRAINT `fk_privilege_module1`
    FOREIGN KEY (`module_id`)
    REFERENCES `proyectomodular`.`module` (`module_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`product` (
  `product_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `net_price` DOUBLE NULL DEFAULT NULL,
  `category_id` INT(11) NOT NULL,
  `image` VARCHAR(250) NULL DEFAULT NULL,
  `status` TINYINT(4) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE INDEX `code` (`code` ASC) VISIBLE,
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  INDEX `fk_product_category1` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `proyectomodular`.`category` (`category_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 39
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`tax`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`tax` (
  `tax_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `percent` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`tax_id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`product_tax`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`product_tax` (
  `pt_product_id` BIGINT(20) NOT NULL,
  `pt_tax_id` INT(11) NOT NULL,
  INDEX `fk_product_has_tax_product1` (`pt_product_id` ASC) VISIBLE,
  INDEX `fk_product_has_tax_tax1` (`pt_tax_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_has_tax_product1`
    FOREIGN KEY (`pt_product_id`)
    REFERENCES `proyectomodular`.`product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_tax_tax1`
    FOREIGN KEY (`pt_tax_id`)
    REFERENCES `proyectomodular`.`tax` (`tax_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`rol_privilege`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`rol_privilege` (
  `rp_privilege_id` INT(11) NOT NULL,
  `rp_rol_id` INT(11) NOT NULL,
  `view` TINYINT(4) NOT NULL,
  `create` TINYINT(4) NOT NULL,
  `update` TINYINT(4) NOT NULL,
  `delete` TINYINT(4) NOT NULL,
  INDEX `fk_privilege_has_rol_privilege1` (`rp_privilege_id` ASC) VISIBLE,
  INDEX `fk_privilege_has_rol_rol1` (`rp_rol_id` ASC) VISIBLE,
  CONSTRAINT `fk_privilege_has_rol_privilege1`
    FOREIGN KEY (`rp_privilege_id`)
    REFERENCES `proyectomodular`.`privilege` (`privilege_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_privilege_has_rol_rol1`
    FOREIGN KEY (`rp_rol_id`)
    REFERENCES `proyectomodular`.`rol` (`rol_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`sale`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`sale` (
  `sale_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `invoice_num` BIGINT(20) NOT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `pod_id` INT(11) NOT NULL,
  `cardpayment` VARCHAR(12) NULL DEFAULT NULL,
  `authorization` VARCHAR(45) NULL DEFAULT NULL,
  `user_id` VARCHAR(45) NOT NULL,
  `client_id` VARCHAR(45) NULL DEFAULT NULL,
  `accountant` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`sale_id`),
  INDEX `fk_sale_pod1` (`pod_id` ASC) VISIBLE,
  INDEX `fk_sale_user1` (`user_id` ASC) VISIBLE,
  INDEX `fk_sale_user2` (`client_id` ASC) VISIBLE,
  CONSTRAINT `fk_sale_pod1`
    FOREIGN KEY (`pod_id`)
    REFERENCES `proyectomodular`.`pod` (`pod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `proyectomodular`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_user2`
    FOREIGN KEY (`client_id`)
    REFERENCES `proyectomodular`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`sale_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`sale_product` (
  `sp_product_id` BIGINT(20) NOT NULL,
  `sp_sale_id` BIGINT(20) NOT NULL,
  `gross_price` DOUBLE NULL DEFAULT NULL,
  `tax_price` DOUBLE NULL DEFAULT NULL,
  `net_price` DOUBLE NULL DEFAULT NULL,
  `quantity` INT(11) NOT NULL DEFAULT 1,
  INDEX `fk_product_has_sale_product1` (`sp_product_id` ASC) VISIBLE,
  INDEX `fk_product_has_sale1` (`sp_sale_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_has_sale1`
    FOREIGN KEY (`sp_sale_id`)
    REFERENCES `proyectomodular`.`sale` (`sale_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_sale_product1`
    FOREIGN KEY (`sp_product_id`)
    REFERENCES `proyectomodular`.`product` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `proyectomodular`.`timestamps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectomodular`.`timestamps` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `update_time` TIMESTAMP NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

USE `proyectomodular` ;

-- -----------------------------------------------------
-- procedure categoryall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryall`()
BEGIN

SELECT  c.category_id, c.name
FROM proyectomodular.category AS c;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure categorydel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `categorydel`(_category_id INT)
BEGIN

DELETE FROM proyectomodular.category
WHERE category_id = _category_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure categoryins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryins`(_name varchar(100) )
BEGIN
INSERT INTO proyectomodular.category (name) 
VALUES
(_name);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure categoryone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryone`(_category_id INT)
BEGIN
SELECT  c.category_id, c.name
FROM proyectomodular.category AS c
WHERE category_id = _category_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure categoryupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryupd`(_category_id INT, _name varchar(100) )
BEGIN

UPDATE proyectomodular.category
SET
name = _name
WHERE 
category_id = _category_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure moduleall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `moduleall`()
BEGIN

SELECT  m.module_id, m.name, m.status
FROM proyectomodular.module AS m;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure moduledel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `moduledel`(_module_id INT)
BEGIN

DELETE FROM proyectomodular.module
WHERE module_id = _module_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure moduleins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `moduleins`(
_name varchar(100),
_status tinyint(4))
BEGIN
INSERT INTO proyectomodular.module (name,status) 
VALUES
(_name,_status);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure moduleone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `moduleone`(_module_id INT)
BEGIN
SELECT  m.module_id, m.name, m.status
FROM proyectomodular.module AS m
WHERE module_id = _module_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure moduleupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `moduleupd`(
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

-- -----------------------------------------------------
-- procedure pod_userallpodbyuser
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pod_userallpodbyuser`(
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

-- -----------------------------------------------------
-- procedure pod_useralluserbypod
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pod_useralluserbypod`(
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

-- -----------------------------------------------------
-- procedure pod_userdel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pod_userdel`(
  _ps_user_id varchar(45)
  )
BEGIN

DELETE FROM proyectomodular.pod_user
WHERE ps_user_id = _ps_user_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure pod_userins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pod_userins`(
  _ps_user_id varchar(45),
  _ps_pod_id int(11)
)
BEGIN

declare cont int;
select  count(_ps_user_id) into cont from pod_user where ps_user_id = _ps_user_id and _ps_pod_id = ps_pod_id;
if cont then
select 'duplicate record' as error;
else 
INSERT INTO proyectomodular.pod_user (ps_user_id,ps_pod_id) 
VALUES
(_ps_user_id,_ps_pod_id);
end if;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure podall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `podall`()
BEGIN

SELECT pod.pod_id, pod.code, pod.nit, pod.rdian, pod.daterdian, pod.billing_limit, pod.name, pod.address, pod.phone, pod.status, pod.create_time, pod.update_time
FROM proyectomodular.pod;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure poddel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `poddel`(_pod_id INT)
BEGIN

DELETE FROM proyectomodular.pod
WHERE pod_id = _pod_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure podins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `podins`(
  _code varchar(5),
  _nit varchar(15),
  _rdian VARCHAR(45),
  _daterdian date,
  _billing_limit BIGINT,
  _name VARCHAR(255),
  _address VARCHAR(255),
  _phone VARCHAR(12),
  _status TINYINT(4)
  )
BEGIN  

INSERT INTO proyectomodular.pod
(code, nit, rdian, daterdian, billing_limit, name, address, phone, status, create_time, update_time)
VALUES
(_code, _nit, _rdian, _daterdian, _billing_limit, _name, _address, _phone, _status, now(), now());

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure podone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `podone`(_pod_id INT)
BEGIN

SELECT pod.pod_id, pod.code, pod.nit, pod.rdian, pod.daterdian, pod.billing_limit, pod.name, pod.address, pod.phone, pod.status, pod.create_time, pod.update_time
FROM proyectomodular.pod
WHERE pod_id = _pod_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure pods_userins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pods_userins`(_user_id BIGINT, _list MEDIUMTEXT)
BEGIN

DECLARE _next TEXT DEFAULT NULL;
DECLARE _nextlen INT DEFAULT NULL;
DECLARE _pods TEXT DEFAULT NULL;
CALL pod_userdel(_user_id);

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

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure podupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `podupd`(
  _pod_id INT(11),
  _code varchar(5),
  _nit varchar(15),
  _rdian VARCHAR(45),
  _daterdian date,
  _billing_limit BIGINT,
  _name VARCHAR(255),
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
name = _name,
address = _address,
phone = _phone,
status = _status,
update_time = now()
WHERE pod_id = _pod_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure privilegeall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegeall`()
BEGIN

SELECT  p.privilege_id, p.name, p.module_id, m.name as module_name, p.icon, p.route, p.status
FROM proyectomodular.privilege AS p
inner join module as m on p.module_id = m.module_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure privilegedel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegedel`(_privilege_id INT)
BEGIN

DELETE FROM proyectomodular.privilege
WHERE privilege_id = _privilege_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure privilegeins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegeins`(
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

-- -----------------------------------------------------
-- procedure privilegeone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegeone`(_privilege_id INT)
BEGIN
SELECT  p.privilege_id, p.name, p.module_id, m.name as module_name, p.icon, p.route, p.status
FROM proyectomodular.privilege AS p
inner join module as m on p.module_id = m.module_id
WHERE privilege_id = _privilege_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure privilegeupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegeupd`(
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

-- -----------------------------------------------------
-- procedure productall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productall`()
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
    order by p.name;


END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure productdel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productdel`(_product_id BIGINT)
BEGIN

DELETE FROM proyectomodular.product
WHERE product_id = _product_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure productins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productins`(
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
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure productone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productone`(
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

-- -----------------------------------------------------
-- procedure productonebycode
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productonebycode`(
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

-- -----------------------------------------------------
-- procedure productonebycodeorid
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productonebycodeorid`(
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

-- -----------------------------------------------------
-- procedure producttaxdel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `producttaxdel`(
  _pt_product_id INT(11)
)
BEGIN
DELETE FROM proyectomodular.product_tax
WHERE pt_product_id = _pt_product_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure producttaxins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `producttaxins`(
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

-- -----------------------------------------------------
-- procedure producttaxsins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `producttaxsins`(_product_id BIGINT, _list MEDIUMTEXT)
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

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure productupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `productupd`(
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

-- -----------------------------------------------------
-- procedure rol_privilegeall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rol_privilegeall`(
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

-- -----------------------------------------------------
-- procedure rol_privilegedel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rol_privilegedel`(
  _rp_privilege_id int(11),
  _rp_rol_id int(11)
)
BEGIN

DELETE FROM proyectomodular.rol_privilege
WHERE rp_rol_id = _rp_rol_id AND rp_privilege_id= _rp_privilege_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure rol_privilegeins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rol_privilegeins`(
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

-- -----------------------------------------------------
-- procedure rol_privilegeone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rol_privilegeone`(_privilege_id INT)
BEGIN
SELECT  rp.rp_privilege_id, rp.rp_rol_id, rp.view, rp.create, rp.update, rp.delete
FROM proyectomodular.rol_privilege AS rp
WHERE rp_rol_id = _rp_rol_id AND rp_privilege_id= _rp_privilege_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure rol_privilegeupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rol_privilegeupd`(
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

-- -----------------------------------------------------
-- procedure rolall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rolall`()
BEGIN

SELECT  r.rol_id, r.name
FROM proyectomodular.rol AS r;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure roldel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `roldel`(_rol_id INT)
BEGIN

DELETE FROM proyectomodular.rol
WHERE rol_id = _rol_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure rolins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rolins`(_name varchar(100) )
BEGIN
INSERT INTO proyectomodular.rol (name) 
VALUES
(_name);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure rolone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rolone`(_rol_id INT)
BEGIN
SELECT  r.rol_id, r.name
FROM proyectomodular.rol AS r
WHERE rol_id = _rol_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure rolpermissions
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rolpermissions`(
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

-- -----------------------------------------------------
-- procedure rolupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `rolupd`(_rol_id INT, _name varchar(100) )
BEGIN

UPDATE proyectomodular.rol
SET
name = _name
WHERE 
rol_id = _rol_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sale_productBet
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sale_productBet`(
  _date varchar(10)
)
BEGIN

    Select p.name, sum(sp.quantity), sum(p.net_price) 
    from sale as s 
    inner join sale_product as sp on s.sale_id = sp.sp_sale_id
    inner join product as p on sp.sp_product_id = p.product_id
	where s.date between concat(_date, " 00:00:00") and concat(_date, " 23:59:59")
    group by product_id
    order by p.name asc; 
	
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sale_productDay
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sale_productDay`(
  _begin varchar(10),
  _end varchar(10)
)
BEGIN

    Select p.name as Productos, sum(sp.quantity) as Cantidad, sum(sp.net_price) as Precio
    from sale as s 
    inner join sale_product as sp on s.sale_id = sp.sp_sale_id
    inner join product as p on sp.sp_product_id = p.product_id
	where s.date between concat(_begin, " 00:00:00") and concat(_end, " 23:59:59")
    group by product_id
    order by p.name asc; 
	
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sale_productdel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sale_productdel`(
  _sp_product_id BIGINT,
  _sp_sale_id BIGINT
)
BEGIN

DELETE FROM proyectomodular.sale_product
WHERE sp_product_id = _sp_product_id and sp_sale_id = _sp_sale_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sale_productins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sale_productins`(
  _sp_sale_id BIGINT,
  _sp_product_id BIGINT,
  _quantity INT(11)
)
BEGIN
declare net real;
declare gross real;
declare tax real;

select 	(net_price / (1 + (sum(t.percent) /100))) * _quantity into gross
from product as p 
inner join product_tax as pt on p.product_id = pt.pt_product_id
inner join tax as t on pt.pt_tax_id = t.tax_id
where p.product_id = _sp_product_id
group by p.product_id;

select (p.net_price - (net_price / (1 + ((sum(t.percent) /100))))) * _quantity into tax
from product as p 
inner join product_tax as pt on p.product_id = pt.pt_product_id
inner join tax as t on pt.pt_tax_id = t.tax_id
where p.product_id = _sp_product_id
group by p.product_id;

select net_price * _quantity into net
from product as p
where p.product_id = _sp_product_id;


INSERT INTO proyectomodular.sale_product
(sp_product_id, sp_sale_id, gross_price, tax_price, net_price, quantity)
VALUES
(_sp_product_id, _sp_sale_id, gross, tax, net, _quantity);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sale_productsins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sale_productsins`(
	_venta BIGINT, 
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
  
  call sale_productins(_venta,_product_id,_quantity);

-- reescriba la cadena original usando la función de cadena INSERT (),
-- Los argumentos son la cadena original, la posición de inicio, cuántos caracteres se eliminarán,
-- y qué "insertar" en su lugar (en este caso, nosotros "insertamos"
-- una cadena vacía, que elimina _nextlen + 1 caracteres)
  SET _list = INSERT(_list,1,_nextlen + 1,'');
END LOOP;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sale_productupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sale_productupd`(
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

-- -----------------------------------------------------
-- procedure saleall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `saleall`(
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

-- -----------------------------------------------------
-- procedure saledate
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `saledate`(
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

-- -----------------------------------------------------
-- procedure saleins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `saleins`(

  in _pod_id INT(11),
  in _user_id VARCHAR(45),
  in _client_id VARCHAR(45),
  in _cardpayment VARCHAR(12),
  in _authorization varchar(45),
  in _list_product MEDIUMTEXT
)
BEGIN
declare num bigint;

	call proyectomodular.salenum(_pod_id, @numfac);

	INSERT INTO proyectomodular.sale
	(invoice_num, date, pod_id, cardpayment, authorization, user_id, client_id)
	VALUES
	(@numfac,NOW(),_pod_id, _cardpayment, _authorization,_user_id, _client_id);
	SELECT LAST_INSERT_ID() INTO num;
	call proyectomodular.sale_productsins(num , _list_product);
SELECT num AS sale_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure salenum
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `salenum`(
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

-- -----------------------------------------------------
-- procedure saleone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `saleone`(
  _sp_sale_id BIGINT
)
BEGIN

	SELECT 	po.name as pod_name, po.nit, po.phone, po.address, po.code, s.invoice_num, s.sale_id, s.date, 
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

-- -----------------------------------------------------
-- procedure saleupdacco
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `saleupdacco`(
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

-- -----------------------------------------------------
-- procedure taxall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `taxall`()
BEGIN

SELECT  t.tax_id, t.name, t.percent
FROM proyectomodular.tax AS t;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure taxdel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `taxdel`(_tax_id INT)
BEGIN

DELETE FROM proyectomodular.tax
WHERE tax_id = _tax_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure taxins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `taxins`(
_name varchar(100), 
_percent decimal(10,2)
)
BEGIN
INSERT INTO proyectomodular.tax (name,percent) 
VALUES
(_name,_percent);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure taxone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `taxone`(_tax_id INT)
BEGIN
SELECT  t.tax_id, t.name, t.percent
FROM proyectomodular.tax AS t
WHERE tax_id = _tax_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure taxupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `taxupd`(
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

-- -----------------------------------------------------
-- procedure userall
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userall`()
BEGIN

SELECT  u.user_id, u.username, u.email, u.password, u.rol_id as rol_id, r.name as rol_name, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u
inner join rol as r on u.rol_id = r.rol_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure usercliins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `usercliins`(
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

-- -----------------------------------------------------
-- procedure userdel
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userdel`(_user_id INT)
BEGIN

DELETE FROM proyectomodular.user
WHERE user_id = _user_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure userins
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userins`(
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

-- -----------------------------------------------------
-- procedure userlogin
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userlogin`(
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

-- -----------------------------------------------------
-- procedure userone
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userone`(_user_id INT)
BEGIN
SELECT  u.user_id, u.username, u.email, u.password, u.rol_id as rol_id, r.name as rol_name, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u
inner join rol as r on u.rol_id = r.rol_id
WHERE user_id = _user_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure userpasres
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasres`(
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

-- -----------------------------------------------------
-- procedure userpasupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userpasupd`(
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

-- -----------------------------------------------------
-- procedure userupd
-- -----------------------------------------------------

DELIMITER $$
USE `proyectomodular`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `userupd`(

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

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
