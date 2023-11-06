const BASE_URL = "http://127.0.0.1:3000";
const apiUrl = "/vehiculos_menores_anio/2010"; // Reemplaza con la URL correcta de tu API

document.addEventListener("DOMContentLoaded", () => {
  // URL de la API

  // Obtener la lista donde mostraremos los resultados

  fetch(BASE_URL + apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Obtener el cuerpo de la tabla
      const tablaCuerpo = document.getElementById("vehiculosmenores-cuerpo");

      // Iterar sobre los resultados y agregarlos a la tabla
      data.forEach((resultado) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${resultado.marca}</td>
                <td>${resultado.anio}</td>
                <td>${resultado.placa}</td>
            `;
        tablaCuerpo.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });

  cargarVehiculosMayores();
  cargarClientessinautos();
  cargarClientesautos();
  cargarVehiculosModelo();
  cargarClientesZona();
  cargarVehiculosZona();
});

function cargarVehiculosMayores(fecha = "2010") {
  fetch(BASE_URL + "/vehiculos_mayores_anio/" + fecha)
    .then((response) => response.json())
    .then((data) => {
      // Obtener el cuerpo de la tabla
      const tablaCuerpo = document.getElementById("vehiculosmayores-cuerpo");
      tablaCuerpo.innerHTML = "";
      // Iterar sobre los resultados y agregarlos a la tabla
      data.forEach((resultado) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${resultado.marca}</td>
                <td>${resultado.anio}</td>
                <td>${resultado.placa}</td>
            `;
        tablaCuerpo.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}

function cargarVehiculosModelo(modelo = "1") {
  fetch(BASE_URL + "/vehiculos_modelo/" + modelo)
    .then((response) => response.json())
    .then((data) => {
      // Obtener el cuerpo de la tabla
      const tablaCuerpo = document.getElementById("vehiculosmodelo-cuerpo");
      tablaCuerpo.innerHTML = "";
      // Iterar sobre los resultados y agregarlos a la tabla
      data.forEach((resultado) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <td>${resultado.marca}</td>
                    <td>${resultado.anio}</td>
                    <td>${resultado.placa}</td>
                `;
        tablaCuerpo.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}

function cargarVehiculosZona(zona = "San Rafael Cedros") {
  fetch(BASE_URL + "/vehiculo_zona/" + zona)
    .then((response) => response.json())
    .then((data) => {
      // Obtener el cuerpo de la tabla
      const tablaCuerpo = document.getElementById("vehiculoZona-cuerpo");
      tablaCuerpo.innerHTML = "";
      // Iterar sobre los resultados y agregarlos a la tabla
      data.forEach((resultado) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                        <td>${resultado.dui}</td>
                        <td>${resultado.nombre}</td>
                        <td>${resultado.direccion}</td>
                        <td>${resultado.vehiculo_info[0].marca}</td>
                        <td>${resultado.modelo_info[0].marca}</td>
                    `;
        tablaCuerpo.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}

const btnMayores = document.getElementById("btnMayores");
btnMayores.addEventListener("click", () => {
  const inputMayores = document.getElementById("anioMayores");
  var value = inputMayores.value;
  console.log(value);
  cargarVehiculosMayores(value);
});

const btnModelo = document.getElementById("btnModelo");
btnModelo.addEventListener("click", () => {
  const inputZona = document.getElementById("zonaCliente");
  var value = inputZona.value;
  console.log(value);
  cargarVehiculosModelo(value);
});

const btnZona = document.getElementById("btnZonaCliente");
btnZona.addEventListener("click", () => {
  const inputZona = document.getElementById("zonaCliente");
  var value = inputZona.value;
  console.log(value);
  cargarClientesZona(value);
});

const btnVehiculoZona = document.getElementById("btnvehiculoZona");
btnVehiculoZona.addEventListener("click", () => {
  const inputZona = document.getElementById("vehiculoZona");
  var value = inputZona.value;
  console.log(value);
  cargarVehiculosZona(value);
});
function cargarClientessinautos() {
  fetch(BASE_URL + "/clientes-sin-autos")
    .then((response) => response.json())
    .then((data) => {
      // Obtener el cuerpo de la tabla
      const tablaCuerpo = document.getElementById("clientessinautos-cuerpo");
      tablaCuerpo.innerHTML = "";
      // Iterar sobre los resultados y agregarlos a la tabla
      data.forEach((resultado) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${resultado.dui}</td>
                <td>${resultado.nombre}</td>
                <td>${resultado.direccion}</td>
            `;
        tablaCuerpo.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}

function cargarClientesZona(zona = "San Rafael Cedros") {
  fetch(BASE_URL + "/clientes_zona/" + zona)
    .then((response) => response.json())
    .then((data) => {
      // Obtener el cuerpo de la tabla
      const tablaCuerpo = document.getElementById("clienteszona-cuerpo");
      tablaCuerpo.innerHTML = "";
      // Iterar sobre los resultados y agregarlos a la tabla
      data.forEach((resultado) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                    <td>${resultado.dui}</td>
                    <td>${resultado.nombre}</td>
                    <td>${resultado.direccion}</td>
                `;
        tablaCuerpo.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}
function cargarClientesautos() {
  fetch(BASE_URL + "/clientes-autos")
    .then((response) => response.json())
    .then((data) => {
      // Obtener el cuerpo de la tabla
      const tablaCuerpo = document.getElementById("clientesautos-cuerpo");
      tablaCuerpo.innerHTML = "";
      // Iterar sobre los resultados y agregarlos a la tabla
      data.forEach((resultado) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${resultado.dui}</td>
                <td>${resultado.nombre}</td>
                <td>${resultado.direccion}</td>
            `;
        tablaCuerpo.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}
