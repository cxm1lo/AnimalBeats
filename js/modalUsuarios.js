document.addEventListener("DOMContentLoaded", () => {
    const modalModificar = document.getElementById("modal-modificar");
    const modalEliminar = document.getElementById("modal-eliminar");
    const btnsModificar = document.querySelectorAll(".btn-modificar");
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");
    const cerrarModificar = document.querySelector(".cerrar-modificar");
    const cerrarEliminar = document.querySelector(".cerrar-eliminar");
    const codigoEliminar = document.getElementById("codigo-eliminar");

    let usuarioActual = {};

    // Abrir modal de modificar
    btnsModificar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            usuarioActual.codigo = row.cells[0].innerText;
            usuarioActual.nombre = row.cells[1].innerText;
            usuarioActual.apellido = row.cells[2].innerText;
            usuarioActual.direccion = row.cells[3].innerText;

            document.getElementById("codigo").value = usuarioActual.codigo;
            document.getElementById("nombre").value = usuarioActual.nombre;
            document.getElementById("apellido").value = usuarioActual.apellido;
            document.getElementById("direccion").value = usuarioActual.direccion;

            modalModificar.style.display = "block";
        });
    });

    // Abrir modal de eliminar
    btnsEliminar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            usuarioActual.codigo = row.cells[0].innerText;

            codigoEliminar.textContent = usuarioActual.codigo;
            modalEliminar.style.display = "block";
        });
    });

    // Cerrar modales
    cerrarModificar.addEventListener("click", () => cerrarModal("modificar"));
    cerrarEliminar.addEventListener("click", () => cerrarModal("eliminar"));

    // Confirmar eliminación
    document.getElementById("confirmar-eliminar").addEventListener("click", () => {
        const filas = document.querySelectorAll("#tabla-usuarios tbody tr");
        filas.forEach((fila) => {
            if (fila.cells[0].innerText === usuarioActual.codigo) {
                fila.remove();
            }
        });
        cerrarModal("eliminar");
        Swal.fire('¡Usuario eliminado!', '', 'success'); // Alerta de éxito
    });

    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener("click", (e) => {
        if (e.target === modalModificar) cerrarModal("modificar");
        if (e.target === modalEliminar) cerrarModal("eliminar");
    });
});

function cerrarModal(tipo) {
    const modal = document.getElementById(`modal-${tipo}`);
    modal.style.display = "none";
}

function guardarCambios(event) {
    event.preventDefault();
    const filas = document.querySelectorAll("#tabla-usuarios tbody tr");
    filas.forEach((fila) => {
        if (fila.cells[0].innerText === document.getElementById("codigo").value) {
            fila.cells[1].innerText = document.getElementById("nombre").value;
            fila.cells[2].innerText = document.getElementById("apellido").value;
            fila.cells[3].innerText = document.getElementById("direccion").value;
        }
    });
    cerrarModal("modificar");
}
