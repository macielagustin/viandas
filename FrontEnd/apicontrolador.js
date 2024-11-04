const endPointClientes = 'http://localhost:3000/clientes/';
const endPointPedidos = 'http://localhost:3000/pedidos/';

export async function getClientes() {
    try {
        // realizo la consulta al end point correspondiente //
        const respuestaEndPoint = await fetch(endPointClientes);

        // convierto los datos de la respuesta a formato JSON //
        const datosEnFormatoJSON = await respuestaEndPoint.json();

        // Si todo salió bien. retorno los datos
        return datosEnFormatoJSON;

    } catch (error) {

        console.log(error);

        return { result_estado: 'error', result_message: error.message };
    }
}

export async function getClientesPorId(clienteid) {
    try {
        // realizo la consulta al end point correspondiente //
        const respuestaEndPoint = await fetch(endPointClientes + clienteid);

        // convierto los datos de la respuesta a formato JSON //
        const datosEnFormatoJSON = await respuestaEndPoint.json();

        // Si todo salió bien. retorno los datos
        return datosEnFormatoJSON;

    } catch (error) {

        console.log(error);

        return { result_estado: 'error', result_message: error.message };
    }
}

export async function postClientes(clientes) {
    try {
        const respuestaEndPoint = await fetch(endPointClientes, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: clientes // Aquí no es necesario convertir de nuevo, ya es JSON
        });
        const datosEnFormatoJSON = await respuestaEndPoint.json();
        return datosEnFormatoJSON;
    } catch (error) {
        console.log(error);
        return { result_estado: 'error', result_message: error.message };
    }
}


export async function putClientes(cliente) {
    try {
        const respuestaEndPoint = await fetch(`${endPointClientes}${cliente.clienteid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });

        // Verificamos si la respuesta es correcta
        if (!respuestaEndPoint.ok) {
            const errorTexto = await respuestaEndPoint.text(); // Obtener el texto de la respuesta
            throw new Error(`Error en la solicitud: ${respuestaEndPoint.status} ${respuestaEndPoint.statusText}. Respuesta: ${errorTexto}`);
        }

        const datosEnFormatoJSON = await respuestaEndPoint.json();
        return datosEnFormatoJSON;

    } catch (error) {
        console.log(error);
        return { result_estado: 'error', result_message: error.message };
    }
}

export async function deleteClientes(clienteid) {
    try {
        const respuestaEndPoint = await fetch(endPointClientes + clienteid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Retorna la respuesta en formato JSON
        return await respuestaEndPoint.json();
    } catch (error) {
        console.log(error);
        return { result_estado: 'error', result_message: error.message };
    }
}



export async function getPedidos() {
    try {
        // realizo la consulta al end point correspondiente //
        const respuestaEndPoint = await fetch(endPointPedidos);

        // convierto los datos de la respuesta a formato JSON //
        const datosEnFormatoJSON = await respuestaEndPoint.json();

        // Si todo salió bien. retorno los datos
        return datosEnFormatoJSON;
    } catch (error) {
        console.log(error);

        return { result_estado: 'error', result_message: error.message };
    }
}

export async function getPedidosPorId(pedidoid) {
    try {
        // realizo la consulta al end point correspondiente //
        const respuestaEndPoint = await fetch(endPointPedidos+pedidoid);

        // convierto los datos de la respuesta a formato JSON //
        const datosEnFormatoJSON = await respuestaEndPoint.json();

        // Si todo salió bien. retorno los datos
        return datosEnFormatoJSON;

    } catch (error) {
    
        console.log(error);

        return { result_estado: 'error', result_message: error.message };
    }
    
}

export async function postPedidos(pedidos) {
    try {
        const respuestaEndPoint = await fetch(endPointPedidos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidos) // Convertimos el objeto a JSON
        });

        const datosEnFormatoJSON = await respuestaEndPoint.json();
        return datosEnFormatoJSON;
    } catch (error) {
        console.error(error); // Cambia log a console.error para mayor claridad
        return { result_estado: 'error', result_message: error.message };
    }
}


export async function putPedidos(pedidos) {
    try {
        const respuestaEndPoint = await fetch(endPointPedidos + pedidos.pedidoid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidos) // Convertimos el objeto a JSON
        });
        const datosEnFormatoJSON = await respuestaEndPoint.json();
        return datosEnFormatoJSON;
    } catch (error) {
        console.log(error);
        return { result_estado: 'error', result_message: error.message };
    }
}

export async function deletePedidos(pedidoid) {
    try {
        const respuestaEndPoint = await fetch(endPointPedidos + pedidoid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Retorna la respuesta en formato JSON
        return await respuestaEndPoint.json();
    } catch (error) {
        console.log(error);
        return { result_estado: 'error', result_message: error.message };
    }
}
