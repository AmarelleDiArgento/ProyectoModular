-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2019 a las 03:04:51
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectomodular`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryall` ()  BEGIN

SELECT  c.category_id, c.name
FROM proyectomodular.category AS c;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `categorydel` (`_category_id` INT)  BEGIN

DELETE FROM proyectomodular.category
WHERE category_id = _category_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryins` (`_name` VARCHAR(100))  BEGIN
INSERT INTO proyectomodular.category (name) 
VALUES
(_name);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryone` (`_category_id` INT)  BEGIN
SELECT  c.category_id, c.name
FROM proyectomodular.category AS c
WHERE category_id = _category_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryupd` (`_category_id` INT, `_name` VARCHAR(100))  BEGIN

UPDATE proyectomodular.category
SET
name = _name
WHERE 
category_id = _category_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `moduleall` ()  BEGIN

SELECT  m.module_id, m.name, m.status
FROM proyectomodular.module AS m;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `moduledel` (`_module_id` INT)  BEGIN

DELETE FROM proyectomodular.module
WHERE module_id = _module_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `moduleins` (`_name` VARCHAR(100), `_status` TINYINT(4))  BEGIN
INSERT INTO proyectomodular.module (name,status) 
VALUES
(_name,_status);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `moduleone` (`_module_id` INT)  BEGIN
SELECT  m.module_id, m.name, m.status
FROM proyectomodular.module AS m
WHERE module_id = _module_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `moduleupd` (`_module_id` INT, `_name` VARCHAR(100), `_status` TINYINT(4))  BEGIN

UPDATE proyectomodular.module
SET
name = _name,
status = _status
WHERE 
module_id = _module_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegeall` ()  BEGIN

SELECT  p.privilege_id, p.name, p.module_id, p.icon, p.route, p.status
FROM proyectomodular.privilege AS p;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegedel` (`_privilege_id` INT)  BEGIN

DELETE FROM proyectomodular.privilege
WHERE privilege_id = _privilege_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegeins` (`_name` VARCHAR(100), `_module_id` INT(11), `_icon` VARCHAR(75), `_route` VARCHAR(75), `_status` TINYINT(4))  BEGIN
INSERT INTO proyectomodular.privilege (name, module_id, icon, route, status) 
VALUES
(_name, _module_id, _icon, _route, _status);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegeone` (`_privilege_id` INT)  BEGIN
SELECT  p.privilege_id, p.name, p.module_id, p.icon, p.route, p.status
FROM proyectomodular.privilege AS p
WHERE privilege_id = _privilege_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `privilegeupd` (`_privilege_id` INT(11), `_name` VARCHAR(100), `_module_id` INT(11), `_icon` VARCHAR(75), `_route` VARCHAR(75), `_status` TINYINT(4))  BEGIN

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `productall` ()  BEGIN

SELECT  p.product_id,p.code,p.name,p.net_price,p.category_id,p.tax_id,p.status
FROM proyectomodular.product AS p;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `productdel` (`_product_id` INT)  BEGIN

DELETE FROM proyectomodular.product
WHERE product_id = _product_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `productins` (`_code` VARCHAR(100), `_name` VARCHAR(255), `_net_price` VARCHAR(45), `_category_id` INT(11), `_tax_id` INT(11), `_status` TINYINT(4))  BEGIN
INSERT INTO proyectomodular.product (code,name,net_price,category_id,tax_id,status) 
VALUES
(_code,_name,_net_price,_category_id,_tax_id,_status);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `productone` (`_product_id` INT)  BEGIN
SELECT p.product_id,p.code,p.name,p.net_price,p.category_id,p.tax_id,p.status
FROM proyectomodular.product AS p
WHERE product_id = _product_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `productupd` (`_product_id` INT(11), `_code` VARCHAR(100), `_name` VARCHAR(255), `_net_price` VARCHAR(45), `_category_id` INT(11), `_tax_id` INT(11), `_status` TINYINT(4))  BEGIN

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `rolall` ()  BEGIN

SELECT  r.rol_id, r.name
FROM proyectomodular.rol AS r;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `roldel` (`_rol_id` INT)  BEGIN

DELETE FROM proyectomodular.rol
WHERE rol_id = _rol_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rolins` (`_name` VARCHAR(100))  BEGIN
INSERT INTO proyectomodular.rol (name) 
VALUES
(_name);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rolone` (`_rol_id` INT)  BEGIN
SELECT  r.rol_id, r.name
FROM proyectomodular.rol AS r
WHERE rol_id = _rol_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rolupd` (`_rol_id` INT, `_name` VARCHAR(100))  BEGIN

UPDATE proyectomodular.rol
SET
name = _name
WHERE 
rol_id = _rol_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rol_privilegeall` (`_rp_rol_id` INT(11))  BEGIN

SELECT  rp.rp_privilege_id, rp.rp_rol_id, rp.view, rp.create, rp.update, rp.delete
FROM proyectomodular.rol_privilege AS rp
WHERE rp.rp_rol_id = _rp_rol_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rol_privilegedel` (`_rp_privilege_id` INT(11), `_rp_rol_id` INT(11))  BEGIN

DELETE FROM proyectomodular.rol_privilege
WHERE rp_rol_id = _rp_rol_id AND rp_privilege_id= _rp_privilege_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `taxall` ()  BEGIN

SELECT  t.tax_id, t.name, t.percent
FROM proyectomodular.tax AS t;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `taxdel` (`_tax_id` INT)  BEGIN

DELETE FROM proyectomodular.tax
WHERE tax_id = _tax_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `taxins` (`_name` VARCHAR(100), `_percent` DECIMAL(10,2))  BEGIN
INSERT INTO proyectomodular.tax (name,percent) 
VALUES
(_name,_percent);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `taxone` (`_tax_id` INT)  BEGIN
SELECT  t.tax_id, t.name, t.percent
FROM proyectomodular.tax AS t
WHERE tax_id = _tax_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `taxupd` (`_tax_id` INT, `_name` VARCHAR(100), `_percent` DECIMAL(10,2))  BEGIN

UPDATE proyectomodular.tax
SET
name = _name,
percent = _percent
WHERE 
tax_id = _tax_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userall` ()  BEGIN

SELECT  u.user_id, u.username, u.email, u.password, u.rol_id, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userdel` (`_user_id` INT)  BEGIN

DELETE FROM proyectomodular.user
WHERE user_id = _user_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userins` (`_user_id` VARCHAR(45), `_username` VARCHAR(255), `_email` VARCHAR(255), `_password` VARCHAR(255), `_rol_id` INT, `_status` TINYINT)  BEGIN

INSERT INTO proyectomodular.user
(user_id,username, email, password, rol_id, status, create_time, update_time)
VALUES
(_user_id,_username, _email, _password, _rol_id, _status, now(),now());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userone` (`_user_id` INT)  BEGIN
SELECT  u.user_id, u.username, u.email, u.password, u.rol_id, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u
WHERE user_id = _user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userupd` (`_user_id` VARCHAR(45), `_username` VARCHAR(255), `_email` VARCHAR(255), `_password` VARCHAR(255), `_rol_id` INT, `_status` TINYINT)  BEGIN

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`category_id`, `name`) VALUES
(2, 'Bebidas'),
(1, 'Lacteos'),
(3, 'Preparados'),
(15, 'pruebas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `module`
--

CREATE TABLE `module` (
  `module_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `module`
--

INSERT INTO `module` (`module_id`, `name`, `status`) VALUES
(1, 'user', 1),
(2, 'rol', 1),
(3, 'category', 1),
(4, 'tax', 1),
(5, 'product', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pod`
--

CREATE TABLE `pod` (
  `pod_id` int(11) NOT NULL,
  `name` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `phone` varchar(12) COLLATE utf8_spanish_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Point of sale';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pod_user`
--

CREATE TABLE `pod_user` (
  `ps_user_id` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `ps_pod_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilege`
--

CREATE TABLE `privilege` (
  `privilege_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `module_module_id` int(11) NOT NULL,
  `icon` varchar(75) COLLATE utf8_spanish_ci NOT NULL,
  `route` varchar(75) COLLATE utf8_spanish_ci NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `privilege`
--

INSERT INTO `privilege` (`privilege_id`, `name`, `module_module_id`, `icon`, `route`, `status`) VALUES
(1, 'Usuarios', 1, 'listusers', 'listusers', 1),
(2, 'Roles', 2, 'listrols', 'listrols', 1),
(3, 'Categorias', 3, 'listcategory', 'listcategory', 1),
(4, 'Impuestos', 4, 'listtax', 'listtax', 1),
(5, 'Productos', 5, 'listproduct', 'listproduct', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `code` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `net_price` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `tax_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`product_id`, `code`, `name`, `net_price`, `category_id`, `tax_id`, `status`) VALUES
(6, 'TKAWS5S', 'pruebas', '2000', 2, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `rol_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`rol_id`, `name`) VALUES
(1, 'Administrador'),
(3, 'Almacenista'),
(2, 'Vendedor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_privilege`
--

CREATE TABLE `rol_privilege` (
  `rp_privilege_id` int(11) NOT NULL,
  `rp_rol_id` int(11) NOT NULL,
  `view` tinyint(4) NOT NULL,
  `create` tinyint(4) NOT NULL,
  `update` tinyint(4) NOT NULL,
  `delete` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `rol_privilege`
--

INSERT INTO `rol_privilege` (`rp_privilege_id`, `rp_rol_id`, `view`, `create`, `update`, `delete`) VALUES
(1, 1, 1, 1, 1, 1),
(2, 1, 1, 1, 1, 1),
(3, 1, 1, 1, 1, 1),
(4, 1, 1, 1, 1, 1),
(5, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale`
--

CREATE TABLE `sale` (
  `sale_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `pod_id` int(11) NOT NULL,
  `user_id` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `cliente_id` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_product`
--

CREATE TABLE `sale_product` (
  `sp_product_id` int(11) NOT NULL,
  `sp_sale_sale_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tax`
--

CREATE TABLE `tax` (
  `tax_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `percent` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tax`
--

INSERT INTO `tax` (`tax_id`, `name`, `percent`) VALUES
(1, 'prueba', '20.30'),
(2, 'pruebas impuesto', '30.20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `timestamps`
--

CREATE TABLE `timestamps` (
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `timestamps`
--

INSERT INTO `timestamps` (`create_time`, `update_time`) VALUES
('2019-05-11 20:37:11', '2019-05-11 20:37:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `user_id` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `rol_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `rol_id`, `status`, `create_time`, `update_time`) VALUES
('1020123', 'Prueba', 'prueba@prueba.com', 'é61ë62î63Þ64Û45Ú74ª134«45¬118­87®', 1, 1, '2019-05-11 20:38:24', '2019-05-11 20:38:24');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`module_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `pod`
--
ALTER TABLE `pod`
  ADD PRIMARY KEY (`pod_id`);

--
-- Indices de la tabla `pod_user`
--
ALTER TABLE `pod_user`
  ADD PRIMARY KEY (`ps_user_id`),
  ADD KEY `fk_user_has_pod_pod1` (`ps_pod_id`);

--
-- Indices de la tabla `privilege`
--
ALTER TABLE `privilege`
  ADD PRIMARY KEY (`privilege_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `icon` (`icon`),
  ADD UNIQUE KEY `route` (`route`),
  ADD KEY `fk_privilege_module1` (`module_module_id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `fk_product_category1` (`category_id`),
  ADD KEY `fk_product_tax1` (`tax_id`) USING BTREE;

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `rol_privilege`
--
ALTER TABLE `rol_privilege`
  ADD KEY `fk_privilege_has_rol_privilege1` (`rp_privilege_id`),
  ADD KEY `fk_privilege_has_rol_rol1` (`rp_rol_id`);

--
-- Indices de la tabla `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `fk_sale_pod1` (`pod_id`),
  ADD KEY `fk_sale_user1` (`user_id`),
  ADD KEY `fk_sale_user2` (`cliente_id`);

--
-- Indices de la tabla `sale_product`
--
ALTER TABLE `sale_product`
  ADD PRIMARY KEY (`sp_product_id`),
  ADD KEY `fk_product_has_sale_sale1` (`sp_sale_sale_id`);

--
-- Indices de la tabla `tax`
--
ALTER TABLE `tax`
  ADD PRIMARY KEY (`tax_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_user_rol` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `module`
--
ALTER TABLE `module`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pod`
--
ALTER TABLE `pod`
  MODIFY `pod_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `privilege`
--
ALTER TABLE `privilege`
  MODIFY `privilege_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sale`
--
ALTER TABLE `sale`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sale_product`
--
ALTER TABLE `sale_product`
  MODIFY `sp_product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tax`
--
ALTER TABLE `tax`
  MODIFY `tax_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pod_user`
--
ALTER TABLE `pod_user`
  ADD CONSTRAINT `fk_user_has_pod_pod1` FOREIGN KEY (`ps_pod_id`) REFERENCES `pod` (`pod_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_pod_user1` FOREIGN KEY (`ps_user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `privilege`
--
ALTER TABLE `privilege`
  ADD CONSTRAINT `fk_privilege_module1` FOREIGN KEY (`module_module_id`) REFERENCES `module` (`module_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_product_tax1` FOREIGN KEY (`tax_id`) REFERENCES `tax` (`tax_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `rol_privilege`
--
ALTER TABLE `rol_privilege`
  ADD CONSTRAINT `fk_privilege_has_rol_privilege1` FOREIGN KEY (`rp_privilege_id`) REFERENCES `privilege` (`privilege_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_privilege_has_rol_rol1` FOREIGN KEY (`rp_rol_id`) REFERENCES `rol` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `fk_sale_pod1` FOREIGN KEY (`pod_id`) REFERENCES `pod` (`pod_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sale_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sale_user2` FOREIGN KEY (`cliente_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sale_product`
--
ALTER TABLE `sale_product`
  ADD CONSTRAINT `fk_product_has_sale_product1` FOREIGN KEY (`sp_product_id`) REFERENCES `product` (`product_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_product_has_sale_sale1` FOREIGN KEY (`sp_sale_sale_id`) REFERENCES `sale` (`sale_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
