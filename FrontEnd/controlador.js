import { getClientes, getClientesPorId, postClientes, putClientes, deleteClientes, getPedidos, getPedidosPorId, postPedidos, putPedidos , deletePedidos } from "./apicontrolador.js";

const fnVisualizarCliente = (objetoCliente) => {

    EstadoAplicacion.setClienteActivo(objetoCliente);
    
    document.getElementById('idClienteId').textContent = `ClienteID = ${objetoCliente.clienteid}`;
    idClienteNombre.value = objetoCliente.nombre;
    idClienteTel.value = objetoCliente.telefono;
    idClienteEstado.value = objetoCliente.estado;
    idClienteDetalles.value = objetoCliente.detalles;
    idClienteFecha.value = objetoCliente.fecharegistro;


}


const fnRecuperarCliente = () => {
    EstadoAplicacion.clienteActivo.nombre = idClienteNombre.value;
    EstadoAplicacion.clienteActivo.telefono = idClienteTel.value;
    EstadoAplicacion.clienteActivo.estado = idClienteEstado.value;
    EstadoAplicacion.clienteActivo.detalles = idClienteDetalles.value;
    EstadoAplicacion.clienteActivo.fecharegistro = idClienteFecha.value;
}

const EstadoAplicacion = 
    {
        clienteActivo:null,

        setClienteActivo(clientes)
        {
            this.clienteActivo = clientes;
        }
    }

const fnVisualizarPedidos = (objetoPedidos)=>
{
    console.log(objetoPedidos);
    EstadoAplicacionP.setPedidoActivo(objetoPedidos);

    idPedidoId.textContent = objetoPedidos.pedidoid;
    idClienteId1.value = objetoPedidos.clienteid;
    idViandaid.value = objetoPedidos.viandaid;
    idFechaPedido.value = objetoPedidos.fechapedido;
    idCantViandas.value = objetoPedidos.cantidad;
    idTotalFinal.value = objetoPedidos.total;
}

const fnRecuperarPedidos = () => {
    EstadoAplicacionP.pedidoActivo.clienteid = idClienteId1.value;
    EstadoAplicacionP.pedidoActivo.viandaid = idViandaid.value;
    EstadoAplicacionP.pedidoActivo.fechapedido = idFechaPedido.value;
    EstadoAplicacionP.pedidoActivo.cantidad = idCantViandas.value;
    EstadoAplicacionP.pedidoActivo.total = idTotalFinal.value;
}

const EstadoAplicacionP =
    {
        pedidoActivo:null,

        setPedidoActivo(pedidos)
        {
            this.pedidoActivo = pedidos;
        }
    }

window.addEventListener("load",()=>{

    const btnClientesget = document.querySelector("#btnClientesget");
    const idCuerpoDeTabla1 = document.querySelector("#idCuerpoDeTabla1");

    const txtClienteId = document.querySelector("#txtClienteId");
    const btnBuscarClientePorId = document.querySelector("#btnBuscarClientePorId");
    
    const idClienteId = document.querySelector("idClienteId");
    const idClienteNombre = document.querySelector("#idClienteNombre");
    const idClienteTel = document.querySelector("#idClienteTel");
    const idClienteEstado = document.querySelector("#idClienteEstado");
    const idClienteDetalles = document.querySelector("#idClienteDetalles");
    const idClienteFecha = document.querySelector("#idClienteFecha");

    const btnAgregarCliente = document.querySelector("#btnAgregarCliente");
    const btnNuevoCliente = document.querySelector("#btnNuevoCliente");
    const idBtnGuardarCambios = document.querySelector("#idBtnGuardarCambios");
    const idBtnEliminarCliente = document.querySelector("#idBtnEliminarCliente");

    const btnPedidosGet = document.querySelector("#btnPedidosGet");
    const idCuerpoDeTabla2 = document.querySelector("#idCuerpoDeTabla2");

    const txtPedidoid = document.querySelector("#txtPedidoid")
    const btnBuscarPedidoPorId = document.querySelector("#btnBuscarPedidoPorId")

    const idPedidoId = document.querySelector("#idPedidoId");
    const idClienteId1 = document.querySelector("#idClienteId1");
    const idViandaid = document.querySelector("#idViandaid");
    const idFechaPedido = document.querySelector("#idFechaPedido")
    const idCantViandas = document.querySelector("#idCantViandas");
    const idTotalFinal = document.querySelector("#idTotalFinal");

    const btnAgregarPedido = document.querySelector("#btnAgregarPedido");
    const btnNuevoPedido = document.querySelector("#btnNuevoPedido");
    const idBtnGuardarCambios2 = document.querySelector("#idBtnGuardarCambios2");
    const btnEliminarPedido = document.querySelector("#btnEliminarPedido");
    
    btnClientesget.addEventListener("click",async () => {
        
        let resultadoAPI = await getClientes();

        if(resultadoAPI.result_estado === 'ok')
        {
            resultadoAPI.result_data.forEach(element => {
                console.log(element);

                let Fila = document.createElement("tr");

                
                let celda1 = document.createElement("td");
                celda1.textContent = element.clienteid;

                let celda2 = document.createElement("td");
                celda2.textContent = element.nombre;

                let celda3 = document.createElement("td");
                celda3.textContent = element.telefono;

                let celda4 = document.createElement("td");
                celda4.textContent = element.estado;

                let celda5 = document.createElement("td");
                celda5.textContent = element.detalles;

                let celda6 = document.createElement("td");
                let fechaFormateada = new Date(element.fecharegistro).toISOString().split('T')[0];
              /*  celda6.textContent = element.fecharegistro; */
                celda6.textContent = fechaFormateada;

                let celda7 = document.createElement("input");
                celda7.type = "button";
                celda7.value = "Seleccionar";
                celda7.addEventListener("click",()=>{

                    fnVisualizarCliente(element);

                })


                Fila.appendChild(celda1);
                Fila.appendChild(celda2);
                Fila.appendChild(celda3);
                Fila.appendChild(celda4);
                Fila.appendChild(celda5);
                Fila.appendChild(celda6);
                Fila.appendChild(celda7);

                idCuerpoDeTabla1.appendChild(Fila);

            });
        }
        else
        {
            alert(`Hubo un problema al intentar realizar la consulta ${resultadoAPI.result_message}`);
        }
    })

    btnBuscarClientePorId.addEventListener("click",async ()=>
        {
            let clienteid = Number(txtClienteId.value);
            if(clienteid > 0)
            {
                let resultadoAPI = await getClientesPorId(clienteid);

                if(resultadoAPI.result_estado === 'ok')
                {  
                    console.log(resultadoAPI.result_data);

                    fnVisualizarCliente(resultadoAPI.result_data);
                }
                else
                {
                    alert(`Hubo un problema al intentar realizar la consulta ${resultadoAPI.result_message}`);
                }
            }
            else
            {
                alert("por favor ingrese el (id) a buscar");
            }
        })

        /* Boton para agregar un cliente */
        btnAgregarCliente.addEventListener("click",async ()=>{

            /* creo un objeto literal que tenga los atributos
            que necesito enviar para dar de alta */
    
            let NuevoCliente =
                {
                    nombre:idClienteNombre.value,
                    telefono:idClienteTel.value,
                    estado:idClienteEstado.value,
                    detalles:idClienteDetalles.value,
                    fecharegistro:idClienteFecha.value
                }
    
            console.log(NuevoCliente);     
    
            /* convierto a ese objeto en formato JSON */
            let NuevoClienteJSON = JSON.stringify(NuevoCliente);
    
            let resultadoAPI = await postClientes(NuevoClienteJSON);
    
            console.log(resultadoAPI);
    
        })

        btnNuevoCliente.addEventListener("click", () => {
            let clienteNuevo = {
                clienteid:0,
                nombre:"",
                telefono:"",
                estado:"",
                detalles:"",
                fecharegistro:""
            }
    
            fnVisualizarCliente(clienteNuevo);
        });

        idBtnGuardarCambios.addEventListener("click", async () => {
            fnRecuperarCliente();
    
            if (EstadoAplicacion.clienteActivo.clienteid === 0) {
                let resultadoAPI = await postClientes(EstadoAplicacion.clienteActivo);
                if (resultadoAPI.result_estado === 'ok') {
                    alert("Cliente agregado");
                } else {
                    alert(`Hubo un problema al intentar realizar la consulta ${resultadoAPI.result_message}`);
                }
            } else {
    
                let resultadoAPI = await putClientes(EstadoAplicacion.clienteActivo);
    
                if (resultadoAPI.result_estado === 'ok') {
                    alert("Cliente modificado");
                } else {
                    alert(`Hubo un problema al intentar realizar la consulta ${resultadoAPI.result_message}`);
                }
            }
        });

        idBtnEliminarCliente.addEventListener("click", async () => {
            const clienteActivo = EstadoAplicacion.clienteActivo; // Obtener el cliente activo
        
            if (clienteActivo) {
                const resultadoAPI = await deleteClientes(clienteActivo.clienteid); // Llama a deleteClientes
                if (resultadoAPI.result_estado === 'ok') {
                    alert("Cliente eliminado exitosamente");
                    // Aquí puedes llamar a una función para recargar la lista de clientes, si es necesario
                    EstadoAplicacion.setClienteActivo(null); // Reinicia clienteActivo después de la eliminación
                    // Puedes agregar aquí una función para recargar la lista de clientes si es necesario
                } else {
                    alert(`Error: ${resultadoAPI.result_message}`);
                }
            } else {
                alert("Seleccione un cliente para eliminar");
            }
        });
        
/////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
/*PEDIDOS*/

btnPedidosGet.addEventListener("click", async () => {
    
let resultadoAPI = await getPedidos();

    if (resultadoAPI.result_estado === 'ok') {
        resultadoAPI.result_data.forEach(element => {
            console.log(element);

            let Fila = document.createElement("tr");

            let celda1 = document.createElement("td");
            celda1.textContent = element.pedidoid;

            let celda2 = document.createElement("td");
            celda2.textContent = element.clienteid;

            let celda3 = document.createElement("td");
            celda3.textContent = element.nombrecliente;

            let celda4 = document.createElement("td");
            celda4.textContent = element.viandaid;

            let celda5 = document.createElement("td");
            celda5.textContent = element.nombrevianda;

            let celda6 = document.createElement("td");
            let fechaFormateada = new Date(element.fechapedido).toISOString().split('T')[0];
            celda6.textContent = fechaFormateada;

            let celda7 = document.createElement("td");
            celda7.textContent = element.cantidad;

            let celda8 = document.createElement("td");
            celda8.textContent = element.total;

            let celda9 = document.createElement("input");
            celda9.type = "button";
            celda9.value = "Seleccionar";
            celda9.addEventListener("click",()=>{

                fnVisualizarPedidos(element);

            })

            Fila.appendChild(celda1);
            Fila.appendChild(celda2);
            Fila.appendChild(celda3);
            Fila.appendChild(celda4);
            Fila.appendChild(celda5);
            Fila.appendChild(celda6);
            Fila.appendChild(celda7);
            Fila.appendChild(celda8);
            Fila.appendChild(celda9);

            idCuerpoDeTabla2.appendChild(Fila);
        })
    } else {
        alert(`Hubo un problema al intentar realizar la consulta ${resultadoAPI.result_message}`);
    }

})

btnBuscarPedidoPorId.addEventListener("click", async () => {
    let pedidoid = Number(txtPedidoid.value);

    if (pedidoid > 0) {
        let resultadoAPI = await getPedidosPorId(pedidoid);

        if (resultadoAPI.result_estado === 'ok') {
            console.log(resultadoAPI.result_data);

            // Asegúrate de que resultadoAPI.result_data es un array y tiene elementos
            if (resultadoAPI.result_data.length > 0) {
                fnVisualizarPedidos(resultadoAPI.result_data[0]); // Accede al primer elemento
            } else {
                alert("Pedido no encontrado."); // Mensaje si no hay resultados
            }
        } else {
            alert(`Hubo un problema al intentar realizar la consulta: ${resultadoAPI.result_message}`);
        }
    } else {
        alert("Por favor, ingrese el ID a buscar.");
    }
});


btnAgregarPedido.addEventListener("click", async () => {
    
    let NuevoPedido =
        {
            pedidoid:idPedidoId.value,
            clienteid:idClienteId1.value,
            viandaid:idViandaid.value,
            fechapedido:idFechaPedido.value,
            cantidad:idCantViandas.value,
            total:idTotalFinal.value
        }

        console.log(NuevoPedido); // Verifica que todos los valores son correctos

        // Asegúrate de que el pedido está correctamente formateado antes de enviarlo
        let resultadoAPI = await postPedidos(NuevoPedido);
    
        console.log(resultadoAPI);
})

btnNuevoPedido.addEventListener("click", ()=>{
    let pedidoNuevo = {
        pedidoid:0,
        clienteid:0,
        viandaid:0,
        fechapedido:"",
        cantidad:0,
        total:0,

    }

    fnVisualizarPedidos(pedidoNuevo);
})

idBtnGuardarCambios2.addEventListener("click", async () => {
    fnRecuperarPedidos();

    if(EstadoAplicacionP.pedidoActivo.pedidoid === 0)
    {
        let resultadoAPI = await postPedidos(EstadoAplicacionP.pedidoActivo);
        if (resultadoAPI.result_estado === 'ok'){
            alert("Pedido Agregado");
        } else {
            alert(`Hubo un problema al intentar realizar la consulta ${resultadoAPI.result_message}`); 
        }
    } else {
        let resultadoAPI = await putPedidos(EstadoAplicacionP.pedidoActivo);

        if (resultadoAPI.result_estado === 'ok') {
            alert("Cliente modificado");
        } else {
            alert(`Hubo un problema al intentar realizar la consulta ${resultadoAPI.result_message}`);
        }
    }
});

btnEliminarPedido.addEventListener("click", async () => {
    const pedidoActivo = EstadoAplicacionP.pedidoActivo;

    if (pedidoActivo) {
        const resultadoAPI = await deletePedidos(pedidoActivo.pedidoid);
        if (resultadoAPI.result_estado === 'ok') {
            alert("Pedido eliminado exitosamente");

            EstadoAplicacionP.setPedidoActivo(null);
        } else {
            alert(`Error: ${resultadoAPI.result_message}`);
        }
    } else {
        alert("Seleccione un cliente para eliminar");
    }
})

})