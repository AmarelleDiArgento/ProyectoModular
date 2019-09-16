    Select if(s.client_id = '1020121', pd.costcenter, s.client_id) as nitcliente, DATE_FORMAT(s.date, "%Y-%m-%d") as Fecha, 
    p.code as CodigoProducto, pd.warehouse as Bodega, "Und.", 
    if(GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ',')=1,0.19,
    if(GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ',')='1,2',0.19, 0)) as Iva, 
    sum(sp.gross_price) as Base, 
    if(pt_tax_id=2,(sum(sp.net_price) * 1.08)/100,0) as valConsumo, 
    if(GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ',')=2,0.08,
    if(GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ',')='1,2',0.08, 0)) as consumo, 
    pd.costcenter as ccosto , sum(sp.quantity) as Cantidad, s.discount as descuento
    from pod as pd 
    left join sale as s on pd.pod_id = s.pod_id
    left join user as c on c.user_id = s.client_id
    left join sale_product as sp on s.sale_id = sp.sp_sale_id
    left join product as p on sp.sp_product_id = p.product_id
    left join product_tax as pt on p.product_id = pt.pt_product_id
    left join tax as t on t.tax_id = pt.pt_tax_id
	where s.date between concat("2019-01-10 00:00:00") and concat("2019-12-31 23:59:59")
    and s.accountant = 1 and sp.quantity > 0
    group by nitcliente, Fecha, CodigoProducto, Bodega, ccosto
    order by Fecha, nitcliente, p.code asc;
    
    -- Cliente def 76: 20001014 
    -- Bodega: CL76
    -- Centro de costo: 	 
    
    -- desde hasta ventas producto tirilla
    
    
    -- ALTER TABLE proyectomodular.pod 
	-- ADD COLUMN warehouse VARCHAR(10) NULL AFTER billing_limit,
	-- ADD COLUMN costcenter INT NULL AFTER warehouse,
	-- ADD COLUMN email VARCHAR(100) NULL AFTER name;

