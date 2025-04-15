document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("visitorRegistryForm");

    // Función para mostrar errores sin eliminar el ícono
    function showError(id, message) {
        const container = document.getElementById(id);
        const textElement = container.querySelector("span");
        container.classList.add("active");
        textElement.textContent = message;
    }

    // Limpia todos los errores visibles
    function clearErrors() {
        document.querySelectorAll(".error-msg").forEach(el => {
            el.classList.remove("active");
            const span = el.querySelector("span");
            if (span) span.textContent = "";
        });
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita el envío automático

        let isValid = true;
        let errorMsg = "";

        const cedula = document.getElementById("cedula").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const departamento = document.getElementById("departamento").value.trim();
        const motivo = document.getElementById("motivo").value.trim();

        // Se limpian los errores visibles antes de volver a validar
        clearErrors();

        // Validación de cédula
        if (!/^\d{3}-\d{6}-\d{4}[A-Z]$/.test(cedula)) {
            isValid = false;
            errorMsg += "La cédula debe tener el formato 000-000000-0000X.\n";
            showError("errorCedula", "La cédula debe tener el formato 000-000000-0000X.");
        }

        // Validación de nombres
        if (nombre.length === 0) {
            isValid = false;
            showError("errorNombre", "El nombre no pueden estar vacío.");
        } else if (!/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/.test(nombre)) {
            isValid = false;
            showError("errorNombre", "Los nombres solo deben contener letras y espacios.");
        }

        // Validación de apellidos
        if (apellido.length === 0) {
            isValid = false;
            showError("errorApellido", "El apellido no puede estar vacío.");
        } else if (!/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/.test(apellido)) {
            isValid = false;
            showError("errorApellido", "Los apellidos solo deben contener letras y espacios.");
        }

        // Validación de departamento
        if (departamento === "") {
            isValid = false;
            errorMsg += "El departamento no puede estar vacío.\n";
            showError("errorDepartamento", "Seleccione un departamento.");
        }

        // Validación de motivo
        if (motivo.length < 10) {
            isValid = false;
            errorMsg += "El motivo debe tener al menos 10 caracteres.\n";
            showError("errorMotivo", "El motivo debe tener al menos 10 caracteres.");
        }

        // Mostrar errores con SweetAlert2 si no es válido
        if (!isValid) {
            Swal.fire({
                title: 'Errores en el formulario',
                text: "No es posible registrar esta información",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            // Proceso exitoso, se creará un objeto de visitante y se guardará usando localStorage
            const newVisitor = {
                cedula,
                nombre,
                apellido,
                departamento,
                motivo,
                fecha: new Date().toLocaleString()
            };

            saveVisitor(newVisitor);
            form.reset(); // Se reinicia el formulario para posibilitar una nueva entrada

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
