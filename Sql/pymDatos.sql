USE proyectomodular;

-- ------------------------------------------------------------
-- ROLL INSERT
-- ------------------------------------------------------------
 call proyectomodular.rolins('Administrador');
 call proyectomodular.rolins('Vendedor');
 call proyectomodular.rolins('Almacenista');

-- call proyectomodular.rolins(?);
-- call proyectomodular.rolupd(?, ?);
-- call proyectomodular.rolone(?);
-- call proyectomodular.roldel(?);
-- call proyectomodular.rolall();

-- ------------------------------------------------------------
-- CATEGORY INSERT
-- ------------------------------------------------------------
call proyectomodular.categoryins('Lacteos');
call proyectomodular.categoryins('Bebidas');
call proyectomodular.categoryins('Preparados');

-- call proyectomodular.categoryins(?)
-- call proyectomodular.categoryall();
-- call proyectomodular.categoryone(?);
-- call proyectomodular.categorydel(?);
-- call proyectomodular.categoryupd(?,?);

-- ------------------------------------------------------------
-- USER INSERT
-- ------------------------------------------------------------
call proyectomodular.userins('1020123', 'Prueba', 'prueba@prueba.com', "é61ë62î63Þ64Û45Ú74ª134«45¬118­87®", 1, 1);

-- call proyectomodular.userins(?, ?, ?, ?, ?, ?);
-- call proyectomodular.userupd(?, ?, ?, ?, ?, ?);
-- call proyectomodular.userone(?);
-- call proyectomodular.userdel(?);
-- call proyectomodular.userall();

-- ------------------------------------------------------------
-- ROLL INSERT
-- ------------------------------------------------------------
 call proyectomodular.rolins('Consumo', 8.00);
 call proyectomodular.rolins('IVA', 16.00 );
 call proyectomodular.rolins('Lujo', 5.00);

-- call proyectomodular.taxins(?,?);
-- call proyectomodular.taxupd(?, ?, ?);
-- call proyectomodular.taxone(?);
-- call proyectomodular.taxdel(?);
-- call proyectomodular.taxall();

-- ------------------------------------------------------------
-- PRODUCT INSERT
-- ------------------------------------------------------------
call proyectomodular.productins('1010101010', 'Papas', '1200', 1, 1, 1);
call proyectomodular.productins('111111111', 'Arroz', '2000', 1, 2, 1);
call proyectomodular.productins('000000000', 'Queso', '1400', 1, 3, 1);
-- call proyectomodular.productins(?, ?, ?, ?, ?, ?);
-- call proyectomodular.productupd(?, ?, ?, ?, ?, ?, ?);
-- call proyectomodular.productall();
-- call proyectomodular.productone(?);
-- call proyectomodular.productdel(?);
