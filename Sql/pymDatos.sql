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
call proyectomodular.userins('1020121','Cliente','cliente@prueba.com', "é61ë62î63Þ64Û45Ú74ª134«45¬118­87®", 1, 1);
call proyectomodular.userins('1020122','Admin','admin@prueba.com', "é61ë62î63Þ64Û45Ú74ª134«45¬118­87®", 2, 1);
call proyectomodular.userins('1020123','Vendedor','vendedor@prueba.com', "é61ë62î63Þ64Û45Ú74ª134«45¬118­87®", 3, 1);

-- call proyectomodular.userins(?, ?, ?, ?, ?, ?);
-- call proyectomodular.userupd(?, ?, ?, ?, ?, ?);
-- call proyectomodular.userone(?);
-- call proyectomodular.userdel(?);
-- call proyectomodular.userall();
-- call proyectomodular.userlogin(?, ?)

-- ------------------------------------------------------------
-- TAX INSERT
-- ------------------------------------------------------------
 call proyectomodular.taxins('IVA', 19.00 );
 call proyectomodular.taxins('Consumo', 8.00);
 call proyectomodular.taxins('Lujo', 5.00);

-- call proyectomodular.taxins(?,?);
-- call proyectomodular.taxupd(?, ?, ?);
-- call proyectomodular.taxone(?);
-- call proyectomodular.taxdel(?);
-- call proyectomodular.taxall();

-- ------------------------------------------------------------
-- PRODUCT INSERT
-- ------------------------------------------------------------
call proyectomodular.productins('101', 'AREPA MAIZ CUAJADA', '2400', 3, 'assets/productos/arepa.png', 1);
call proyectomodular.productins('102', 'AREPA MAIZ BOCADILLO', '2400', 3, 'assets/productos/arepa.png', 1);
call proyectomodular.productins('103', 'AREPA MAIZ QUESO', '2600', 3, 'assets/productos/arepa.png', 1);
call proyectomodular.productins('104', 'AREPA MAIZ - POLLO', '2600', 3, 'assets/productos/arepa.png', 1);
call proyectomodular.productins('105', 'AREPA MAIZ CARNE', '2600', 3, 'assets/productos/arepa.png', 1);
call proyectomodular.productins('106', 'AREPA MAIZ AREQUIPE', '2600', 3, 'assets/productos/arepa.png', 1);
call proyectomodular.productins('107', 'AREPA MAIZ RANCHERA', '2600', 3, 'assets/productos/arepa.png', 1);
call proyectomodular.productins('301', 'ALMOJABANA', '2400', 9, 'assets/productos/almojabana.jpeg', 1);
call proyectomodular.productins('302', 'RESOBADO', '1700', 9, 'assets/productos/pan.jpeg', 1);
call proyectomodular.productins('303', 'CALENTANO', '1700', 9, 'assets/productos/pan.jpeg', 1);
call proyectomodular.productins('304', 'GARULLA', '2500', 3, 'assets/productos/pan.jpeg', 1);
call proyectomodular.productins('305', 'GARULLA CON AREQUIPE', '2600', 3, 'assets/productos/pan.jpeg', 1);
call proyectomodular.productins('401', 'AVENA', '2400', 7, 'assets/productos/avena.jpeg', 1);
call proyectomodular.productins('402', 'MASATO 09 ONZ', '1900', 7, 'assets/productos/masato.jpeg', 1);
call proyectomodular.productins('403', 'JUGO NATURAL EN AGUA', '3700', 7, 'assets/productos/jugo.jpeg', 1);
call proyectomodular.productins('404', 'JUGO NATURAL EN LECHE', '4200', 7, 'assets/productos/jugo.jpeg', 1);
call proyectomodular.productins('501', 'TE CHAI', '4400', 7, 'assets/productos/te.jpeg', 1);
call proyectomodular.productins('508', 'AROMATICAS DE FRUTAS', '3200', 6, 'assets/productos/aromatica.jpeg', 1);
call proyectomodular.productins('510', 'MILO 9 ONZ', '3000', 6, 'assets/productos/cafe.jpeg', 1);
call proyectomodular.productins('513', 'AGUADEPANELA', '1700', 6, 'assets/productos/cafe.jpeg', 1);
call proyectomodular.productins('516', 'CAPUCHINO IRLANDES', '4500', 6, 'assets/productos/cafe.jpeg', 1);
call proyectomodular.productins('518', 'AMERICANO 7 ONZAS', '1800', 6, 'assets/productos/cafe.jpeg', 1);
call proyectomodular.productins('520', 'CAPPUCCINO TRADICIONAL 9 ONZAS', '3000', 6, 'assets/productos/cafe.jpeg', 1);
call proyectomodular.productins('521', 'CAFÉ DE LA CASA 9 oz', '3000', 6, 'assets/productos/cafe.jpeg', 1);
call proyectomodular.productins('712', 'PET 400 ML POSTOBON', '2600', 7, 'assets/productos/postobon.jpeg', 1);
call proyectomodular.productins('715', 'HIT 8 ONZ NO RETORNABLE', '2200', 7, 'assets/productos/hit.jpeg', 1);
call proyectomodular.productins('721', 'AGUA', '2700', 7, 'assets/productos/agua.jpeg', 1);
call proyectomodular.productins('722', 'VITAL', '2200', 7, 'assets/logoprobocaitos.png', 1);
call proyectomodular.productins('727', 'H2Oh!', '3100', 7, 'assets/productos/h2o.jpeg', 1);
call proyectomodular.productins('001', 'Opcion1', '8200', 1, 'assets/productos/desayuno.jpeg', 1);
call proyectomodular.productins('002', 'Opcion2', '12000', 1, 'assets/productos/desayuno.jpeg', 1);
call proyectomodular.productins('003', 'Opcion3', '9000', 1, 'assets/productos/desayuno.jpeg', 1);
call proyectomodular.productins('004', 'probocado1', '14900', 5, 'assets/productos/desayuno.jpeg', 1);
call proyectomodular.productins('005', 'probocado2', '15900', 5, 'assets/productos/desayuno.jpeg', 1);
call proyectomodular.productins('006', 'Campesinos', '4700', 2, 'assets/productos/huevos.jpeg', 1);
call proyectomodular.productins('007', 'Rancheros', '5400', 2, 'assets/productos/huevos.jpeg', 1);
call proyectomodular.productins('008', 'Del Huerto', '4700', 2, 'assets/productos/huevos.jpeg', 1);
call proyectomodular.productins('009', 'Clasicos', '4100', 2, 'assets/productos/huevos-clasicos.jpeg', 1);


-- call proyectomodular.productins(?, ?, ?, ?, ?, ?);
-- call proyectomodular.productupd(?, ?, ?, ?, ?, ?, ?);
-- call proyectomodular.productall();
-- call proyectomodular.productone(?);
-- call proyectomodular.productonebycode(?);
-- call proyectomodular.productdel(?);


call producttaxsins(1,'1');
call producttaxsins(2,'1');
call producttaxsins(3,'1');
call producttaxsins(4,'1');
call producttaxsins(5,'1');
call producttaxsins(6,'1');
call producttaxsins(7,'1');
call producttaxsins(8,'1');
call producttaxsins(9,'1');
call producttaxsins(10,'1');
call producttaxsins(11,'1');
call producttaxsins(12,'1');
call producttaxsins(13,'1');
call producttaxsins(14,'1');
call producttaxsins(15,'1');
call producttaxsins(16,'1');
call producttaxsins(17,'1');
call producttaxsins(18,'1');
call producttaxsins(19,'1');
call producttaxsins(20,'1');
call producttaxsins(21,'1');
call producttaxsins(22,'1');
call producttaxsins(23,'1');
call producttaxsins(24,'1');
call producttaxsins(25,'1');
call producttaxsins(26,'1');
call producttaxsins(27,'1');
call producttaxsins(28,'1');
call producttaxsins(29,'1');
call producttaxsins(30,'1');
call producttaxsins(31,'1');
call producttaxsins(32,'1');
call producttaxsins(33,'1');
call producttaxsins(34,'1');
call producttaxsins(35,'1');
call producttaxsins(36,'1');
call producttaxsins(37,'1');
call producttaxsins(38,'1');


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

call proyectomodular.privilegeins('Usuarios', 1,'people','listusers', 1);
call proyectomodular.privilegeins('Roles', 1,'assignment_ind','listrols', 1);
call proyectomodular.privilegeins('Privilegios', 1,'view_list','listprivileges', 1);
call proyectomodular.privilegeins('Modulos', 1,'widgets','listmodules', 1);
call proyectomodular.privilegeins('Puntos', 2,'store','listpods', 1);
call proyectomodular.privilegeins('Ventas', 2,'local_grocery_store','listsales', 1);
call proyectomodular.privilegeins('Productos', 3,'card_giftcard','listproducts', 1);
call proyectomodular.privilegeins('Impuestos', 3,'description','listtaxs', 1);
call proyectomodular.privilegeins('Categorias', 3,'extension','listcategorys', 1);

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
call proyectomodular.podins('LAG',
'800000000-1',
'18762012523802',
'2017-08-15',
 1000,
'El Lago',
'Calle 76 # 16ª-17',
'4661233',
 1);
call proyectomodular.podins('CAL1',
'800000000-2',
'00000003',
'2016-09-25',
 1000,
'CC Calima',
'Carrera 27 # 21-75 Local a 77',
'4875263',
 1);
 call proyectomodular.podins('CAL2',
'800000000-3',
'00000004',
'2016-09-25',
 1000,
'CC Calima 2',
'Carrera 27 # 21-75 Local b 146',
'6045574',
 1);
call proyectomodular.podins('ANR',
'800000000-4',
'00000005',
'2015-12-11',
 1000,
'Avenida NQS Restrepo',
'Carrera 18 # 16-75 Sur',
'7023052',
 1);
 call proyectomodular.podins('SAN',
'800000000-5',
'00000006',
'2015-12-11',
 1000,
'San Andresito de la 38',
'Carrera 38 # 8ª-60',
'',
 1);
 call proyectomodular.podins('PLC',
'800000000-6',
'00000007',
'2015-12-11',
 1000,
'Plaza Central',
'Carrera 65 # 11-90 Local 3-80',
'7466934',
 1);
 call proyectomodular.podins('EAS',
'800000000-7',
'00000008',
'2015-12-11',
 1000,
'Easy de las Américas',
'Avenida Américas # 68-78 Local 1',
'4109653',
 1);
 call proyectomodular.podins('OTF',
'800000000-8',
'00000009',
'2015-12-11',
 1000,
'Outlet Factory',
'Avenida Américas # 63-84 Isla 192',
'',
 1);
 call proyectomodular.podins('MTA',
'800000000-9',
'000000010',
'2015-12-11',
 1000,
'Metro Alquería',
'Carrera 68 Sur # 38ª-15 Local 4',
'',
 1);
 call proyectomodular.podins('CMY',
'800000000-10',
'000000011',
'2015-12-11',
 1000,
'Centro Mayor',
'Calle 38a Sur # 34d-50 Local 3044',
'7035621',
 1);
 call proyectomodular.podins('MTR',
'800000000-11',
'000000012',
'2015-12-11',
 1000,
'Metro Auto Sur',
'ac 57r Sur # 77ª-18 Local 12-a',
'',
 1);
 call proyectomodular.podins('UNS',
'800000000-12',
'000000013',
'2015-12-11',
 1000,
'Unisur Soacha',
'Carrera 3ª # 29ª-02 Autopista Sur Soacha',
'',
 1);
 call proyectomodular.podins('MRC',
'800000000-13',
'000000014',
'2015-12-11',
 1000,
'Centro Comercial Mercurio Soacha',
'local Bahía Carrera 7 # 32-25 Local 285',
'9003057',
 1);
 call proyectomodular.podins('MTS',
'800000000-14',
'000000015',
'2015-12-11',
 1000,
'Metro Soacha',
'Carrera 7 # 32-25 Local 3',
'',
 1);
 call proyectomodular.podins('AJM',
'800000000-15',
'000000000016',
'2015-12-11',
 1000,
'Avenida Jiménez',
'Avenida Jiménez # 9-78',
'2430396',
 1);
 call proyectomodular.podins('VTS',
'800000000-16',
'00000000000017',
'2015-12-11',
 1000,
'Ventura Terreros Soacha',
'Carrera 1 #38-53 Local 4-21',
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




