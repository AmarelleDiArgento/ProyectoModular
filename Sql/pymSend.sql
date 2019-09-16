    Select if(s.client_id = '1020121', '20001014', s.client_id) as nitcliente, DATE_FORMAT(s.date, "%Y-%m-%d") as Fecha, 
    p.code as CodigoProducto, pd.code as Punto, "Und.", 
    FORMAT(if(pt_tax_id=1,t.percent/100,0),2) as Iva, FORMAT(sp.gross_price,6) as Base, 
    FORMAT(if(pt_tax_id=2,sp.tax_price,0),6) as valConsumo, FORMAT(if(pt_tax_id=2,t.percent/100,0),2) as consumo, 
    '20001014' as c_costo , sum(sp.quantity) as Cantidad, (s.discount/100) as descuento
    from pod as pd 
    left join sale as s on pd.pod_id = s.pod_id
    left join user as c on c.user_id = s.client_id
    left join sale_product as sp on s.sale_id = sp.sp_sale_id
    left join product as p on sp.sp_product_id = p.product_id
    left join product_tax as pt on p.product_id = pt.pt_product_id
    left join tax as t on t.tax_id = pt.pt_tax_id
	where s.date between concat("2019-01-10 00:00:00") and concat("2019-12-31 23:59:59")
    and s.accountant = 1
    group by nitcliente, Fecha, CodigoProducto, Punto,Iva,Base	
    order by nitcliente, p.code asc;
    
    -- Cliente def 76: 20001014 
    -- Bodega: CL76
    -- Centro de costo: 20001014 
    
    -- desde hasta ventas producto tirilla
    
    
    ALTER TABLE proyectomodular.pod 
	ADD COLUMN warehouse VARCHAR(10) NULL AFTER billing_limit,
	ADD COLUMN costcenter INT NULL AFTER warehouse,
	ADD COLUMN email VARCHAR(100) NULL AFTER name;

