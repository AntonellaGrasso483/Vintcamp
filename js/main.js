const carrito = [];
const productos = [];
const consultaCliente = [];
const cuentas = [];


$(document).ready(function() {
    if('checkout' in localStorage) {
        const arrayItems = JSON.parse(localStorage.getItem('checkout'));
        for(const producto of arrayItems) {
            carrito.push(new Productos(producto.id, producto.img, producto.prenda, producto.precio, producto.cantidad));
            $("#bodyCarrito").empty();
            $("#bodyCarrito").append(generarCarrito(producto));
        }
        
    }
    if ("usuarios" in localStorage) {
        const arrayCuentas = JSON.parse(localStorage.getItem("usuarios"));
        for(const cuenta of arrayCuentas) {
            cuentas.push(new CuentasUsuario(cuenta.nombre, cuenta.apellido, cuenta.email, cuenta.password));
        }
        console.log(cuentas);
    }
});


if (carrito.length === 0) {
    $("#bodyCarrito").append(`<p class="text-center fs-5 text-muted">El carrito está vacío</p>`);
} 


$.get("data/productos.json", function(datos, estado){
    if(estado == "success") {
        for(const item of datos){
            productos.push(new Productos(item.id, item.img, item.prenda, item.precio, item.cantidad));
        }
        cardsBody();
        $(".btn-comprar").click(agregadoAlCarrito);
    }
});


$(".btn-borrar-prenda").click(function(e) {
    var posicion = carrito.findIndex(prod => prod.id == e.target.id);
    carrito.splice(posicion, 1);
    localStorage.setItem("checkout", JSON.stringify(carrito));
})



