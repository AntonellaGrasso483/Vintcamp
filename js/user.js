function ClientesContacto (nombre, email, telefono, consulta) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.consulta = consulta;
}

function CuentasUsuario (nombre, apellido, email, password) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
}

function validacionForm(e) {
    e.preventDefault();
    let nombreCl = $('#validarNombre').value;
    let emailCl = $('#validarEmail').value;
    let telefonoCl = $('#validarNumero').value;
    let consultaCl = $('#validarConsulta').value;
    consultaCliente.push(new ClientesContacto(nombreCl, emailCl, telefonoCl, consultaCl));
    for(const cliente of consultaCliente) {
        localStorage.setItem('consultas', JSON.stringify(consultaCliente))
    }
}

$("#submitFormulario").click(function(e) {
    if ($("#validarNombre").val() != "" && $("#validarEmail").val() != "" && $("#validarNumero").val() != "" && $("#validarConsulta").val() != "") {
        e.preventDefault();
        $("#camposVacios").empty();
        validacionForm(e);
        successContacto();
        $("#modalContacto").modal("hide");
    } else {
        $("#camposVacios").empty();
        $("#camposVacios").append("*Campos obligatorios").css("color", "red"); 
    }
});


$("#registro-usuario").click(function (e) {
    e.preventDefault();
    let nuevoNombre = document.getElementById("nombre").value
    let nuevoApellido = document.getElementById("apellido").value
    let nuevoEmail = document.getElementById("email").value
    let nuevoPassword = document.getElementById("password").value

    let nuevaCuenta = {
        nombre: nuevoNombre,
        apellido: nuevoApellido,
        email: nuevoEmail,
        password: nuevoPassword
    }
    if (nuevoNombre != "" && nuevoApellido != "" && nuevoEmail != "" && nuevoPassword != "") {
        $("#emailInvalido").empty();
        $("#validacion").empty();
        for (i = 0; i < cuentas.length; i++) {
            if (nuevoEmail == cuentas[i].email) {
                $("#emailInvalido").append("Este email ya ha sido registrado").css("color", "red");
                return
            } 
        }
        if (nuevoPassword.length < 8) {
            $("#validacion").append("Ingrese un mínimo de 8 caracteres").css("color", "red"); 
            return
        }
        cuentas.push(nuevaCuenta)
        cuentaCreada();
        $('#modalRegistro').modal('hide');
        localStorage.setItem("usuarios", JSON.stringify(cuentas));
    } else {
        $("#validacion").empty();
        $("#validacion").append("El formulario está incompleto.").css("color", "red");
    }
});


$("#usuarioLog").click(function(e) {
    e.preventDefault();
    let emailUsuario = document.getElementById("emailUsuario").value;
    let passwordUsuario = document.getElementById("passwordUsuario").value;
    for (i = 0; i < cuentas.length; i++) {
        if (emailUsuario == cuentas[i].email && passwordUsuario == cuentas[i].password) { 
            accionesLoginExitoso();
        } 
    }
    $("#usuarioNoEncontrado").empty();
    $("#usuarioNoEncontrado").append("Contraseña o email incorrecto").css("color", "red"); 
});

function accionesLoginExitoso() {
    document.getElementById("iniciarSesion").innerHTML = cuentas[i].nombre + " " + cuentas[i].apellido;
    document.getElementById("labelInicioSesion").innerHTML = cuentas[i].nombre + " " + cuentas[i].apellido;
    $("#usuarioNoEncontrado").empty();
    mensajeInicioExitoso();
    $("#modalInicioSesion").modal('hide');
    $("#footerLog").empty();
    $("#footerLog").append(`<button class="btn btn-dark" id="logoutBtn" onclick="cerrarSesion()">Cerrar sesión</button>`);
    $("#modalLogBody").empty();
    $("#modalLogBody").append(`<p class="text-center fs-5 text-muted">Has iniciado sesión</p>`)
    return;
}

$("#formEnvio").click(function (e) {
    if ($("#nombreEnvio").val() != "" && $("#apellidoEnvio").val() != "" && $("#emailEnvio").val() != "" && $("#provincia").val() != "" && $("#localidad").val() != "" && $("#direccion").val() != "" && $("#codPostal").val() != "") {
        e.preventDefault();
        $('#modalPago').modal('show');
        $("#modalEnvio").modal("hide");
    } else {
        $("#camposIncompletos").append("*Campos obligatorios").css("color", "red"); 
    }
});
