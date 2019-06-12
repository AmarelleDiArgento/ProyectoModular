//libs
var mysql = require('mysql'),
    config = require("../config");

//init pool mysql
var connection = mysql.createConnection(config.db);

// connect to the MySQL server
connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    //vars
    var view = "`view`";
    var create = "`create`";
    var update = "`update`";
    var deletes = "`delete`";

    let createTodos = `CREATE TABLE IF NOT EXISTS proyectomodular.category (
        category_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) UNIQUE NOT NULL);

        CREATE TABLE IF NOT EXISTS proyectomodular.module (
            module_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) UNIQUE NOT NULL,
            status TINYINT(4) NOT NULL);
        
        CREATE TABLE IF NOT EXISTS proyectomodular.pod (
            pod_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            code varchar(5) NOT NULL UNIQUE,
            nit varchar(15) NOT NULL UNIQUE,
            rdian VARCHAR(45) NOT NULL UNIQUE,
            daterdian date NOT NULL,
            billing_limit BIGINT NOT NULL,
            name VARCHAR(50) NOT NULL UNIQUE,
            address VARCHAR(50) NULL DEFAULT NULL,
            phone VARCHAR(12) NULL DEFAULT NULL,
            status TINYINT(4) NOT NULL,
            create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
            update_time TIMESTAMP NULL DEFAULT NULL)
            COMMENT = 'Point of sale';
         
        CREATE TABLE IF NOT EXISTS proyectomodular.rol (
            rol_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) UNIQUE NOT NULL);
        
        CREATE TABLE IF NOT EXISTS proyectomodular.user (
            user_id VARCHAR(45) PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50),
            rol_id INT(11) NOT NULL,
            status TINYINT(4) NOT NULL DEFAULT 1,
            create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
            update_time TIMESTAMP NULL DEFAULT NULL,
            CONSTRAINT fk_user_rol FOREIGN KEY (rol_id) REFERENCES proyectomodular.rol (rol_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION);
        
        CREATE TABLE IF NOT EXISTS proyectomodular.pod_user (
            ps_user_id VARCHAR(45) NOT NULL,
            ps_pod_id INT(11) NOT NULL,
            CONSTRAINT fk_user_has_pod_pod1 FOREIGN KEY (ps_pod_id) REFERENCES proyectomodular.pod (pod_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
            CONSTRAINT fk_user_has_pod_user1 FOREIGN KEY (ps_user_id) REFERENCES proyectomodular.user (user_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);
        
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

        CREATE TABLE IF NOT EXISTS proyectomodular.tax (
            tax_id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) UNIQUE NOT NULL,
            percent DECIMAL(10,2) NOT NULL);
        
        CREATE TABLE IF NOT EXISTS proyectomodular.product (
            product_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            code VARCHAR(45) UNIQUE NOT NULL,
            name VARCHAR(50) UNIQUE NOT NULL,
            net_price real,
            category_id INT(11) NOT NULL,
            image VARCHAR(250) NULL,
            status TINYINT(4) NOT NULL,
            CONSTRAINT fk_product_category1 FOREIGN KEY (category_id) REFERENCES proyectomodular.category (category_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

        CREATE TABLE IF NOT EXISTS proyectomodular.rol_privilege (
            rp_privilege_id INT(11) NOT NULL,
            rp_rol_id INT(11) NOT NULL,
            `+view+` TINYINT(4) NOT NULL,
            `+create+` TINYINT(4) NOT NULL,
            `+update+` TINYINT(4) NOT NULL,
            `+deletes+` TINYINT(4) NOT NULL,
            CONSTRAINT fk_privilege_has_rol_privilege1 FOREIGN KEY (rp_privilege_id) REFERENCES proyectomodular.privilege (privilege_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
            CONSTRAINT fk_privilege_has_rol_rol1 FOREIGN KEY (rp_rol_id) REFERENCES proyectomodular.rol (rol_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);
        
        CREATE TABLE IF NOT EXISTS proyectomodular.sale (
            sale_id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            invoice_num BIGINT(20) NOT NULL,
            date DATETIME NULL DEFAULT NULL,
            pod_id INT(11) NOT NULL,
            cardpayment BOOLEAN DEFAULT FALSE,
            authorization VARCHAR(45),
            user_id VARCHAR(45) NOT NULL,
            client_id VARCHAR(45) NULL DEFAULT NULL,
            accountant BOOLEAN DEFAULT TRUE,
            CONSTRAINT fk_sale_pod1 FOREIGN KEY (pod_id)
                REFERENCES proyectomodular.pod (pod_id)
                ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT fk_sale_user1 FOREIGN KEY (user_id)
                REFERENCES proyectomodular.user (user_id)
                ON DELETE NO ACTION ON UPDATE NO ACTION,
            CONSTRAINT fk_sale_user2 FOREIGN KEY (client_id)
                REFERENCES proyectomodular.user (user_id)
                ON DELETE NO ACTION ON UPDATE NO ACTION
        );
            
        CREATE TABLE IF NOT EXISTS proyectomodular.sale_product (
            sp_product_id BIGINT NOT NULL,
            sp_sale_id BIGINT NOT NULL,
            gross_price real,
            tax_price real,
            net_price real,
            quantity INT(11) NOT NULL DEFAULT 1,
            CONSTRAINT fk_product_has_sale_product1 FOREIGN KEY (sp_product_id) REFERENCES proyectomodular.product (product_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT fk_product_has_sale1 FOREIGN KEY (sp_sale_id) REFERENCES proyectomodular.sale (sale_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION);

        CREATE TABLE IF NOT EXISTS proyectomodular.product_tax (
            pt_product_id BIGINT NOT NULL,
            pt_tax_id INT(11) NOT NULL,
            CONSTRAINT fk_product_has_tax_product1 FOREIGN KEY (pt_product_id) REFERENCES proyectomodular.product (product_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
            CONSTRAINT fk_product_has_tax_tax1 FOREIGN KEY (pt_tax_id) REFERENCES proyectomodular.tax (tax_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION);

        CREATE TABLE IF NOT EXISTS proyectomodular.timestamps (
            create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
            update_time TIMESTAMP NULL DEFAULT NULL); `;

    connection.query(createTodos, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

    connection.end(function (err) {
        if (err) {
            return console.log(err.message);
        }
    });
});


