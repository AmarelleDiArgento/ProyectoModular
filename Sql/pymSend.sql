    Select DATE_FORMAT(s.date, "%Y-%m-%d") as fecha, p.code, pd.code, "Und.", FORMAT(if(pt_tax_id=1,t.percent/100,0),2) as iva,  
    FORMAT(sp.gross_price,6) as Base, FORMAT(if(pt_tax_id=2,sp.tax_price,0),6) as valConsumo,
    FORMAT(if(pt_tax_id=2,t.percent/100,0),2) as consumo, sp.quantity as Cantidad,
    s.discount as descuento
    from pod as pd 
    left join sale as s on pd.pod_id = s.pod_id
    left join sale_product as sp on s.sale_id = sp.sp_sale_id
    left join product as p on sp.sp_product_id = p.product_id
    left join product_tax as pt on p.product_id = pt.pt_product_id
    left join tax as t on t.tax_id = pt.pt_tax_id
	where s.date between concat("2019-01-10 00:00:00") and concat("2019-12-31 23:59:59")
    and s.accountant = 1
    order by p.code asc; 