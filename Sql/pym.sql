-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2019 a las 02:48:01
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryins` (`_name` VARCHAR(45))  BEGIN
INSERT INTO proyectomodular.category (name) 
VALUES
(_name);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryone` (`_category_id` INT)  BEGIN
SELECT  c.category_id, c.name
FROM proyectomodular.category AS c
WHERE category_id = _category_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `categoryupd` (`_category_id` INT, `_name` VARCHAR(45))  BEGIN

UPDATE proyectomodular.category
SET
name = _name
WHERE 
category_id = _category_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rolall` ()  BEGIN

SELECT  r.rol_id, r.name
FROM proyectomodular.rol AS r;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `roldel` (`_rol_id` INT)  BEGIN

DELETE FROM proyectomodular.rol
WHERE rol_id = _rol_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rolins` (`_name` VARCHAR(45))  BEGIN
INSERT INTO proyectomodular.rol (name) 
VALUES
(_name);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rolone` (`_rol_id` INT)  BEGIN
SELECT  r.rol_id, r.name
FROM proyectomodular.rol AS r
WHERE rol_id = _rol_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `rolupd` (`_rol_id` INT, `_name` VARCHAR(45))  BEGIN

UPDATE proyectomodular.rol
SET
name = _name
WHERE 
rol_id = _rol_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userall` ()  BEGIN

SELECT  u.user_id, u.username, u.email, u.password, u.rol_id, u.status, u.create_time, u.update_time
FROM proyectomodular.user AS u;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userdel` (`_user_id` INT)  BEGIN

DELETE FROM proyectomodular.user
WHERE user_id = _user_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `userins` (`_user_id` VARCHAR(45), `_username` VARCHAR(16), `_email` VARCHAR(255), `_password` VARCHAR(255), `_rol_id` INT, `_status` TINYINT)  BEGIN

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
(3, 'Preparados');

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
(2, 'rol', 1);

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
(2, 'Roles', 1, 'listrols', 'listrols', 1);

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
  `tax_tax_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
(2, 1, 1, 1, 1, 1);

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
  ADD KEY `fk_product_tax1` (`tax_tax_id`);

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `module`
--
ALTER TABLE `module`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pod`
--
ALTER TABLE `pod`
  MODIFY `pod_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `privilege`
--
ALTER TABLE `privilege`
  MODIFY `privilege_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `tax_id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `fk_product_tax1` FOREIGN KEY (`tax_tax_id`) REFERENCES `tax` (`tax_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
