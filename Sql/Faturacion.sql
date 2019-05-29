
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
  in _client_id VARCHAR(45),
  OUT sale BIGINT
)
BEGIN

call proyectomodular.salenum(_pod_id, @numfac);

INSERT INTO proyectomodular.sale
(invoice_num, date, pod_id, user_id, client_id)
VALUES
(@numfac,NOW(),_pod_id, _user_id, _client_id);
SET sale = LAST_INSERT_ID();
END$$

DELIMITER ;

call proyectomodular.saleins(1, '1020123', '1020123', @sale);
call proyectomodular.saleins(1, '1020123', '1020123', @sale);
call proyectomodular.saleins(3, '1020123', '1020123', @sale);
call proyectomodular.saleins(4, '1020123', '1020123', @sale);
call proyectomodular.saleins(1, '1020123', '1020123', @sale);
call proyectomodular.saleins(1, '1020123', '1020123', @sale);
call proyectomodular.saleins(3, '1020123', '1020123', @sale);
call proyectomodular.saleins(1, '1020123', '1020123', @sale);
call proyectomodular.saleins(4, '1020123', '1020123', @sale);
Select @sale;

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






