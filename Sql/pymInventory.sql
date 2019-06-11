-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pym-inventario
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pym-inventario
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pym-inventario` ;
USE `pym-inventario` ;

-- -----------------------------------------------------
-- Table `pym-inventario`.`measuretype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`measuretype` (
  `measuretype_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`measuretype_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`measure`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`measure` (
  `measure_id` INT NOT NULL,
  `measuretype_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `symbol` VARCHAR(45) NULL,
  `value` VARCHAR(45) NULL,
  PRIMARY KEY (`measure_id`, `measuretype_id`),
  INDEX `fk_measure_measuretype1_idx` (`measuretype_id` ASC) VISIBLE,
  CONSTRAINT `fk_measure_measuretype1`
    FOREIGN KEY (`measuretype_id`)
    REFERENCES `pym-inventario`.`measuretype` (`measuretype_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`itemtype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`itemtype` (
  `itemtype_id` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  PRIMARY KEY (`itemtype_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`Item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`Item` (
  `item_id` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  `measure_measure_id` INT NOT NULL,
  `itemtype_itemtype_id` INT NOT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `fk_Item_measure_idx` (`measure_measure_id` ASC) VISIBLE,
  INDEX `fk_Item_itemtype1_idx` (`itemtype_itemtype_id` ASC) VISIBLE,
  CONSTRAINT `fk_Item_measure`
    FOREIGN KEY (`measure_measure_id`)
    REFERENCES `pym-inventario`.`measure` (`measure_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_itemtype1`
    FOREIGN KEY (`itemtype_itemtype_id`)
    REFERENCES `pym-inventario`.`itemtype` (`itemtype_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`pod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`pod` (
  `pod_id` INT NOT NULL,
  PRIMARY KEY (`pod_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`store` (
  `store_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `pod_pod_id` INT NOT NULL,
  PRIMARY KEY (`store_id`),
  INDEX `fk_store_pod1_idx` (`pod_pod_id` ASC) VISIBLE,
  CONSTRAINT `fk_store_pod1`
    FOREIGN KEY (`pod_pod_id`)
    REFERENCES `pym-inventario`.`pod` (`pod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`location` (
  `location_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `store_store_id` INT NOT NULL,
  PRIMARY KEY (`location_id`),
  INDEX `fk_location_store1_idx` (`store_store_id` ASC) VISIBLE,
  CONSTRAINT `fk_location_store1`
    FOREIGN KEY (`store_store_id`)
    REFERENCES `pym-inventario`.`store` (`store_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`concept`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`concept` (
  `concept_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`concept_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`typemovement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`typemovement` (
  `typemovement_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`typemovement_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`movement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`movement` (
  `movement_id` INT NOT NULL,
  `location_begin` INT NULL,
  `location_end` INT NOT NULL,
  `typemovement_id` INT NOT NULL,
  `concept_id` INT NOT NULL,
  `date` VARCHAR(45) NULL,
  PRIMARY KEY (`movement_id`),
  INDEX `fk_movement_location1_idx` (`location_end` ASC) VISIBLE,
  INDEX `fk_movement_concept1_idx` (`concept_id` ASC) VISIBLE,
  INDEX `fk_movement_location2_idx` (`location_begin` ASC) VISIBLE,
  INDEX `fk_movement_typemovement1_idx` (`typemovement_id` ASC) VISIBLE,
  CONSTRAINT `fk_movement_location1`
    FOREIGN KEY (`location_end`)
    REFERENCES `pym-inventario`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movement_concept1`
    FOREIGN KEY (`concept_id`)
    REFERENCES `pym-inventario`.`concept` (`concept_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movement_location2`
    FOREIGN KEY (`location_begin`)
    REFERENCES `pym-inventario`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movement_typemovement1`
    FOREIGN KEY (`typemovement_id`)
    REFERENCES `pym-inventario`.`typemovement` (`typemovement_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`lot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`lot` (
  `lot_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `expiration` DATE NULL,
  `quantity` INT NULL,
  PRIMARY KEY (`lot_id`),
  INDEX `fk_particular_Item1_idx` (`item_id` ASC) VISIBLE,
  CONSTRAINT `fk_particular_Item1`
    FOREIGN KEY (`item_id`)
    REFERENCES `pym-inventario`.`Item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`movement_lot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`movement_lot` (
  `movement_id` INT NOT NULL,
  `lot_id` INT NOT NULL,
  PRIMARY KEY (`movement_id`, `lot_id`),
  INDEX `fk_movement_has_particular_particular1_idx` (`lot_id` ASC) VISIBLE,
  INDEX `fk_movement_has_particular_movement1_idx` (`movement_id` ASC) VISIBLE,
  CONSTRAINT `fk_movement_has_particular_movement1`
    FOREIGN KEY (`movement_id`)
    REFERENCES `pym-inventario`.`movement` (`movement_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movement_has_particular_particular1`
    FOREIGN KEY (`lot_id`)
    REFERENCES `pym-inventario`.`lot` (`lot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pym-inventario`.`lot_location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pym-inventario`.`lot_location` (
  `lot_id` INT NOT NULL,
  `location_id` INT NOT NULL,
  `quantity` REAL NULL,
  PRIMARY KEY (`lot_id`, `location_id`),
  INDEX `fk_lot_has_location_location1_idx` (`location_id` ASC) VISIBLE,
  INDEX `fk_lot_has_location_lot1_idx` (`lot_id` ASC) VISIBLE,
  CONSTRAINT `fk_lot_has_location_lot1`
    FOREIGN KEY (`lot_id`)
    REFERENCES `pym-inventario`.`lot` (`lot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lot_has_location_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `pym-inventario`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
