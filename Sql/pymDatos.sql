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
 call proyectomodular.taxins('Consumo', 8.00);
 call proyectomodular.taxins('IVA', 16.00 );
 call proyectomodular.taxins('Lujo', 5.00);

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

-- ------------------------------------------------------------
-- MODULE INSERT
-- ------------------------------------------------------------

call proyectomodular.moduleins('User', 1);
call proyectomodular.moduleins('Sale', 1);
call proyectomodular.moduleins('Product', 1);
-- call proyectomodular.moduleins(?, ?);
-- call proyectomodular.moduleupd(?,?,?);
-- call proyectomodular.moduleall();
-- call proyectomodular.moduledel(?);
-- call proyectomodular.moduleone(?);

-- ------------------------------------------------------------
-- PRIVILEGE INSERT
-- ------------------------------------------------------------

call proyectomodular.privilegeins('User', 1, 'ico', 'listusers', 1);
call proyectomodular.privilegeins('Rol', 1, 'ico1', 'listrols', 1);
call proyectomodular.privilegeins('Privilege', 1, 'ico2', 'listprivileges', 1);
call proyectomodular.privilegeins('Module', 1, 'ico3', 'listmodules', 1);
call proyectomodular.privilegeins('Pod', 2, 'ico4', 'listpods', 1);
call proyectomodular.privilegeins('Sale', 2, 'ico5', 'listsales', 1);
call proyectomodular.privilegeins('Product', 3, 'ico6', 'listproducts', 1);
call proyectomodular.privilegeins('Tax', 3, 'ico7', 'listtaxs', 1);
call proyectomodular.privilegeins('Category', 3, 'ico8', 'listcategorys', 1);

-- call proyectomodular.privilegeins(?,?,?,?,?);
-- call proyectomodular.privilegeupd(?,?,?,?,?,?);
-- call proyectomodular.privilegeall();
-- call proyectomodular.privilegedel(?);
-- call proyectomodular.privilegeone(?);

-- ------------------------------------------------------------
-- ROL_PRIVILEGE INSERT
-- ------------------------------------------------------------

call proyectomodular.rol_privilegeins(1, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(2, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(3, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(4, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(5, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(6, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(7, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(8, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(9, 1, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(1, 2, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(2, 2, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(3, 2, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(4, 2, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(5, 2, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(6, 2, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(7, 2, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(8, 2, 1, 1, 1, 1);
call proyectomodular.rol_privilegeins(9, 2, 1, 1, 1, 1);

-- call proyectomodular.rol_privilegeins(?, ?, ?, ?, ?, ?);
-- call proyectomodular.rol_privilegeupd(?, ?, ?, ?, ?, ?);
-- call proyectomodular.rol_privilegeall(?);
-- call proyectomodular.rol_privilegedel(?, ?);
-- call proyectomodular.rol_privilegeone(?, ?);

-- ------------------------------------------------------------
-- POD INSERT
-- ------------------------------------------------------------

call proyectomodular.podins('Americas 68', 'Av Americas No 68 36 lc 101', '4441234', 1);
-- call proyectomodular.podins(?, ?, ?, ?);
-- call proyectomodular.podupd(?, ?, ?, ? , ?);
-- call proyectomodular.podone(?);
-- call proyectomodular.podall();
-- call proyectomodular.poddel(?);

-- ------------------------------------------------------------
-- POD_USER INSERT
-- ------------------------------------------------------------

call proyectomodular.pod_userins('1020123',1);
-- call proyectomodular.pod_userins(?,?);
-- call proyectomodular.pod_userins(?,?);
-- call proyectomodular.pod_userallpodbyuser(?);
-- call proyectomodular.pod_useralluserbypod(2);