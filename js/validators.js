document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("visitorRegistryForm");

    form.addEventListener("submit", (event) => {
        let isValid = true;
        let errorMsg = ""; // Variable utilizada como prueba en consola

        const cedula = document.getElementById("cedula").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const departamento = document.getElementById("departamento").value.trim();
        const motivo = document.getElementById("motivo").value.trim();

        // Se limpian los mensajes de error si hubieron anteriormente
        document.querySelectorAll(".error-msg").forEach(element => element.textContent = "");

        /*
            Se verifica si la cédula digitada coincide con la expresión regular de una cédula nicaragüense; de lo contrario, se muestra un mensaje de error
        */
        if (!RegExp(/^\d{3}-\d{6}-\d{4}[A-Z]$/).test(cedula)) {
            isValid = false;
            errorMsg += "La cédula debe tener el formato 000-000000-0000X.\n";
            document.getElementById("errorCedula").textContent = "Formato incorrecto para la cédula.";
        }

        // Si los nombres cuentan con caracteres especiales, números o está vacío, se muestra un mensaje de error
        if (!RegExp(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/).test(nombre) || nombre.length === 0) {
            isValid = false;
            errorMsg += "Los nombres solo deben contener letras y espacios.\n";
            document.getElementById("errorNombre").textContent = "Los nombres solo deben contener letras y espacios.";
        }

        // Si los apellidos cuentan con caracteres especiales, números o está vacío, se muestra un mensaje de error     
        if (!RegExp(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/).test(apellido) || apellido.length === 0) {
            isValid = false;
            errorMsg += "Los apellidos solo deben contener letras y espacios.\n";
            document.getElementById("errorApellido").textContent = "Los apellidos solo deben contener letras y espacios.";
        }

        // Se verifica la selección de un campo de departamento
        if (departamento === "") {
            isValid = false;
            errorMsg += "El departamento no puede estar vacío.\n";
            document.getElementById("errorDepartamento").textContent = "Seleccione un departamento.";
        }

        // Se verifica si el motivo es lo suficientemente largo para ofrecer información útil
        if (motivo.length < 10){
            isValid = false;
            errorMsg += "El motivo debe tener al menos 10 caracteres.\n";
            document.getElementById("errorMotivo").textContent = "El motivo debe tener al menos 10 caracteres.";
        }

        // Si no es válido, mostrar los errores en la consola
        if (!isValid) {
            console.log("Errores en el formulario:");
            console.log(errorMsg); // Muestra los mensajes de error en la consola
            event.preventDefault(); // Previene el envío del formulario
        }
    });
});
