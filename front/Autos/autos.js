document.addEventListener('DOMContentLoaded', () => {
    // URL de la API
    const BASE_URL = "http://127.0.0.1:3000";
    const apiUrl = '/vehiculos-all'; // Reemplaza con la URL correcta de tu API

    // Obtener la lista donde mostraremos los resultados
    

    fetch(BASE_URL+apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener el cuerpo de la tabla
        const tablaCuerpo = document.getElementById('vehiculos-tbody');

        // Iterar sobre los resultados y agregarlos a la tabla
        data.forEach(resultado => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${resultado.marca}</td>
                <td>${resultado.anio}</td>
                <td>${resultado.placa}</td>
            `;
            tablaCuerpo.appendChild(fila);
        });
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
    const formulario = document.getElementById('vehiculo-form');

    formulario.addEventListener('submit', event => {
        event.preventDefault();

        const placa = document.getElementById('placa').value;
        const marca = document.getElementById('marca').value;
        const anio = parseInt(document.getElementById('anio').value);
        const modelo_id = parseInt(document.getElementById('modelo_id').value);

        const data = {
            placa: placa,
            marca: marca,
            anio: anio,
            modelo_id: modelo_id
        };

        // Enviar los datos al backend
        fetch(BASE_URL+'/vehiculos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(resultado => {
            console.log('Vehículo insertado:', resultado);
            // Puedes hacer algo con el resultado, como mostrar un mensaje de éxito
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    });
});


