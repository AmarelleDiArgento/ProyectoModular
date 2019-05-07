-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proyectoModular
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proyectoModular
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS proyectoModular ;
USE proyectoModular ;

-- -----------------------------------------------------
-- Table proyectoModular.timestamps
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.timestamps (
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP NULL);


-- -----------------------------------------------------
-- Table proyectoModular.category
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.category (
  category_id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(255) NOT NULL);


-- -----------------------------------------------------
-- Table proyectoModular.rol
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.rol (
  rol_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
  name VARCHAR(45) NOT NULL);



-- -----------------------------------------------------
-- Table proyectoModular.user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.user (
  user_id VARCHAR(45) PRIMARY KEY NOT NULL,
  username VARCHAR(16) NULL UNIQUE,
  email VARCHAR(255) NULL UNIQUE,
  password VARCHAR(32) NOT NULL,
  rol_id INT NOT NULL,
  status VARCHAR(45) NULL,
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  update_time VARCHAR(45) NULL,
  CONSTRAINT fk_user_rol
    FOREIGN KEY (rol_id)
    REFERENCES proyectoModular.rol (rol_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectoModular.tax
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.tax (
  tax_id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(45) unique NOT NULL,
  percent DECIMAL NOT NULL);


-- -----------------------------------------------------
-- Table proyectoModular.product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.product (
  product_id INT PRIMARY KEY NOT NULL auto_increment,
  code VARCHAR(45) unique NOT NULL,
  name VARCHAR(255) NOT NULL,
  net_price VARCHAR(45) NOT NULL,
  category_id INT NOT NULL,
  tax_tax_id INT NOT NULL,
  CONSTRAINT fk_product_category1
    FOREIGN KEY (category_id)
    REFERENCES proyectoModular.category (category_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_tax1
    FOREIGN KEY (tax_tax_id)
    REFERENCES proyectoModular.tax (tax_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectoModular.pod
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.pod (
  pod_id INT PRIMARY KEY NOT NULL auto_increment,
  name  VARCHAR(45) NOT NULL,
  address VARCHAR(45) NULL,
  phone VARCHAR(10) NULL,
  status VARCHAR(45) NULL)
COMMENT = 'Point of sale';


-- -----------------------------------------------------
-- Table proyectoModular.pod_user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.pod_user (
  ps_user_id VARCHAR(45) NOT NULL,
  ps_pod_id INT NOT NULL,
  PRIMARY KEY (ps_user_id, ps_pod_id),
  CONSTRAINT fk_user_has_pod_user1
    FOREIGN KEY (ps_user_id)
    REFERENCES proyectoModular.user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_user_has_pod_pod1
    FOREIGN KEY (ps_pod_id)
    REFERENCES proyectoModular.pod (pod_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectoModular.sale
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.sale (
  sale_id INT PRIMARY KEY NOT NULL auto_increment,
  date DATETIME NULL,
  pod_id INT NOT NULL,
  user_id VARCHAR(45) NOT NULL,
  CONSTRAINT fk_sale_user1
    FOREIGN KEY (user_id)
    REFERENCES proyectoModular.user (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sale_pod1
    FOREIGN KEY (pod_id)
    REFERENCES proyectoModular.pod (pod_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectoModular.sale_product
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.sale_product (
  sp_product_id INT PRIMARY KEY NOT NULL auto_increment,
  sp_sale_sale_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_product_has_sale_product1
    FOREIGN KEY (sp_product_id)
    REFERENCES proyectoModular.product (product_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_has_sale_sale1
    FOREIGN KEY (sp_sale_sale_id)
    REFERENCES proyectoModular.sale (sale_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table proyectoModular.module
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.module (
  module_id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(45) NULL);


-- -----------------------------------------------------
-- Table proyectoModular.privilege
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proyectoModular.privilege (
  privilege_id INT PRIMARY KEY NOT NULL auto_increment,
  name VARCHAR(45) NULL,
  module_module_id INT NOT NULL,
  CONSTRAINT fk_privilege_module1
    FOREIGN KEY (module_module_id)
    REFERENCES proyectoModular.module (module_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
