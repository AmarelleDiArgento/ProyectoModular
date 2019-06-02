-- usuario generico de la bd
CREATE USER IF NOT EXISTS 'proyectomodular'@'localhost' IDENTIFIED BY 'da12cb09fe566f2d6e131d7fb5c5c732';
GRANT ALL PRIVILEGES ON * . * TO 'proyectomodular'@'localhost';FLUSH PRIVILEGES;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proyectomodular
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS proyectomodular DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE proyectomodular ;

-- -----------------------------------------------------
-- Table proyectomodular.category
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.category (
  category_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL);
  
-- -----------------------------------------------------
-- Table proyectomodular.module
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.module (
  module_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  status TINYINT(4) NOT NULL);
  
-- -----------------------------------------------------
-- Table proyectomodular.pod
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.pod (
  pod_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nit varchar(15),
  code varchar(5),
  name VARCHAR(255) UNIQUE NULL UNIQUE,
  address VARCHAR(255) NULL DEFAULT NULL,
  phone VARCHAR(12) NULL DEFAULT NULL,
  billing_limit BIGINT,
  status TINYINT(4) NOT NULL,
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  update_time TIMESTAMP NULL DEFAULT NULL)
COMMENT = 'Point of sale';

-- -----------------------------------------------------
-- Table proyectomodular.rol
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.rol (
  rol_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL);

-- -----------------------------------------------------
-- Table proyectomodular.user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.user (
  user_id VARCHAR(45) PRIMARY KEY NOT NULL,
  username VARCHAR(255) NULL DEFAULT NULL,
  email VARCHAR(255) UNIQUE NULL DEFAULT NULL,
  password VARCHAR(255),
  rol_id INT(11) NOT NULL,
  status TINYINT(4) NOT NULL,
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  update_time TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_user_rol FOREIGN KEY (rol_id) REFERENCES proyectomodular.rol (rol_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table proyectomodular.pod_user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.pod_user (
  ps_user_id VARCHAR(45) NOT NULL,
  ps_pod_id INT(11) NOT NULL,
  CONSTRAINT fk_user_has_pod_pod1 FOREIGN KEY (ps_pod_id) REFERENCES proyectomodular.pod (pod_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_user_has_pod_user1 FOREIGN KEY (ps_user_id) REFERENCES proyectomodular.user (user_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table proyectomodular.privilege
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.privilege (
  privilege_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  module_id INT(11) NOT NULL,
  icon VARCHAR(75) UNIQUE NOT NULL,
  route VARCHAR(75) UNIQUE NOT NULL,
  status TINYINT(4) NOT NULL,
  CONSTRAINT fk_privilege_module1 FOREIGN KEY (module_id) REFERENCES proyectomodular.module (module_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table proyectomodular.tax
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.tax (
  tax_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  percent DECIMAL(10,2) NOT NULL);


-- -----------------------------------------------------
-- Table proyectomodular.product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.product (
  product_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  code VARCHAR(45) UNIQUE NOT NULL,
  name VARCHAR(255) UNIQUE NOT NULL,
  net_price VARCHAR(45) NOT NULL,
  category_id INT(11) NOT NULL,
  image VARCHAR(250) NULL,
  status TINYINT(4) NOT NULL,
  CONSTRAINT fk_product_category1 FOREIGN KEY (category_id) REFERENCES proyectomodular.category (category_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
    
-- -----------------------------------------------------
-- Table proyectomodular.rol_privilege
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.rol_privilege (
  rp_privilege_id INT(11) NOT NULL,
  rp_rol_id INT(11) NOT NULL,
  `view` TINYINT(4) NOT NULL,
  `create` TINYINT(4) NOT NULL,
  `update` TINYINT(4) NOT NULL,
  `delete` TINYINT(4) NOT NULL,
  CONSTRAINT fk_privilege_has_rol_privilege1 FOREIGN KEY (rp_privilege_id) REFERENCES proyectomodular.privilege (privilege_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_privilege_has_rol_rol1 FOREIGN KEY (rp_rol_id) REFERENCES proyectomodular.rol (rol_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table proyectomodular.sale
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.sale (
  sale_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  date DATETIME NULL DEFAULT NULL,
  pod_id INT(11) NOT NULL,
  cardpayment boolean default false,
  authorization VARCHAR(45),
  user_id VARCHAR(45) NOT NULL,
  client_id VARCHAR(45) NULL DEFAULT NULL,
  accountant boolean default true,
  CONSTRAINT fk_sale_pod1 FOREIGN KEY (pod_id) REFERENCES proyectomodular.pod (pod_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sale_user1 FOREIGN KEY (user_id) REFERENCES proyectomodular.user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sale_user2 FOREIGN KEY (client_id) REFERENCES proyectomodular.user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table proyectomodular.sale_product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.sale_product (
  sp_product_id BIGINT NOT NULL,
  sp_sale_sale_id BIGINT NOT NULL,
  gross_price real,
  net_price real,
  quantity INT(11) NOT NULL DEFAULT 1,
  CONSTRAINT fk_product_has_sale_product1 FOREIGN KEY (sp_product_id) REFERENCES proyectomodular.product (product_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_has_sale_sale1 FOREIGN KEY (sp_sale_sale_id) REFERENCES proyectomodular.sale (sale_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table proyectomodular.product_tax
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.product_tax (
  pt_product_id BIGINT NOT NULL,
  pt_tax_id INT(11) NOT NULL,
  CONSTRAINT fk_product_has_tax_product1 FOREIGN KEY (pt_product_id) REFERENCES proyectomodular.product (product_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_has_tax_tax1 FOREIGN KEY (pt_tax_id) REFERENCES proyectomodular.tax (tax_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectomodular.timestamps
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.timestamps (
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  update_time TIMESTAMP NULL DEFAULT NULL);



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

