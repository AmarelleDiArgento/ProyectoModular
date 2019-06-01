
-- ------------------------------------------------------------------------------------------------------------------------
-- SALE PROCEDURE :D
-- PROCEDURE SALE NUM FACTURA
-- ------------------------------------------------------------

DROP procedure IF EXISTS salenum;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE salenum (
in _pod_id int(11),
out numfac bigint
)
BEGIN
declare num bigint;

select max(u.invoice_num) + 1 into num 
from (select invoice_num
from sale as s 
where s.pod_id = _pod_id) as u ;

if num is not null then
set numfac = num;
else
set numfac = 1;
end if;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE INSERT
-- ------------------------------------------------------------

DROP procedure IF EXISTS saleins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saleins (

  in _pod_id INT(11),
  in _user_id VARCHAR(45),
  in _client_id VARCHAR(45)	
)
BEGIN

call proyectomodular.salenum(_pod_id, @numfac);

INSERT INTO proyectomodular.sale
(invoice_num, date, pod_id, user_id, client_id)
VALUES
(@numfac,NOW(),_pod_id, _user_id, _client_id);
SELECT LAST_INSERT_ID() as sale_id;
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE UPDATE 
-- ------------------------------------------------------------

DROP procedure IF EXISTS saleupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saleupd (
  _sale_id BIGINT,
  _date DATE,
  _pod_id INT(11),
  _user_id VARCHAR(45),
  _client_id VARCHAR(45)
)
BEGIN
UPDATE proyectomodular.sale
SET
date = _date,
pod_id = _pod_id,
user_id = _user_id,
client_id = _client_id
WHERE sale_id = _sale_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT INSERT
-- ------------------------------------------------------------

DROP procedure IF EXISTS sale_productins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE sale_productins (
  _sp_product_id BIGINT,
  _sp_sale_id BIGINT,
  _quantity INT(11)
)
BEGIN
declare net real;
declare gross real;
declare tax real;

select 	(net_price - (sum(t.percent)/100) * p.net_price) * _quantity into gross
from product as p 
inner join product_tax as pt on p.product_id = pt.pt_product_id
inner join tax as t on pt.pt_tax_id = t.tax_id
where p.product_id = _sp_product_id;

select ((sum(t.percent)/100) * p.net_price) * _quantity into tax
from product as p 
inner join product_tax as pt on p.product_id = pt.pt_product_id
inner join tax as t on pt.pt_tax_id = t.tax_id
where p.product_id = _sp_product_id;

select net_price * _quantity into net
from product as p
where p.product_id = _sp_product_id;


INSERT INTO proyectomodular.sale_product
(sp_product_id, sp_sale_id, gross_price, tax_price, net_price, quantity)
VALUES
(_sp_product_id, _sp_sale_id, gross, tax, net, _quantity);

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT UPDATE
-- ------------------------------------------------------------

DROP procedure IF EXISTS sale_productupd;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE sale_productupd (
  _sp_product_id BIGINT,
  _sp_sale_id BIGINT,
  _gross_price real,
  _net_price real,
  _quantity INT(11)
)
BEGIN

UPDATE proyectomodular.sale_product
SET
sp_sale_id = _sp_sale_id,
gross_price = _gross_price,
net_price = _net_price,
quantity = _quantity
WHERE sp_product_id = _sp_product_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT DELETE
-- ------------------------------------------------------------

DROP procedure IF EXISTS sale_productdel;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE sale_productdel (
  _sp_product_id BIGINT,
  _sp_sale_id BIGINT
)
BEGIN

DELETE FROM proyectomodular.sale_product
WHERE sp_product_id = _sp_product_id and sp_sale_id = _sp_sale_id;

END$$

DELIMITER ;


-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT ALL
-- ------------------------------------------------------------

DROP procedure IF EXISTS saleall;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saleall (
)
BEGIN

	select concat(po.code, ' - ', invoice_num) as invoice_num, s.sale_id, s.date, po.pod_id, po.name as pod_name, s.user_id, u.username as user_name, s.client_id, c.username as client_name, sum(sp.tax_price) as tax_price, sum(sp.gross_price) gross_price, sum(sp.net_price) as net_price
	FROM pod as po 
	inner join sale as s on po.pod_id = s.pod_id
	inner join sale_product as sp on s.sale_id = sp.sp_sale_id
	inner join product as p on sp.sp_product_id = p.product_id
	inner join user as u on s.user_id = u.user_id  
	inner join user as c on s.client_id = c.user_id 
	group by s.sale_id;

END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT ONE
-- ------------------------------------------------------------

DROP procedure IF EXISTS saleone;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saleone (
  _sp_sale_id BIGINT
)
BEGIN

	SELECT concat(po.code, ' - ', invoice_num) as invoice_num, s.sale_id, s.date, po.pod_id, po.name, s.user_id, u.username, s.client_id, c.username, sp.tax_price, sp.gross_price, sp.net_price
	FROM pod as po 
	inner join sale as s on po.pod_id = s.pod_id
	inner join sale_product as sp on s.sale_id = sp.sp_sale_id
	inner join product as p on sp.sp_product_id = p.product_id
	inner join user as u on s.user_id = u.user_id  
	inner join user as c on s.client_id = c.user_id 
	where s.sale_id = _sp_sale_id;
	
END$$

DELIMITER ;

-- ------------------------------------------------------------
-- PROCEDURE SALE_PRODUCT ALL FOR DATE
-- ------------------------------------------------------------

DROP procedure IF EXISTS saledate;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE saledate (
  _begin datetime,
  _end datetime
)
BEGIN

	SELECT concat(po.code, ' - ', invoice_num) as invoice_num, s.sale_id, s.date, po.pod_id, po.name as pod_name, s.user_id, u.username as user_name, s.client_id, c.username as client_name, sum(sp.tax_price) as tax_price, sum(sp.gross_price) gross_price, sum(sp.net_price) as net_price
	FROM pod as po 
	inner join sale as s on po.pod_id = s.pod_id
	inner join sale_product as sp on s.sale_id = sp.sp_sale_id
	inner join product as p on sp.sp_product_id = p.product_id
	inner join user as u on s.user_id = u.user_id  
	inner join user as c on s.client_id = c.user_id 
	where s.date between _begin and _end
	group by sale_id;
	
END$$

DELIMITER ;

call proyectomodular.saleins(1, '1070949', '1020123');
call proyectomodular.sale_productins(3, 1, 4);
call proyectomodular.sale_productins(2, 1, 1);

call proyectomodular.saleins(1, '1070949', '1020123');
call proyectomodular.saleins(1, 2, 1);
call proyectomodular.saleins(2, 2, 5);

call proyectomodular.saleins(1, '1070949', '1020123');
call proyectomodular.saleins(1, 3, 1);
call proyectomodular.saleins(3, 3, 1);
