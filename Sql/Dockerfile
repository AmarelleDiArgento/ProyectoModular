FROM mysql:8.0.13
ENV MYSQL_HOSTNAME=pymDataBase
ENV MYSQL_ROOT_PASSWORD da12cb09fe566f2d6e131d7fb5c5c732  
ENV MYSQL_DATABASE proyectomodular  
ENV MYSQL_USER proyectomodular  
ENV MYSQL_PASSWORD da12cb09fe566f2d6e131d7fb5c5c732

ADD pym.sql /docker-entrypoint-initdb.d/
ADD pymProcedure.sql /docker-entrypoint-initdb.d/
ADD pymDatos.sql /docker-entrypoint-initdb.d/

