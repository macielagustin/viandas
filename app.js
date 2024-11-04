console.log("Bienvenidos");

/* importo la clase express */
const ClaseExpress = require('express');

/* importo la biblioteca de postgre */

const { Pool } = require('pg'); // Importar Pool para conectar con PostgreSQL

/* creo una instancia de la clase express para poder
configurar y trabajar con el servidor */

const ServidorWeb = ClaseExpress();

/* configuro el puerto donde escuchará la aplicación web */

const PORT = 3000;

/* Middleware para manejar JSON en las peticiones */

ServidorWeb.use(ClaseExpress.json());

// Procesa cuerpos de solicitudes en formato 'text/plain'
ServidorWeb.use(ClaseExpress.text());

// Procesa cuerpos de solicitudes URL-encoded (formularios HTML)
ServidorWeb.use(ClaseExpress.urlencoded({ extended: false }));

// Sirve archivos estáticos (HTML, CSS, JS, imágenes)
ServidorWeb.use(ClaseExpress.static("FrontEnd"));

// Configurar la conexión a PostgreSQL
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

/* Configurar la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',        // Usuario de PostgreSQL
    host: 'localhost',        // Dirección del servidor
    database: 'dbclientes',   // Nombre de la base de datos
    password: '12345678',     // Contraseña del usuario de PostgreSQL
    port: 5432,               // Puerto de PostgreSQL (por defecto es 5432)
});

*/

ServidorWeb.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API de Viandas!');
});

// Definir una ruta para obtener todos los clientes
ServidorWeb.get('/clientes', async (req, res) => {
   try {
        const sentenciaSQL =
       `
            SELECT * FROM clientes                
       `; 
       const resultado = await pool.query(sentenciaSQL);
       
       Salida =
       {
           result_estado: 'ok',
           result_message: 'clientes recuperados',
           result_rows: resultado.rowCount,
           result_verbo: 'get',
           result_proceso: '/clientes',
           result_data: resultado.rows
       }

   } catch (error) {
    
    Salida =
    {
        result_estado: 'error',
        result_message: error.message,
        result_rows: 0,
        result_verbo: 'get',
        result_proceso: '/clientes',
        result_data: ''
    }
   }

   res.json(Salida);
});

ServidorWeb.get('/clientes/:clienteid', async (req,res) => {
 try {
    const clienteid = req.params.clienteid;

    const sentenciaSQL =
    `
         SELECT * FROM clientes
         WHERE clienteid = $1             
    `; 

    const resultado = await pool.query(sentenciaSQL, [clienteid]);

    Salida =
    {
        result_estado: 'ok',
        result_message: 'clientes recuperados',
        result_rows: resultado.rowCount,
        result_verbo: 'get',
        result_proceso: '/clientes/:clienteid',
        result_data: resultado.rows[0]
    }

 } catch (error) {
    Salida =
    {
        result_estado: 'error',
        result_message: error.message,
        result_rows: 0,
        result_verbo: 'get',
        result_proceso: '/clientes/pornombre',
        result_data: ''
    }
 }  
 
 res.json(Salida);
});

ServidorWeb.get('/clientes/n/pornombre', async (req,res) => {
    try {
        const clientenombre = req.query.nombre; 
        
        const sentenciaSQL =
        `
             SELECT * FROM clientes
             WHERE nombre Ilike $1            
        `; 

        const resultado = await pool.query(sentenciaSQL, [`%${clientenombre}%`]);

        Salida =
        {
            result_estado: 'ok',
            result_message: 'clientes recuperados',
            result_rows: resultado.rowCount,
            result_verbo: 'get',
            result_proceso: '/clientes/pornombre',
            result_data: resultado.rows
        }
    } catch (error) {
        Salida =
        {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'get',
            result_proceso: '/clientes',
            result_data: ''
        }
    }

    res.json(Salida);
});

ServidorWeb.post('/clientes/', async (req,res) => {
    try {
        const { nombre, telefono, estado, fecharegistro, detalles} = req.body;

        const sentenciaSQL = 
        `           
            INSERT INTO clientes (nombre, telefono, estado, fecharegistro,detalles) values ($1,$2,$3,$4,$5) returning *
        `;

        const resultado = await pool.query(sentenciaSQL,[ nombre, telefono, estado, fecharegistro, detalles]);
   
        Salida =
        {
            result_estado: 'ok', // decimos que todo salio ok
            result_message: 'cliente agregado correctamente', // mensaje que devolveremos al front end
            result_rows: resultado.rowCount, // indicamos la cantidad de registros afectados,
            result_verbo: 'post',
            result_proceso: '/clientes/', // información importante para saber que end point esta ejecutando el proceso
            result_data: resultado.rows[0] // devolvemos del vector únicamente el primer elememnto
        }
   
    } catch (error) {
        Salida =
        {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'post',
            result_proceso: '/clientes/',
            result_data: ''
        } 
    }

    res.json(Salida);
});

ServidorWeb.put('/clientes/:clienteid', async (req,res) => {
    try {
        const clienteid = req.params.clienteid;

        console.log("este es el cliente a acutalizar, clienteid ", clienteid);

        const { nombre, telefono, estado, fecharegistro, detalles} = req.body;

        const sentenciaSQL =
        `
                    UPDATE clientes
                        Set 
                            nombre = $2,
                            telefono = $3,
                            estado = $4,
                            fecharegistro = $5,
                            detalles = $6
                                WHERE clienteid = $1
                                    returning*
        `;

        const resultado = await pool.query(sentenciaSQL,[clienteid ,nombre, telefono, estado, fecharegistro, detalles]);
    
        Salida =
        {
            result_estado: 'ok', // decimos que todo salio ok
            result_message: 'cliente modificado correctamente', // mensaje que devolveremos al front end
            result_rows: resultado.rowCount, // indicamos la cantidad de registros afectados
            result_verbo: 'put',
            result_proceso: '/clientes/:clienteid', // información importante para saber que end point esta ejecutando el proceso
            result_data: resultado.rows[0] // devolvemos del vector únicamente el primer elememnto
        }
    } catch (error) {
        Salida =
        {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'put',
            result_proceso: '/clientes/:clienteid',
            result_data: ''
        }
    }

    res.json(Salida);
});

ServidorWeb.delete('/clientes/:clienteid', async (req, res) => {
    try {
        /* hacemos destructuring del objeto que viene en formato JSON 
        y lo separamos, atributo x atributo const */

        /* obtenemos de los parametros el clienteid que viene desde los parametros*/
        const clienteid = req.params.clienteid;

        /* armamos la sentencia sql parametrizada y no nos olvidamos de poner la palabra returning * que significa
        que devolverá los datos agregados tal como quedaron posteriormente a la inserción */

        const sentenciaSQL =
            `
                               delete from clientes where clienteid = $1 returning *
                            `;

        /* a la sentencia sql del paso anterior, la ejecutamos y pasamos como parametro
        los datos que obtuvimos desde el body, en el orden que correspondan y la ejecutamos */

        const resultado = await pool.query(sentenciaSQL, [clienteid]);

        /* si todo salió bien armamos un objeto literal con los resultados obtenidos */
        Salida =
        {
            result_estado: 'ok', // decimos que todo salio ok
            result_message: 'cliente eliminado correctamente', // mensaje que devolveremos al front end
            result_rows: resultado.rowCount, // indicamos la cantidad de registros afectados
            result_verbo: 'delete',
            result_proceso: '/clientes/:clienteid', // información importante para saber que end point esta ejecutando el proceso
            result_data: resultado.rows[0] // devolvemos del vector únicamente el primer elememnto
        }
    }
    catch (error) {
        /* Si algo salió mal en el proceso de ejecución de la consulta, 
        creamos un objeto literal y devolvemos el mensaje de error */

        Salida =
        {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'delete',
            result_proceso: '/clientes/:clienteid',
            result_data: ''
        }
    }

    res.json(Salida);
});


ServidorWeb.get('/pedidos', async (req, res) => {
    try {
        const sentenciaSQL = 
        `
             SELECT p.pedidoid, p.clienteid, c.nombre AS nombrecliente, p.viandaid, v.nombrevianda, p.fechapedido, p.cantidad, p.total
            FROM pedidos p
            INNER JOIN Clientes c ON p.clienteid = c.clienteid
            INNER JOIN Viandas v ON p.viandaid = v.viandaid
        `;

        const resultado = await pool.query(sentenciaSQL);

        Salida =
        {
            result_estado: 'ok',
            result_message: 'pedidos recuperados',
            result_rows: resultado.rowCount,
            result_verbo: 'get',
            result_proceso: '/cliente',
            result_data: resultado.rows
        }
    } catch (error) {
        Salida =
        {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'get',
            result_proceso: '/pedidos',
            result_data: ''
        }
    }

    res.json(Salida);
})

ServidorWeb.get('/pedidos/:pedidoid', async (req,res) => {
    try {
        const pedidoid = req.params.pedidoid;

        const sentenciaSQL = 
        `
            SELECT p.pedidoid, p.clienteid, c.nombre AS nombrecliente, p.viandaid, v.nombrevianda, p.fechapedido, p.cantidad, p.total
            FROM pedidos p
            INNER JOIN clientes c ON p.clienteid = c.clienteid
            INNER JOIN viandas v ON p.viandaid = v.viandaid
            WHERE p.pedidoid = $1
        `;

        const resultado = await pool.query(sentenciaSQL, [pedidoid]);

        Salida =
        {
            result_estado: 'ok',
            result_message: 'pedidos recuperados',
            result_rows: resultado.rowCount,
            result_verbo: 'get',
            result_proceso: '/cliente',
            result_data: resultado.rows
        }
    } catch (error) {
        Salida =
        {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'get',
            result_proceso: '/pedidos',
            result_data: ''
        }
    }

    res.json(Salida);
})

ServidorWeb.post('/pedidos/', async (req, res) => {
    try {
        // Extraemos los datos del cuerpo de la petición
        const { clienteid, viandaid, fechapedido, cantidad, total } = req.body;

        // Preparamos la sentencia SQL para insertar un nuevo pedido
        const sentenciaSQL = `
            INSERT INTO pedidos (clienteid, viandaid, fechapedido, cantidad, total) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
        `;

        // Ejecutamos la consulta SQL con los valores recibidos
        const resultado = await pool.query(sentenciaSQL, [clienteid, viandaid, fechapedido, cantidad, total]);

        // Devolvemos una respuesta exitosa
        Salida = {
            result_estado: 'ok',
            result_message: 'Pedido agregado correctamente',
            result_rows: resultado.rowCount,
            result_verbo: 'post',
            result_proceso: '/pedidos/',
            result_data: resultado.rows
        };
    } catch (error) {
        // Capturamos cualquier error y lo devolvemos
        Salida = {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'post',
            result_proceso: '/pedidos/',
            result_data: ''
        };
    }

    // Enviamos la respuesta
    res.json(Salida);
});

ServidorWeb.put('/pedidos/:pedidoid', async (req, res) => {
    try {
        // Extraemos el pedidoid de los parámetros de la URL
        const { pedidoid } = req.params;
        // Extraemos los demás datos del cuerpo de la petición
        const { clienteid, viandaid, fechapedido, cantidad, total } = req.body;

        // Preparamos la sentencia SQL para actualizar el pedido
        const sentenciaSQL = `
            UPDATE pedidos 
            SET clienteid = $1, viandaid = $2, fechapedido = $3, cantidad = $4, total = $5 
            WHERE pedidoid = $6 
            RETURNING *;
        `;

        // Ejecutamos la consulta SQL con los valores recibidos
        const resultado = await pool.query(sentenciaSQL, [clienteid, viandaid, fechapedido, cantidad, total, pedidoid]);

        // Devolvemos una respuesta exitosa
        Salida = {
            result_estado: 'ok',
            result_message: 'Pedido actualizado correctamente',
            result_rows: resultado.rowCount,
            result_verbo: 'put',
            result_proceso: `/pedidos/${pedidoid}`,
            result_data: resultado.rows
        };
    } catch (error) {
        // Capturamos cualquier error y lo devolvemos
        Salida = {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'put',
            result_proceso: `/pedidos/${pedidoid}`,
            result_data: ''
        };
    }

    // Enviamos la respuesta
    res.json(Salida);
});

ServidorWeb.delete('/pedidos/:pedidoid', async (req,res) => {
    try {
        const pedidoid = req.params.pedidoid;

        const sentenciaSQL =
        `
            DELETE FROM pedidos where pedidoid = $1 returning*
        `;

        const resultado = await pool.query(sentenciaSQL, [pedidoid]);

        Salida =
        {
            result_estado: 'ok', // decimos que todo salio ok
            result_message: 'pedido eliminado correctamente', // mensaje que devolveremos al front end
            result_rows: resultado.rowCount, // indicamos la cantidad de registros afectados
            result_verbo: 'delete',
            result_proceso: '/pedidos/:pedidoid', // información importante para saber que end point esta ejecutando el proceso
            result_data: resultado.rows[0] // devolvemos del vector únicamente el primer elememnto
        }
    } catch (error) {
        Salida =
        {
            result_estado: 'error',
            result_message: error.message,
            result_rows: 0,
            result_verbo: 'delete',
            result_proceso: 'pedidos/:pedidoid',
            result_data: ''
        }
    }
    res.json(Salida);
})
/*************************************************************************************************/
/*************************************************************************************************/
/*************************************** ARRANCAMOS LA APLICACION  *******************************/
/*************************************************************************************************/
/*************************************************************************************************/

// Iniciar el servidor en el puerto 3000
ServidorWeb.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});