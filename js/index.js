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

let btnCrisis;
let btnCompetencia;
let btnProducto;
let btnComunicacion;

let btnDatosUser;
let formularioUser;
let domicilio = "";
let email = ""; 
let botonToast;

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
    contenedorVentas = document.getElementById("contenedorVentasUsuario");

    botonesCerrarModalAgregarProducto = document.getElementsByClassName("btnCerrarModalAgregarProducto");
    modalAddProduct = document.getElementById("modalAddProduct");
    btnCalcularVentas = document.getElementById("btnCalcularVentas");
    modal = new bootstrap.Modal(modalAddProduct);

    botonesCerrarModalAgregarInfo = document.getElementsByClassName("btnCerrarModalAgregarInfo");
    modalAddUser = document.getElementById("modalDatosUser");
    btnDatosUser = document.getElementById("btnDatos");
    modalUser = new bootstrap.Modal(modalAddUser);

    formularioUser = document.getElementById("formularioAgregarInfo");
    textoDatosUser= document.getElementById("txtDatoUser");
    domicilio = document.getElementById("inputDomicilio");
    email = document.getElementById("inputEmail");
    contenedorDatosUser = document.getElementById("contenedorDatosUsuario")
    botonToast = document.getElementById("btnGuardar");

    contenedorDatosCliente = document.getElementById("contenedorDatosClientes")

}    

function inicializarEventos() {
    formularioIdentificacion.onsubmit = (event) => identificarUsuario(event);
    btnCalcularVentas.onclick = abrirModalAgregarProducto;
    formulario.onsubmit = (event) => validarFormulario(event);

    btnDatosUser.onclick = abrirModalAgregarUser;
    formularioUser.onsubmit = (event) => validarFormUser(event);

    botonLimpiarStorage.onclick = mostrarSwal;

    for (const boton of botonesCerrarModalAgregarProducto) {
      boton.onclick = cerrarModalAgregarProducto;
    }

    for (const boton of botonesCerrarModalAgregarInfo) {
        boton.onclick = cerrarModalAgregarInfo;
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
    contenedorVentas.innerHTML = ``;
    contenedorDatosUser.innerHTML = ``;
    contenedorDatosCliente.innerHTML = ``;
  }

  function mostrarSwal() {
    Swal.fire({
        title: 'Cerrar sesi??n',
        text: "??Est??s seguro que quieres cerrar sesi??n?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Cerrar sesi??n'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Tu sesi??n fue cerrada correctamente',
            `Hasta la pr??xima ${existeUsuario.nombre}`
          )
          eliminarStorage();
        }
      })
  }



//CALCULAR VENTAS  
function abrirModalAgregarProducto() {
    contenedorVentas.innerHTML = `` 
    modal.show();
}

function validarFormulario(event) {
event.preventDefault();
facturacion = parseFloat(inputPrecioCompra.value);
porcentaje = parseFloat(inputPrecioVenta.value);

if(isNaN(facturacion) || isNaN(porcentaje)){
    alert('No ingres?? valores correctos, vuelva a intentarlo') 
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
        <p class="card-text">Su ganancia del d??a de fue de <b> $ ${calcularGanancia()}</b></p>
        <h3>${informarSituacion()}</h3>
        </div>
    </div>
    <div id="contenedorInforme">
        <div id="formularioInforme">
            <div class="row col-md-12 ">
                <div class="col-md-12 text-center">
                <h3>??Por qu?? consideras que las ventas son ${detectarSituacion()}?</h3>
                </div>
                <div class="col-md-12 d-flex align-items-center justify-content-around">
                    <button class="btn btn-secondary m-3" id="btnCrisis">Econom??a</button>
                    <button type="submit" class="btn btn-secondary" id="btnCompetencia">La competencia</button>
                    <button type="submit" class="btn btn-secondary" id="btnComunicacion">La comunicaci??n</button>
                    <button type="submit" class="btn btn-secondary" id="btnProducto">Calidad del producto</button>
                </div>
            </div>
        </div>
    </div>
    </div>`; 
    contenedorVentas.append(informe);
    
    btnCrisis = document.getElementById("btnCrisis");
    btnCompetencia = document.getElementById("btnCompetencia");
    btnProducto = document.getElementById("btnProducto");
    btnComunicacion = document.getElementById("btnComunicacion");

    btnCrisis.onclick = comunicarCrisis;
    btnCompetencia.onclick = comunicarCompetencia;
    btnProducto.onclick = comunicarProducto;
    btnComunicacion.onclick = comunicarComunicacion;
}

function calcularGanancia(){
    ganancia = (facturacion*porcentaje)/100
    return ganancia
}   


let situacion
let situacionPositiva
let situacionNegativa

function informarSituacion(){
   situacion =  ganancia > 5000 ? situacionPositiva = 'Felicitaciones alcanzaste un cr??dito de ventas' : situacionNegativa = 'Tus ganancias el d??a de hoy fueron bajas'
   return situacion
}

let situacionDos
let situacionAlta
let situacionBaja

function detectarSituacion(){
    situacionDos =  ganancia > 5000 ? situacionAlta = 'altas' : situacionBaja = 'bajas'
    return situacionDos
 }


function comunicarCrisis() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Lo trataremos en el ??rea macrocomercial',
      })
    contenedorVentas.innerHTML = ``  
} 

function comunicarCompetencia(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Lo trataremos en el ??rea comercial',
      })
    contenedorVentas.innerHTML = ``   
} 

function comunicarProducto(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Lo trataremos en el ??rea de producci??n',
      })
    contenedorVentas.innerHTML = ``    
} 

function comunicarComunicacion(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Lo trataremos en el ??rea de marketing',
      })
    contenedorVentas.innerHTML = ``   
} 


//AGREGAR DATOS USUARIO
function abrirModalAgregarUser() {
    contenedorDatosUser.innerHTML = ``;
    contenedorDatosCliente.innerHTML = ``;
    modalUser.show();
}

function validarFormUser(event) {
event.preventDefault();
domicilio = inputDomicilio.value;
email = inputEmail.value;

formularioUser.reset();
informarDatos();
modalUser.hide();

}  

function cerrarModalAgregarInfo() {
    formularioUser.reset();
    modalUser.hide();
}
console.log(domicilio)

function mostrarToast() {
    Toastify({
      text: "Sus datos se cargaron correctamente",
      duration: 3000,
      close: true,
    }).showToast();
  }


function informarDatos(){
    mostrarToast();
    let informe = document.createElement('div')
    informe.className = 'col-md-12'
    informe.innerHTML = `
    <div class="card">
        <div class="card-body">
        <h3>Usuario: ${existeUsuario.nombre}</h3>
        <p class="card-text">Sector de trabajo: <b> ${domicilio}</b></p>
        <p class="card-text">Email: <b> ${email}</b></p>
        <p class="card-text">Datos de los clientes del sector<b> ${domicilio}</b>:</p>
        </div>
    </div>
    </div>`; 
    contenedorDatosUser.append(informe);
    consultarProductosServer();
    
}

//FETCH PARA MOSTRAR LOS CLIENTES DEL VENDEDOR
let clientes = []

function pintarClientes() {
    contenedorDatosCliente.innerHTML = "";
    clientes.forEach((cliente) => {
      let column = document.createElement("div");
      column.className = "col-md-4 mt-3";
      column.id = `columna-${cliente.id}`;
      column.innerHTML = `
              <div class="card">
                  <div class="card-body">
                  <p class="card-text">ID:
                      <b>${cliente.id}</b>
                  </p>
                  <p class="card-text">Nombre:
                      <b>${cliente.name}</b>
                  </p>
                  <p class="card-text">Usuario:
                      <b>${cliente.usuario}</b>
                  </p>
                  <p class="card-text">Email:
                      <b>${cliente.email}</b>
                  </p>
                  </div>
              </div>`;
  
        contenedorDatosCliente.append(column);
  
    });
  }

async function consultarProductosServer() {  
    try {
      const response = await fetch(
        "https://634408152dadea1175b32445.mockapi.io/clientes"
      );
      const data = await response.json();
      clientes = [...data];
      pintarClientes();
    } catch (error) {
      console.log(error);
    }
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

    agregarCarrito (prodNombre, prodPrecio, prodImg);
    mostrarToastCarrito()
}

function mostrarToastCarrito() {
    Toastify({
      text: "el producto se carg?? correctamente",
      duration: 3000,
      close: true,
    }).showToast();
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
    comunicarCompra();
    actualizarTotalCarrito()
}

function comunicarCompra(){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Gracias por su compra',
      })  
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
obtenerUsuarioStorage();
}

main();

