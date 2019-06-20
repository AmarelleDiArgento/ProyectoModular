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


call producttaxsins(1,'1');
call producttaxsins(2,'1,2');
call producttaxsins(3,'1');
call producttaxsins(4,'1,2');
call producttaxsins(5,'2');
call producttaxsins(6,'2');
call producttaxsins(7,'2');
call producttaxsins(8,'1,2');
call producttaxsins(9,'1');
call producttaxsins(10,'1,2');
call producttaxsins(11,'1');

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

call proyectomodular.podins('Lago',
 '800000000-1',
 '18762012523801',
 '2017-08-15',
 1000,
 'El Lago ',
 'calle 76 16a 17',
 '4661233',
 1);
call proyectomodular.podins('Calima 1',
 '800000000-1',
 '76182802501231',
 '2016-09-25',
 1000,
 'cc Calima',
 'kr 27 21 75 lc a 77',
 '4875263',
 1);
 call proyectomodular.podins('Calima 2',
 '800000000-1',
 '76182802501231',
 '2016-09-25',
 1000,
 'cc Calima',
 'kr 27 21 75 lc b 146',
 '6045574',
 1);
call proyectomodular.podins('Restrepo',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Av NQSRestrepo',
 'kr 18 16 75 sur',
 '7023052',
 1);
 call proyectomodular.podins('San andresito',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'San andresito de la 38',
 'kr 38 8a 60',
 '',
 1);
 call proyectomodular.podins('Plaza central',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Plaza central',
 'kr 65 n11 90 lc 3-80',
 '7466934',
 1);
 call proyectomodular.podins('easy',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'easy de las americas',
 'av americas 68 78 lc 1',
 '4109653',
 1);
 call proyectomodular.podins('Outlet factory',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Outlet factory',
 'av americas 63 84 isla 192',
 '',
 1);
 call proyectomodular.podins('Metro Alqueria',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Metro alqueria',
 'kr 68 sur 38a 15 lc 4',
 '',
 1);
 call proyectomodular.podins('centro Mayor',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Centro mayor',
 'cl 38a sur 34d 50 lc 3044',
 '7035621',
 1);
 call proyectomodular.podins('Metro',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Metro auto sur',
 'ac 57r sur 77a 18 lc 12-a',
 '',
 1);
 call proyectomodular.podins('Uni sur',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Unisur Soacha',
 'kr 3a 29a 02 autopista sur soacha',
 '',
 1);
 call proyectomodular.podins('Mercurio',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'cc Mercurio soacha',
 'local Bahia kr 7 32 25 lc 285',
 '9003057',
 1);
 call proyectomodular.podins('Metro soacha',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Metro soacha',
 'kr 7 32 25 lc 3',
 '',
 1);
 call proyectomodular.podins('Av Jimenez',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Av Jimenez',
 'Av jimenez 9 78',
 '2430396',
 1);
 call proyectomodular.podins('Ventura',
 '800000000-1',
 '23765028180211',
 '2015-12-11',
 1000,
 'Ventura Terreros Soacha',
 'kr 1 38 53 lc 4-21',
 '7023052',
 1);

-- call proyectomodular.podins(?, ?, ?, ?, ?, ?, ?);
-- call proyectomodular.podupd(?, ?, ?, ?, ?, ?, ?, ?);
-- call proyectomodular.podone(?);
-- call proyectomodular.podall();
-- call proyectomodular.poddel(?);

-- ------------------------------------------------------------
-- POD_USER INSERT
-- ------------------------------------------------------------

call proyectomodular.pods_userins('1020122','1,2,3');
call proyectomodular.pods_userins('1020123','1');

-- call proyectomodular.pod_userins(?,?);
-- call proyectomodular.pod_userins(?,?);
-- call proyectomodular.pod_userallpodbyuser(?);
-- call proyectomodular.pod_useralluserbypod(2);




