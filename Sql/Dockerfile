FROM mysql:8.0.13

ENV MYSQL_ROOT_PASSWORD da12cb09fe566f2d6e131d7fb5c5c732  
ENV MYSQL_DATABASE proyectomodular  
ENV MYSQL_USER proyectomodular  
ENV MYSQL_PASSWORD da12cb09fe566f2d6e131d7fb5c5c732
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
# SHOW VARIABLES LIKE 'collation%'
ADD pym.sql /docker-entrypoint-initdb.d/
ADD pymProcedure.sql /docker-entrypoint-initdb.d/
ADD pymDatos.sql /docker-entrypoint-initdb.d/

