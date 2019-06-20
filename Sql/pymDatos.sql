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
call proyectomodular.categoryins('Desayunos');
call proyectomodular.categoryins('Huevos');
call proyectomodular.categoryins('Arepas');
call proyectomodular.categoryins('Bocaitos');
call proyectomodular.categoryins('Probocao');
call proyectomodular.categoryins('Bebidas Calientes');
call proyectomodular.categoryins('Bebidas de la casa');
call proyectomodular.categoryins('Otras Bebidas');
call proyectomodular.categoryins('Otros');


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
call proyectomodular.productins('101', 'AREPA MAIZ CUAJADA', '2400', 3, 'https://images.rappi.com/products/949957-1551195546652.png?d=200x200&e=webp', 1);
call proyectomodular.productins('102', 'AREPA MAIZ BOCADILLO', '2400', 3, 'https://images.rappi.com/products/1351206-1551364455.png?d=200x200', 1);
call proyectomodular.productins('103', 'AREPA MAIZ QUESO', '2600', 3, 'https://images.rappi.com/products/730077-1-1464281372.png?d=200x200&e=webp', 1);
call proyectomodular.productins('104', 'AREPA MAIZ - POLLO', '2600', 3, 'https://images.rappi.com/products/1123-1506483783.png?d=200x200&e=webp', 1);
call proyectomodular.productins('105', 'AREPA MAIZ CARNE', '2600', 3, 'https://images.rappi.com/products/1192-1505832005.png?d=200x200&e=webp', 1);
call proyectomodular.productins('106', 'AREPA MAIZ AREQUIPE', '2600', 3, 'https://images.rappi.com/products/2089940485-1506986215.png?d=200x200&e=webp', 1);
call proyectomodular.productins('107', 'AREPA MAIZ RANCHERA', '2600', 3, 'https://images.rappi.com/products/522431-1551194951451.png?d=200x200&e=webp', 1);
call proyectomodular.productins('301', 'ALMOJABANA', '2400', 9, 'https://images.rappi.com/products/696556-1551199800326.png?d=200x200&e=webp', 1);
call proyectomodular.productins('302', 'RESOBADO', '1700', 9, 'https://images.rappi.com/products/706945-1494374233.png?d=200x200&e=webp', 1);
call proyectomodular.productins('303', 'CALENTANO', '1700', 9, 'https://images.rappi.com/products/1154-1504888831.png?d=200x200&e=webp', 1);
call proyectomodular.productins('304', 'GARULLA', '2500', 3, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('305', 'GARULLA CON AREQUIPE', '2600', 3, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('401', 'AVENA', '2400', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('402', 'MASATO 09 ONZ', '1900', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('403', 'JUGO NATURAL EN AGUA', '3700', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('404', 'JUGO NATURAL EN LECHE', '4200', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('501', 'TE CHAI', '4400', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('508', 'AROMATICAS DE FRUTAS', '3200', 6, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('510', 'MILO 9 ONZ', '3000', 6, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('513', 'AGUADEPANELA', '1700', 6, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('516', 'CAPUCHINO IRLANDES', '4500', 6, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('518', 'AMERICANO 7 ONZAS', '1800', 6, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('520', 'CAPPUCCINO TRADICIONAL 9 ONZAS', '3000', 6, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('521', 'CAFÉ DE LA CASA 9 oz', '3000', 6, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('712', 'PET 400 ML POSTOBON', '2600', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('715', 'HIT 8 ONZ NO RETORNABLE', '2200', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('721', 'AGUA', '2700', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('722', 'VITAL', '2200', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);
call proyectomodular.productins('727', 'H2Oh!', '3100', 7, 'https://images.rappi.com/products/911708-1537313741.png?d=200x200&e=webp', 1);

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
 '18762012523802',
 '2017-08-15',
 1000,
 'El Lago ',
 'calle 76 16a 17',
 '4661233',
 1);
call proyectomodular.podins('Cal1',
 '800000000-2',
 '00000003',
 '2016-09-25',
 1000,
 'cc Calima',
 'kr 27 21 75 lc a 77',
 '4875263',
 1);
 call proyectomodular.podins('Cal2',
 '800000000-3',
 '00000004',
 '2016-09-25',
 1000,
 'cc Calima 2',
 'kr 27 21 75 lc b 146',
 '6045574',
 1);
call proyectomodular.podins('Rest',
 '800000000-4',
 '00000005',
 '2015-12-11',
 1000,
 'Av NQSRestrepo',
 'kr 18 16 75 sur',
 '7023052',
 1);
 call proyectomodular.podins('Sand',
 '800000000-5',
 '00000006',
 '2015-12-11',
 1000,
 'San andresito de la 38',
 'kr 38 8a 60',
 '',
 1);
 call proyectomodular.podins('Pcen',
 '800000000-6',
 '00000007',
 '2015-12-11',
 1000,
 'Plaza central',
 'kr 65 n11 90 lc 3-80',
 '7466934',
 1);
 call proyectomodular.podins('easy',
 '800000000-7',
 '00000008',
 '2015-12-11',
 1000,
 'easy de las americas',
 'av americas 68 78 lc 1',
 '4109653',
 1);
 call proyectomodular.podins('Outf',
 '800000000-8',
 '00000009',
 '2015-12-11',
 1000,
 'Outlet factory',
 'av americas 63 84 isla 192',
 '',
 1);
 call proyectomodular.podins('MAlq',
 '800000000-9',
 '000000010',
 '2015-12-11',
 1000,
 'Metro alqueria',
 'kr 68 sur 38a 15 lc 4',
 '',
 1);
 call proyectomodular.podins('cMay',
 '800000000-10',
 '000000011',
 '2015-12-11',
 1000,
 'Centro mayor',
 'cl 38a sur 34d 50 lc 3044',
 '7035621',
 1);
 call proyectomodular.podins('Metr',
 '800000000-11',
 '000000012',
 '2015-12-11',
 1000,
 'Metro auto sur',
 'ac 57r sur 77a 18 lc 12-a',
 '',
 1);
 call proyectomodular.podins('Usur',
 '800000000-12',
 '000000013',
 '2015-12-11',
 1000,
 'Unisur Soacha',
 'kr 3a 29a 02 autopista sur soacha',
 '',
 1);
 call proyectomodular.podins('Merc',
 '800000000-13',
 '000000014',
 '2015-12-11',
 1000,
 'cc Mercurio soacha',
 'local Bahia kr 7 32 25 lc 285',
 '9003057',
 1);
 call proyectomodular.podins('Msoa',
 '800000000-14',
 '000000015',
 '2015-12-11',
 1000,
 'Metro soacha',
 'kr 7 32 25 lc 3',
 '',
 1);
 call proyectomodular.podins('Jime',
 '800000000-15',
 '000000000016',
 '2015-12-11',
 1000,
 'Av Jimenez',
 'Av jimenez 9 78',
 '2430396',
 1);
 call proyectomodular.podins('Vent',
 '800000000-16',
 '00000000000017',
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




