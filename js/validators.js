document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("visitorRegistryForm");

    form.addEventListener("submit", (event) => {
        // Evitamos el envío automático del formulario para manejarlo con JS
        event.preventDefault();

        let isValid = true;
        let errorMsg = "";

        // Obtención y limpieza de valores de campos
        const cedula = document.getElementById("cedula").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const departamento = document.getElementById("departamento").value.trim();
        const motivo = document.getElementById("motivo").value.trim();

        // Se limpian los mensajes de error mostrados anteriormente
        document.querySelectorAll(".error-msg").forEach(element => element.textContent = "");

        // Validación de la cédula (formato 000-000000-0000X)
        if (!/^\d{3}-\d{6}-\d{4}[A-Z]$/.test(cedula)) {
            isValid = false;
            errorMsg += "La cédula debe tener el formato 000-000000-0000X.\n";
            document.getElementById("errorCedula").textContent = "Formato incorrecto para la cédula.";
        }

        // Validación de nombres (solo letras y espacios)
        if (!/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/.test(nombre) || nombre.length === 0) {
            isValid = false;
            errorMsg += "Los nombres solo deben contener letras y espacios.\n";
            document.getElementById("errorNombre").textContent = "Los nombres solo deben contener letras y espacios.";
        }

        // Validación de apellidos (solo letras y espacios)
        if (!/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/.test(apellido) || apellido.length === 0) {
            isValid = false;
            errorMsg += "Los apellidos solo deben contener letras y espacios.\n";
            document.getElementById("errorApellido").textContent = "Los apellidos solo deben contener letras y espacios.";
        }

        // Validación de departamento (debe seleccionarse una opción)
        if (departamento === "") {
            isValid = false;
            errorMsg += "El departamento no puede estar vacío.\n";
            document.getElementById("errorDepartamento").textContent = "Seleccione un departamento.";
        }

        // Validación de motivo (mínimo 10 caracteres)
        if (motivo.length < 10) {
            isValid = false;
            errorMsg += "El motivo debe tener al menos 10 caracteres.\n";
            document.getElementById("errorMotivo").textContent = "El motivo debe tener al menos 10 caracteres.";
        }

        // Si existen errores, se muestra un SweetAlert con la lista de errores
        if (!isValid) {
            Swal.fire({
                title: 'Errores en el formulario',
                text: errorMsg,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            // Si todo es válido, se muestra un mensaje de éxito
            Swal.fire({
                title: 'Registro Exitoso',
                text: 'El visitante ha sido registrado exitosamente',
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then((result) => {
                if (result.isConfirmed) {

                    form.reset();
                }
            });
        }
    });
});
