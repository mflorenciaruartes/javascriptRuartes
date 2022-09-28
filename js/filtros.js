//INTERACCION CON EL VENDEDOR
let usuario;

let existeUsuario;

let formularioIdentificacion;
let contenedorIdentificacion;
let contenedorUsuario;
let textoUsuario;
let botonLimpiarStorage;

let btnCalcularVentas;
let formulario;
let ganancia;
let facturacion
let porcentaje;

let empleados = [
    {nombre : 'ANA PEREZ', user:'anaperez10'},
    {nombre: 'MARIA CASTILLO', user:'mariac'},
    {nombre: 'RAMON MAIDANA', user: 'ramonjk'},
    {nombre: 'JUAN GOUT', user:'juang15'},
  ]

function inicializarElementos() {
    formularioIdentificacion = document.getElementById("formularioIdentificacion");
    inputUsuario = document.getElementById("inputUsuario");
    contenedorIdentificacion = document.getElementById("contenedorIdentificacion");
    contenedorUsuario = document.getElementById("contenedorUsuario");
    textoUsuario = document.getElementById("textoUsuario");
    botonLimpiarStorage = document.getElementById("btnCerrarSesion");
    
    formulario = document.getElementById("formularioAgregarProducto");
    facturacion = document.getElementById("inputPrecioCompra");
    porcentaje = document.getElementById("inputPrecioVenta");
    contenedorProductos = document.getElementById("contenedorVentasUsuario");

    
    botonesCerrarModalAgregarProducto = document.getElementsByClassName("btnCerrarModalAgregarProducto");
    modalAddProduct = document.getElementById("modalAddProduct");
    btnCalcularVentas = document.getElementById("btnCalcularVentas");
    modal = new bootstrap.Modal(modalAddProduct);
}    

function inicializarEventos() {
    formularioIdentificacion.onsubmit = (event) => identificarUsuario(event);
    btnCalcularVentas.onclick = abrirModalAgregarProducto;
    formulario.onsubmit = (event) => validarFormulario(event);
    botonLimpiarStorage.onclick = eliminarStorage;

    for (const boton of botonesCerrarModalAgregarProducto) {
      boton.onclick = cerrarModalAgregarProducto;
    }
}

  function identificarUsuario(event) {
    event.preventDefault();
    usuario = inputUsuario.value;
    existeUsuario = empleados.find((el) => el.user === usuario)
    if(existeUsuario !== undefined){
    formularioIdentificacion.reset();
    actualizarUsuarioStorage();
    mostrarTextoUsuario();
    }else{
    alert('Usuario incorrecto')
    formularioIdentificacion.reset();
   }
  }
  
  function mostrarTextoUsuario() {
    contenedorIdentificacion.hidden = true;
    contenedorUsuario.hidden = false;
    textoUsuario.innerHTML += ` ${existeUsuario.nombre}`;
  }
  
  function mostrarFormularioIdentificacion() {
    contenedorIdentificacion.hidden = false;
    contenedorUsuario.hidden = true;
    textoUsuario.innerHTML = ``;
  }

  function eliminarStorage() {
    localStorage.clear();
    existeUsuario = "";
    mostrarFormularioIdentificacion();
    contenedorProductos.innerHTML = ``;
  }

function abrirModalAgregarProducto() {
    modal.show();
}

function validarFormulario(event) {
event.preventDefault();
facturacion = parseFloat(inputPrecioCompra.value);
porcentaje = parseFloat(inputPrecioVenta.value);

if(isNaN(facturacion) || isNaN(porcentaje)){
    alert('No ingresó valores correctos, vuelva a intentarlo') 
}else{
    formulario.reset();
    informarGanancia();
    modal.hide();
}
}  

function cerrarModalAgregarProducto() {
    formulario.reset();
    modal.hide();
}

function informarGanancia(){
    let informe = document.createElement('div')
    informe.className = 'col-md-12'
    informe.innerHTML = `
    <div class="card">
            <div class="card-body">
            <p class="card-text">Su ganancia del día de fue de  <b>${calcularGanancia()}</b></p>
            </div>
    </div>`; 
    contenedorProductos.append(informe);
}

function calcularGanancia(){
    ganancia = (facturacion*porcentaje)/100
    return ganancia
}   

//INTERACCION CON EL COMPRADOR
const prodContainer = document.querySelector("#ProdList")
const TODOS = document.querySelectorAll(".products__figure")

//clase constructora de productos//
class crearProducto{
    constructor(img, nombre, nombreLowerCase, precio){
        this.img = img
        this.nombre = nombre
        this.nombreLowerCase = nombreLowerCase
        this.precio = precio
    }
}

let prodArray = []

TODOS.forEach(prod => obtenerDatosProd(prod))
function obtenerDatosProd(prod){
    const prodImg = prod.querySelector(".prod-img").src
    const prodNombre = prod.querySelector(".prod-nombre").textContent
    const prodNombreLowerCase = prodNombre.toLowerCase()
    const prodPrecio = prod.querySelector(".prod-precio").textContent
    const productoNuevo = new crearProducto(prodImg, prodNombre, prodNombreLowerCase, prodPrecio)
    prodArray.push(productoNuevo)
}

function crearFigure(prodImg, prodNombre, prodPrecio){
    const prodFigure = document.createElement("figure")
    prodFigure.className = `row w-100 m-2 d-flex align-items-center products__figure`
    const figureContent = `
        <img src=${prodImg} class="img-fluid rounded-3 img-p prod-img">
        <figcaption class="prod-nombre">${prodNombre}</figcaption>
        <p class="prod-precio">${prodPrecio}</p>
        <button class="btn-carrito">
            Comprar 
        </button> `
        prodFigure.innerHTML = figureContent
        prodContainer.append(prodFigure)
        let agregarCarritoBtnFiltrado = prodFigure.querySelectorAll(".btn-carrito")
        agregarCarritoBtnFiltrado.forEach((btn)=>{
            btn.addEventListener("click", () => agregarCarritoClick(event))
        })
}


//AGREGAR AL CARRITO
const agregarCarritoBtn = document.querySelectorAll(".btn-carrito")


agregarCarritoBtn.forEach((btn)=>{
    btn.addEventListener("click", () => agregarCarritoClick(event))
})

const pagarBtn = document.querySelector(".pagarBtn")
pagarBtn.addEventListener("click", () => comprarClick())

const carritoContainer = document.querySelector(".carritoContainer")

class carritoProducto{
    constructor(img, nombre, precio){
        this.img = img
        this.nombre = nombre
        this.precio = precio
    }
}

const productos = []

function agregarCarritoClick(event){
    const button = event.target
    const prod = button.closest(".products__figure")
    
    const prodNombre = prod.querySelector(".prod-nombre").textContent
    const prodPrecio = prod.querySelector(".prod-precio").textContent
    const prodImg = prod.querySelector(".prod-img").src
    const productoNuevo = new carritoProducto(prodImg, prodNombre, prodPrecio)
    productos.push(productoNuevo)

    agregarCarrito (prodNombre, prodPrecio, prodImg)
}


function agregarCarrito (prodNombre, prodPrecio, prodImg){
    const productosCarrito = carritoContainer.querySelectorAll(".prodAgregadoNombre")
    for (let i=0; i<productosCarrito.length; i++){
        if (productosCarrito[i].innerText === prodNombre){
            let prodCantidad = productosCarrito[i].parentElement.parentElement.parentElement.querySelector(".prodAgregadoCantidadInput")
            prodCantidad.value ++
            actualizarTotalCarrito()
            return
        }
    }

    const carritoRow = document.createElement("div")
    const prodCarritoContent = `
    <div class= "row prodAgregado container-fluid align-items-center m-1 border">
        <div class= "col-6">
            <div class= "prodAgregadoImgNombre">
                <img src=${prodImg} class= "img-fluid rounded-3 w-25 prodAgregadoImg">
                <p class= "prodAgregadoNombre">${prodNombre}</p>
            </div>
        </div>
        <div class= "col-2">
            <div class= "prodAgregadoPrecio">
                <p class="prodPrecio">${prodPrecio}</p>
            </div>
        </div>
        <div class= "col-4">
            <div class= "prodAgregadoCantidad">
                <input class="prodAgregadoCantidadInput" type="number" value=1>
                <button class="btnDelete" type="button">X</button>
            </div>
        </div>
    </div>`
    carritoRow.innerHTML= prodCarritoContent
    carritoContainer.append(carritoRow)
    
    carritoRow.querySelector(".btnDelete").addEventListener("click", () => eliminarProductoClick(event))

    carritoRow.querySelector(".prodAgregadoCantidad").addEventListener("change", ()=> modificarCantidad(event))

    actualizarProductosStorage();
    actualizarTotalCarrito()
     
}

function crearCarrito(){
    productos.forEach((producto) =>{
    const carritoRow = document.createElement("div")
    const prodCarritoContent = `
    <div class= "row prodAgregado container-fluid align-items-center m-1 border">
        <div class= "col-6">
            <div class= "prodAgregadoImgNombre">
                <img src=${producto.img} class= "img-fluid rounded-3 w-25 prodAgregadoImg">
                <p class= "prodAgregadoNombre">${producto.nombre}</p>
            </div>
        </div>
        <div class= "col-2">
            <div class= "prodAgregadoPrecio">
                <p class="prodPrecio">${producto.precio}</p>
            </div>
        </div>
        <div class= "col-4">
            <div class= "prodAgregadoCantidad">
                <input class="prodAgregadoCantidadInput" type="number" value=1>
                <button class="btnDelete" type="button">X</button>
            </div>
        </div>
    </div>`
    carritoRow.innerHTML = prodCarritoContent
    carritoContainer.append(carritoRow)
    })
}

function actualizarTotalCarrito(){
    let total = 0
    const totalCarrito = document.querySelector(".totalCarrito")
    const productosCarrito = document.querySelectorAll(".prodAgregado")

    productosCarrito.forEach((prod) => {
        const precioProductoAgregado = Number(prod.querySelector(".prodPrecio").textContent.replace("$",""))
        const cantidadProductoAgregado = Number(prod.querySelector(".prodAgregadoCantidadInput").value)
        total = total + precioProductoAgregado * cantidadProductoAgregado
    })

    totalCarrito.innerHTML = `$ ${total}`
}

const eliminarProductoBtn = document.querySelectorAll(".btnDelete")

function eliminarProductoClick(event){
    const button = event.target
    button.closest(".prodAgregado").remove()
    actualizarTotalCarrito()
}

function modificarCantidad(event){
    const inputCantidad = event.target
    if (inputCantidad.value<=0){
        inputCantidad.value=1
    }
    actualizarTotalCarrito()
}

function comprarClick(){
    carritoContainer.innerHTML = ""
    actualizarTotalCarrito()
}

function actualizarProductosStorage() {
    let productosJSON = JSON.stringify(productos);
    localStorage.setItem("productos", productosJSON);
  }

function obtenerProductosStorage() {
    let productosJSON = localStorage.getItem("productos");
    if (productosJSON) {
      productos = JSON.parse(productosJSON);
      crearCarrito()
    }
  }


//STORAGE

function actualizarUsuarioStorage() {
let usuarioJSON = JSON.stringify(existeUsuario);
localStorage.setItem("usuario", usuarioJSON);
}

function obtenerUsuarioStorage() {
let usuarioJSON = localStorage.getItem("usuario");
if (usuarioJSON) {
    existeUsuario = JSON.parse(usuarioJSON);
    mostrarTextoUsuario();
}
}


function main() {
inicializarElementos();
inicializarEventos();
// obtenerProductosStorage();
obtenerUsuarioStorage();
}

main();

