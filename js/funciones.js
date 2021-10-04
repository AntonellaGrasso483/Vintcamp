function successContacto() {
    Swal.fire({
        icon: 'success',
        title: '¡Enviado!',
        text: 'Nos pondremos en contacto lo más pronto posible.',
        iconColor: '#ce8dbd',
        confirmButtonColor: '#ce8dbd',
    });
}

function cuentaCreada() {
    Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada con éxito!',
        text: 'Ya podés iniciar sesión.',
        iconColor: '#ce8dbd',
        confirmButtonColor: '#ce8dbd',
    });
}


function cerrarSesion() {
    window.location.reload();
}


function mensajeInicioExitoso() {
    Swal.fire({
        icon: 'success',
        title: '¡Login realizado con éxito!',
        text: 'Disfrutá comprando en Vintcamp',
        iconColor: '#ce8dbd',
        confirmButtonColor: '#ce8dbd',
    });
}


function cardsBody() {
    for (const producto of productos) {
        $("#productosDisponibles").append(`<div class="card mb-3">
            <img src=${producto.img} class="card-img-top img-fluid" alt=${producto.prenda}>
            <div class="card-body">
                <h5 class="card-title">${producto.prenda}</h5>
                <p class="card-text">$${producto.precio}</p>
                <p class="card-text"><small class="text-muted"></small></p>
                <button class="btn btn-outline-dark btn-comprar" id="${producto.id}">Agregar al carrito</button>
            </div>
        </div>`);
    }
}


function agregadoAlCarrito(e) {
    e.preventDefault();
    $("#bodyCarrito").empty();
    const idProducto = e.target.id
    const prendaSeleccionada = productos.find(prod => prod.id == idProducto);
    carrito.push(prendaSeleccionada);
    localStorage.setItem('checkout', JSON.stringify(carrito));
    let precioTotal = 0;
    
    Swal.fire({
        icon: 'success',
        title: '¡Producto agregado con éxito!',
        text: 'Lo podrás visualizar en "Mi carrito".',
        iconColor: '#ce8dbd',
        confirmButtonColor: '#ce8dbd',
    });
    
    
    for (const producto of carrito) {
        precioTotal = precioTotal + producto.precio;
        $("#bodyCarrito").append(generarCarrito(producto))
    };
    $("#bodyCarrito").append(`<p class="mt-4 text-center">Total de tu compra: $${precioTotal}</p>`);
}

function generarCarrito(producto) {
    return `<tr>
    <td class="producto-imagen"><img class="img-fluid" height=100 width=100 src="${producto.img}"></td>
    <td class="producto-prenda">${producto.prenda}</td>
    <td class="producto-precio">$${producto.precio}</td>
    <td><a href="#" class="btn btn-outline-dark btn-borrar-prenda" id="borrar${producto.id}">Eliminar</a></td>
</tr>`
}


$("#vaciarCarrito").click(function() {
    $("#bodyCarrito").empty();
    $("#bodyCarrito").append(`<p class="text-center fs-5 text-muted">El carrito está vacío</p>`);
    $("#modalCarrito").modal('hide');
    localStorage.removeItem('checkout')
    $("bodyCarrito").trigger('reset')
});


$("#btnComprarCarrito").click(function() {
    $("#modalCarrito").modal('hide');
});


$("#finalizar").click(function(e) {
    if ($("#tarjeta").val() != "" && $("#nombreTarjeta").val() != "" && $("#mes").val() != "" && $("#anio").val() != "" && $("#ccv").val() != "") {
        e.preventDefault();
        $("#modalPago").modal("hide"); 
        Swal.fire({
            icon: 'success',
            title: '¡Pedido Enviado!',
            text: 'Te enviaremos un mail para confirmar tu pedido. Gracias por confiar en Vintcamp',
            iconColor: '#ce8dbd',
            confirmButtonColor: '#ce8dbd',
        });
        $("#modalPago").trigger("reset");
        $("#modalEnvio").trigger("reset");
        $("#bodyCarrito").empty();
        carrito.length = [0];
        $("#bodyCarrito").append(`<p class="text-center fs-5 text-muted">El carrito está vacío</p>`);
    } else {
        $("#datosPagoIncompletos").append("*Campos obligatorios").css("color", "red");
    }
});
