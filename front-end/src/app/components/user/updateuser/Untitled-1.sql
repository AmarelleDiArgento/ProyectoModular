DROP procedure IF EXISTS pod_userins;

DELIMITER $$
USE proyectomodular$$
CREATE PROCEDURE pod_userins (
  _ps_user_id varchar(45),
  _ps_pod_id int(11)
)
BEGIN

declare cont int;
select  count(ps_user_id) into cont from pod_user 
where ps_user_id = _ps_user_id and ps_pod_id = _ps_pod_id;

if cont then
select 'duplicate record' as error;
else 
INSERT INTO proyectomodular.pod_user (ps_user_id,ps_pod_id) 
VALUES
(_ps_user_id,_ps_pod_id);
end if;

END$$

DELIMITER ;