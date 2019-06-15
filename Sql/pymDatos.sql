USE proyectomodular;

-- ------------------------------------------------------------
-- ROL INSERT
-- ------------------------------------------------------------
 call proyectomodular.rolins('Cliente');
 call proyectomodular.rolins('Administrador');
 call proyectomodular.rolins('Vendedor');

-- call proyectomodular.rolins(?);
-- call proyectomodular.rolupd(?, ?);
-- call proyectomodular.rolone(?);
-- call proyectomodular.roldel(?);
-- call proyectomodular.rolall();
-- call proyectomodular.rolpermissions()

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
call proyectomodular.userins('1020121', 'Cliente', 'cliente@prueba.com', "é61ë62î63Þ64Û45Ú74ª134«45¬118­87®", 1, 1);
call proyectomodular.userins('1020122', 'Admin', 'admin@prueba.com', "é61ë62î63Þ64Û45Ú74ª134«45¬118­87®", 2, 1);
call proyectomodular.userins('1020123', 'Vendedor', 'vendedor@prueba.com', "é61ë62î63Þ64Û45Ú74ª134«45¬118­87®", 3, 1);

-- call proyectomodular.userins(?, ?, ?, ?, ?, ?);
-- call proyectomodular.userupd(?, ?, ?, ?, ?, ?);
-- call proyectomodular.userone(?);
-- call proyectomodular.userdel(?);
-- call proyectomodular.userall();
-- call proyectomodular.userlogin(?, ?)

-- ------------------------------------------------------------
-- TAX INSERT
-- ------------------------------------------------------------
 call proyectomodular.taxins('Consumo', 8.00);
 call proyectomodular.taxins('IVA', 19.00 );
 call proyectomodular.taxins('Lujo', 5.00);

-- call proyectomodular.taxins(?,?);
-- call proyectomodular.taxupd(?, ?, ?);
-- call proyectomodular.taxone(?);
-- call proyectomodular.taxdel(?);
-- call proyectomodular.taxall();

-- ------------------------------------------------------------
-- PRODUCT INSERT
-- ------------------------------------------------------------
call proyectomodular.productins('1010101010', 'Papas', '1200', 1, 'https://images.rappi.com/products/949957-1551195546652.png?d=200x200&e=webp', 1);
call proyectomodular.productins('111111111', 'Arroz', '2000', 1, 'https://images.rappi.com/products/1351206-1551364455.png?d=200x200', 1);
call proyectomodular.productins('000000000', 'Queso', '1400', 1, 'https://images.rappi.com/products/730077-1-1464281372.png?d=200x200&e=webp', 1);
call proyectomodular.productins('432423422', 'Tomate', '600', 1, 'https://images.rappi.com/products/1123-1506483783.png?d=200x200&e=webp', 1);
call proyectomodular.productins('967352859', 'Cebolla', '600', 1, 'https://images.rappi.com/products/1192-1505832005.png?d=200x200&e=webp', 1);
call proyectomodular.productins('169673378', 'Empanadas', '600', 1, 'https://images.rappi.com/products/2089940485-1506986215.png?d=200x200&e=webp', 1);
call proyectomodular.productins('452019754', 'Salsa', '600', 1, 'https://images.rappi.com/products/522431-1551194951451.png?d=200x200&e=webp', 1);
call proyectomodular.productins('108473291', 'Merengue', '600', 1, 'https://images.rappi.com/products/696556-1551199800326.png?d=200x200&e=webp', 1);
call proyectomodular.productins('176403856', 'Burrito', '600', 1, 'https://images.rappi.com/products/706945-1494374233.png?d=200x200&e=webp', 1);
call proyectomodular.productins('756342910', 'Yuca', '600', 1, 'https://images.rappi.com/products/1154-1504888831.png?d=200x200&e=webp', 1);
call proyectomodular.productins('164859634', 'Uvas Pasas', '600', 1, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);

-- call proyectomodular.productins(?, ?, ?, ?, ?, ?);
-- call proyectomodular.productupd(?, ?, ?, ?, ?, ?, ?);
-- call proyectomodular.productall();
-- call proyectomodular.productone(?);
-- call proyectomodular.productonebycode(?);
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

call proyectomodular.privilegeins('User', 1, 'people', 'listusers', 1);
call proyectomodular.privilegeins('Rol', 1, 'assignment_ind', 'listrols', 1);
call proyectomodular.privilegeins('Privilege', 1, 'view_list', 'listprivileges', 1);
call proyectomodular.privilegeins('Module', 1, 'widgets', 'listmodules', 1);
call proyectomodular.privilegeins('Pod', 2, 'store', 'listpods', 1);
call proyectomodular.privilegeins('Sale', 2, 'local_grocery_store', 'listsales', 1);
call proyectomodular.privilegeins('Product', 3, 'card_giftcard', 'listproducts', 1);
call proyectomodular.privilegeins('Tax', 3, 'description', 'listtaxs', 1);
call proyectomodular.privilegeins('Category', 3, 'extension', 'listcategorys', 1);

-- call proyectomodular.privilegeins(?,?,?,?,?);
-- call proyectomodular.privilegeupd(?,?,?,?,?,?);
-- call proyectomodular.privilegeall();
-- call proyectomodular.privilegedel(?);
-- call proyectomodular.privilegeone(?);

-- ------------------------------------------------------------
-- ROL_PRIVILEGE INSERT
-- ------------------------------------------------------------

call proyectomodular.rol_privilegeins(6, 3, 1, 1, 1, 1);

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

call proyectomodular.podins('AME', '890903938-8', '18762012523801', '2017-08-15', 1000, 'Americas 68', 'Av Americas No 68 36 lc 101', '4561234',  1);
call proyectomodular.podins('ABY', '860066942-7', '76182802501231', '2016-09-25', 1000, 'Av Boyaca', 'Av Boyaca No 68 36 lc 101', '4561234',  1);
call proyectomodular.podins('NQS', '860011153-6', '23765028180211', '2015-12-11', 1000, 'Av NQS', 'Av NQS No 68 36 lc 101', '4561234',  1);

-- call proyectomodular.podins(?, ?, ?, ?, ?, ?, ?);
-- call proyectomodular.podupd(?, ?, ?, ?, ?, ?, ?, ?);
-- call proyectomodular.podone(?);
-- call proyectomodular.podall();
-- call proyectomodular.poddel(?);

-- ------------------------------------------------------------
-- POD_USER INSERT
-- ------------------------------------------------------------

call proyectomodular.pod_userins('1020122',1);
call proyectomodular.pod_userins('1020122',2);
call proyectomodular.pod_userins('1020122',3);
call proyectomodular.pod_userins('1020123',1);
-- call proyectomodular.pod_userins(?,?);
-- call proyectomodular.pod_userins(?,?);
-- call proyectomodular.pod_userallpodbyuser(?);
-- call proyectomodular.pod_useralluserbypod(2);

call proyectomodular.producttaxins(1, 1);
call proyectomodular.producttaxins(2, 1);
call proyectomodular.producttaxins(3, 1);
call proyectomodular.producttaxins(3, 2);	

call proyectomodular.saleins(1, '1020123', '1020123');
call proyectomodular.sale_productins(1, 3, 4);
call proyectomodular.sale_productins(1, 2, 1);
call proyectomodular.sale_productins(1, 1, 1);

call proyectomodular.saleins(1, '1020123', '1020123');
call proyectomodular.sale_productins(2, 1, 1);
call proyectomodular.sale_productins(2, 2, 5);

call proyectomodular.saleins(1, '1020123', '1020123');
call proyectomodular.sale_productins(3, 1, 1);
call proyectomodular.sale_productins(3, 2, 1);
call proyectomodular.sale_productins(3, 3, 1);
call proyectomodular.sale_productins(3, 3, 1);


