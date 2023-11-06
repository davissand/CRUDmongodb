
const BASE_URL = "http://127.0.0.1:3000";
const apiUrl = '/clientes-all'; // Reemplaza con la URL correcta de tu API

function eliminarCliente(id) {
    // Realizar una solicitud DELETE al endpoint del backend para eliminar el cliente por su ID
    fetch(BASE_URL+`/clientes/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(resultado => {
        console.log('Cliente eliminado:', resultado);
        // Volver a cargar la lista de clientes después de eliminar uno
        cargarClientes();
    })
    .catch(error => console.error('Error al eliminar cliente:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    // URL de la API


    // Obtener la lista donde mostraremos los resultados
    cargarClientes();

    // Función para eliminar un cliente

function cargarClientes(){
    fetch(BASE_URL+apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener el cuerpo de la tabla
        const tablaCuerpo = document.getElementById('clientes-tbody');

        tablaCuerpo.innerHTML="";
        // Iterar sobre los resultados y agregarlos a la tabla
        data.forEach(resultado => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${resultado.dui}</td>
                <td>${resultado.nombre}</td>
                <td>${resultado.telefono}</td>
                <td>${resultado.direccion}</td>
                <td>
                        <button class="btn btn-danger" onclick="eliminarCliente('${resultado._id}')">Eliminar</button>
                    </td>
            `;
            tablaCuerpo.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}

    const formulario = document.getElementById('cliente-form');
    formulario.addEventListener('submit', event => {
        event.preventDefault();

        const dui = document.getElementById('dui').value;
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;

        const data = {
            dui: dui,
            nombre: nombre,
            telefono: telefono,
            direccion: direccion
        };

        // Enviar los datos al backend
        fetch(BASE_URL+'/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(resultado => {
            console.log('Persona insertada:', resultado);
            cargarClientes();
            // Puedes hacer algo con el resultado, como mostrar un mensaje de éxito
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    });
});


