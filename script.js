document.addEventListener('DOMContentLoaded', () => {
    // URL de la API
    const BASE_URL = "http://127.0.0.1:3000";
    const apiUrl = '/vehiculos_menores_anio/2010'; // Reemplaza con la URL correcta de tu API

    // Obtener la lista donde mostraremos los resultados
    

    fetch(BASE_URL+apiUrl)
    .then(response => response.json())
    .then(data => {
        // Obtener el cuerpo de la tabla
        const tablaCuerpo = document.getElementById('tabla-cuerpo');

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
});
