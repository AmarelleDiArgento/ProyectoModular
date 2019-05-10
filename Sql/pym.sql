-- MySQL Workbench Forward Engineering
CREATE USER IF NOT EXISTS 'proyectomodular'@'localhost' IDENTIFIED BY 'da12cb09fe566f2d6e131d7fb5c5c732';
GRANT ALL PRIVILEGES ON * . * TO 'proyectomodular'@'localhost';FLUSH PRIVILEGES;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proyectomodular
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proyectomodular
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS proyectomodular ;
USE proyectomodular ;

-- -----------------------------------------------------
-- Table proyectomodular.timestamps
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.timestamps (
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP NULL);


-- -----------------------------------------------------
-- Table proyectomodular.category
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.category (
  category_id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(255) NOT NULL);


-- -----------------------------------------------------
-- Table proyectomodular.rol
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.rol (
  rol_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
  name VARCHAR(45) NOT NULL);



-- -----------------------------------------------------
-- Table proyectomodular.user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.user (
  user_id VARCHAR(45) PRIMARY KEY NOT NULL,
  username VARCHAR(16) NULL UNIQUE,
  email VARCHAR(255) NULL UNIQUE,
  password VARCHAR(32) NOT NULL,
  rol_id INT NOT NULL,
  status tinyint NULL,
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  update_time VARCHAR(45) NULL,
  CONSTRAINT fk_user_rol
    FOREIGN KEY (rol_id)
    REFERENCES proyectomodular.rol (rol_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectomodular.tax
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.tax (
  tax_id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(45) unique NOT NULL,
  percent DECIMAL NOT NULL);


-- -----------------------------------------------------
-- Table proyectomodular.product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.product (
  product_id INT PRIMARY KEY NOT NULL auto_increment,
  code VARCHAR(45) unique NOT NULL,
  name VARCHAR(255) NOT NULL,
  net_price VARCHAR(45) NOT NULL,
  category_id INT NOT NULL,
  tax_tax_id INT NOT NULL,
  CONSTRAINT fk_product_category1
    FOREIGN KEY (category_id)
    REFERENCES proyectomodular.category (category_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_tax1
    FOREIGN KEY (tax_tax_id)
    REFERENCES proyectomodular.tax (tax_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectomodular.pod
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.pod (
  pod_id INT PRIMARY KEY NOT NULL auto_increment,
  name  VARCHAR(45) NOT NULL,
  address VARCHAR(45) NULL,
  phone VARCHAR(10) NULL,
  status VARCHAR(45) NULL)
COMMENT = 'Point of sale';


-- -----------------------------------------------------
-- Table proyectomodular.pod_user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.pod_user (
  ps_user_id VARCHAR(45) NOT NULL,
  ps_pod_id INT NOT NULL,
  PRIMARY KEY (ps_user_id, ps_pod_id),
  CONSTRAINT fk_user_has_pod_user1
    FOREIGN KEY (ps_user_id)
    REFERENCES proyectomodular.user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_user_has_pod_pod1
    FOREIGN KEY (ps_pod_id)
    REFERENCES proyectomodular.pod (pod_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectomodular.sale
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.sale (
  sale_id INT PRIMARY KEY NOT NULL auto_increment,
  date DATETIME NULL,
  pod_id INT NOT NULL,
  user_id VARCHAR(45) NOT NULL,
  CONSTRAINT fk_sale_user1
    FOREIGN KEY (user_id)
    REFERENCES proyectomodular.user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sale_pod1
    FOREIGN KEY (pod_id)
    REFERENCES proyectomodular.pod (pod_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectomodular.sale_product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.sale_product (
  sp_product_id INT PRIMARY KEY NOT NULL auto_increment,
  sp_sale_sale_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_product_has_sale_product1
    FOREIGN KEY (sp_product_id)
    REFERENCES proyectomodular.product (product_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_has_sale_sale1
    FOREIGN KEY (sp_sale_sale_id)
    REFERENCES proyectomodular.sale (sale_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectomodular.module
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.module (
  module_id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(45) NULL);


-- -----------------------------------------------------
-- Table proyectomodular.privilege
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectomodular.privilege (
  privilege_id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(45) NULL,
  module_module_id INT NOT NULL,
  CONSTRAINT fk_privilege_module1
    FOREIGN KEY (module_module_id)
    REFERENCES proyectomodular.module (module_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
