import pandas as pd
import pyodbc

# Configuración de conexiones a las bases de datos
source_db_config = {
    'server': 'DESKTOP-143JKCV\DANIEL',
    'database': 'sweetDreams',
    'user': 'sa',
    'password': 'Cajeta2022',
}

target_db_config = {
    'server': 'DESKTOP-143JKCV\DANIEL',
    'database': 'sweetDreams',
    'user': 'sa',
    'password': 'Cajeta2022',
}

clean_target_db_config = {
    'server': 'DESKTOP-143JKCV\DANIEL',
    'database': 'sweetDreamsClean',
    'user': 'sa',
    'password': 'Cajeta2022',
}

# Conexiones a las bases de datos utilizando pyodbc
def create_connection(db_config):
    connection_string = (
        f"DRIVER=ODBC Driver 17 for SQL Server;"
        f"SERVER={db_config['server']};"
        f"DATABASE={db_config['database']};"
        f"UID={db_config['user']};"
        f"PWD={db_config['password']};"
    )
    return pyodbc.connect(connection_string)

source_connection = create_connection(source_db_config)
target_connection = create_connection(target_db_config)
clean_target_connection = create_connection(clean_target_db_config)

fechaInicio = '2023/08/01'
fechaFin = '2023/08/31'

# Extracción de datos de la base de datos fuente
query1 = "SELECT p.razon_social as Proveedor, SUM(c.total) as Total FROM DetalleCompra dc JOIN Compras c ON dc.compra_id = c.id JOIN Proveedor p ON c.proveedor_id = p.id WHERE c.fecha_creacion BETWEEN ? AND ? GROUP BY p.razon_social;"
query2 = "SELECT TOP 10 c.nombres as Cliente, SUM(v.total) as Total_Vendido FROM DetalleVenta dv JOIN Ventas v ON dv.venta_id = v.id JOIN Clientes c ON v.cliente_id = c.id WHERE v.fecha_creacion BETWEEN ? AND ? GROUP BY c.nombres ORDER BY Total_Vendido DESC;"
query3 = "SELECT r.receta, SUM(dv.cantidad) AS cantidad_total FROM DetalleVenta dv INNER JOIN Menu m ON dv.menu_id = m.id INNER JOIN Receta r ON m.receta_id = r.id INNER JOIN Ventas v on dv.venta_id = v.id WHERE v.fecha_creacion BETWEEN ? and ?  GROUP BY r.receta;"
query4 = "SELECT CASE WHEN p.estatus_pedido = 0 THEN 'Ganancia' WHEN p.estatus_pedido = 1 THEN 'Perdida' END AS resultado, SUM(dp.cantidad * dp.precio_unitario) AS total FROM DetallePedido dp INNER JOIN Pedidos p ON dp.pedido_id = p.id WHERE p.estatus_pedido IN (0, 1) AND p.fecha_creacion BETWEEN ? AND ? GROUP BY p.estatus_pedido ORDER BY p.estatus_pedido;"

source_data1 = pd.read_sql(query1, source_connection, params=[fechaInicio,fechaFin])
source_data2 = pd.read_sql(query2, source_connection, params=[fechaInicio,fechaFin])
source_data3 = pd.read_sql(query3, source_connection, params=[fechaInicio,fechaFin])
source_data4 = pd.read_sql(query4, source_connection, params=[fechaInicio,fechaFin])

# Transformación de datos (puedes realizar las transformaciones necesarias aquí)
transformed_data1 = source_data1.copy()
transformed_data2 = source_data2.copy()
transformed_data3 = source_data3.copy()
transformed_data4 = source_data4.copy()

# Truncate tables before loading transformed data in "sweetDreams" database
truncate_queries_sweetdreams = [
    "TRUNCATE TABLE comprasGeneral;",
    "TRUNCATE TABLE topClientes;",
    "TRUNCATE TABLE mejoresProductos;",
    "TRUNCATE TABLE utilidad;"
]


cursor_target = target_connection.cursor()
for query in truncate_queries_sweetdreams:
    cursor_target.execute(query)
target_connection.commit()
cursor_target.close()


# Carga de datos en la base de datos destino original
cursor_target = target_connection.cursor()
for index, row in transformed_data1.iterrows():
    # Insertar cada fila en la tabla de destino
    insert_query = "INSERT INTO comprasGeneral (nombreProveedor, total) VALUES (?,?);"
    cursor_target.execute(insert_query, tuple(row))
target_connection.commit()
cursor_target.close()

# Carga de datos en la segunda base de datos destino (clean_target_db_config)
cursor_clean_target = clean_target_connection.cursor()
for index, row in transformed_data1.iterrows():
    # Insertar cada fila en la tabla de destino
    insert_query = "INSERT INTO comprasGeneral (nombreProveedor, total) VALUES (?,?);"
    cursor_clean_target.execute(insert_query, tuple(row))
clean_target_connection.commit()
cursor_clean_target.close()

# Carga de datos en la base de datos destino original para query2
cursor_target = target_connection.cursor()
for index, row in transformed_data2.iterrows():
    # Insertar cada fila en la tabla de destino
    insert_query = "INSERT INTO topClientes (nombreCliente, total) VALUES (?,?);"
    cursor_target.execute(insert_query, row['Cliente'], row['Total_Vendido'])
target_connection.commit()
cursor_target.close()

# Carga de datos en la segunda base de datos destino (clean_target_db_config) para query2
cursor_clean_target = clean_target_connection.cursor()
for index, row in transformed_data2.iterrows():
    # Insertar cada fila en la tabla de destino
    insert_query = "INSERT INTO topClientes (nombreCliente, total) VALUES (?,?);"
    cursor_clean_target.execute(insert_query, row['Cliente'], row['Total_Vendido'])
clean_target_connection.commit()
cursor_clean_target.close()


cursor_target = target_connection.cursor()
for index, row in transformed_data3.iterrows():
    # Insertar cada fila en la tabla de destino
    insert_query = "INSERT INTO mejoresProductos (nombreProducto, totalVendido) VALUES (?,?);"
    cursor_target.execute(insert_query, row['receta'], row['cantidad_total'])
target_connection.commit()
cursor_target.close()

# Carga de datos en la segunda base de datos destino (clean_target_db_config) para query3
cursor_clean_target = clean_target_connection.cursor()
for index, row in transformed_data3.iterrows():
    # Insertar cada fila en la tabla de destino
    insert_query = "INSERT INTO mejoresProductos (nombreProducto, totalVendido) VALUES (?,?);"
    cursor_clean_target.execute(insert_query, row['receta'], row['cantidad_total'])
clean_target_connection.commit()
cursor_clean_target.close()

cursor_target = target_connection.cursor()
for index, row in transformed_data4.iterrows():
    # Insertar cada fila en la tabla de destino
    insert_query = "INSERT INTO utilidad (estatus, total) VALUES (?,?);"
    cursor_target.execute(insert_query, row['resultado'], row['total'])
target_connection.commit()
cursor_target.close()

# Carga de datos en la segunda base de datos destino (clean_target_db_config) para query3
cursor_clean_target = clean_target_connection.cursor()
for index, row in transformed_data4.iterrows():
    # Insertar cada fila en la tabla de destino
    insert_query = "INSERT INTO utilidad (estatus, total) VALUES (?,?);"
    cursor_clean_target.execute(insert_query, row['resultado'], row['total'])
clean_target_connection.commit()
cursor_clean_target.close()


# Cierra las conexiones
source_connection.close()
target_connection.close()
clean_target_connection.close()

print("Proceso ETL completado exitosamente.")



truncate_queries_sweetdreams = [
    "TRUNCATE TABLE comprasGeneral;",
    "TRUNCATE TABLE topClientes;",
    "TRUNCATE TABLE mejoresProductos;",
    "TRUNCATE TABLE utilidad;"
]



