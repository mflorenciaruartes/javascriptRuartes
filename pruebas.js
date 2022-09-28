//Desafio entregable clase 3 - solicitar ventas del dia para saber la ganancia segun el porcentaje
// const NUMERO_VENTAS = parseFloat(prompt('Ingrese el numero de ventas realizadas el dia de hoy'))
// const PORCENTAJE = parseFloat(prompt('Ingrese el porcentaje que le queda de ganancia'))
// let sumatoria = 0
// let ganancia = 0

// for(let i=1; i<=NUMERO_VENTAS; i++){
//     let ventas = prompt('ingrese la venta '+ i)
//     sumatoria = sumatoria + parseFloat(ventas)
// }
// ganancia = (sumatoria*PORCENTAJE)/100
// alert('Su ganancia del día de hoy es ' + ganancia)

// while(ganancia >= 5000){
//     alert('Felicitaciones alcanzaste un crédito de ventas')  
// }
// if(ganancia >= 3000){
//     alert('Tus ganancias el día de hoy fueron aceptables')
// }else if(ganancia >= 1000){
//     alert('Tus ganancias el dia de hoy fueron bajas')
// }else{
//     alert('Hoy no fue un gran día pero podras mejorarlo')
// }

//1er Desafio Entregable clase 4 - SIMULADOR INTERACTIVO

let usuario = ''
let sumatoria = 0
let ganancia = 0
let numeroVentas = 0
let porcentaje = 0

function ingresoUsuario(){
  usuario = prompt('Hola equipo de Nutrimarket!\nIngrese su usuario')
  return usuario  
}

let empleados = [
    {nombre : 'ANA PEREZ', user:'anaperez10'},
    {nombre: 'MARIA CASTILLO', user:'mariac'},
    {nombre: 'RAMON MAIDANA', user: 'ramonjk'},
    {nombre: 'JUAN GOUT', user:'juang15'},
  ]

function solicitarVentas(){
    numeroVentas = parseInt(prompt('Ingrese el numero de ventas realizadas el día de hoy'))
    porcentaje = parseInt(prompt('Ingrese el porcentaje de ganancia'))   
}

function calcularGanancia(){
    for(let i=1; i<=numeroVentas; i++){
        let ventas = prompt('Ingrese la venta '+ i)
        sumatoria = sumatoria + parseInt(ventas)
    }
    ganancia = (sumatoria*porcentaje)/100
    return ganancia
}    
   

function informarGanancia(){
    alert('Su ganancia del día de fue de ' + calcularGanancia())
}

function informarSituacion(){
    if(ganancia >= 5000){
        alert('Felicitaciones alcanzaste un crédito de ventas')
    }else if(ganancia >= 3000){
        alert('Tus ganancias el día de hoy fueron aceptables')
    }else if(ganancia >= 1000){
        alert('Tus ganancias el día de hoy fueron bajas')
    }else{
        alert('Hoy no fue un gran día de ventas pero podrás mejorar')
    }
}

function menu() {
    let opcion = prompt(
      "Cuál consideras que es la causa de ventas bajas (0 para salir)\n1. Crisis económica\n2. La competencia nos supera\n3. Mala comunicación\n4. Calidad del producto"
    );
    return opcion;
  }
 
function respuestaSituacion() {
   let opcionSeleccionada = menu();
    while (opcionSeleccionada !== "0") {
      if (opcionSeleccionada !== "") {
        opcionSeleccionada = parseInt(opcionSeleccionada);
        if (!isNaN(opcionSeleccionada)) {
          switch (opcionSeleccionada) {
            case 1:
              alert('Lo trataremos en el área macrocomercial');
              break;
  
            case 2:
                alert('Lo trataremos en el área comercial');
              break;
  
            case 3:
                alert('Lo trataremos en el área de marketing');
              break;
  
            case 4:
                alert('Lo trataremos en el área de producción');
              break;
  
            default:
              alert("Opcion Incorrecta");
              break;
          }
        } else {
          alert("Ingresó un dato incorrecto");
        }
      } else {
        alert("Seleccione la opción");
      }
      alert('Gracias por su colaboración');
      break
    }
}

//Interaccion con el comprador
const contenedorProducto = document.getElementById('contenedor-productos')

let productos = [
  {
    id:1,
    nombre : 'Licuadora', 
    precio: 200,
    stock: 10
  },
  {
    id:2,
    nombre: 'Minipimer', 
    precio: 500,
    stock: 10
  },
  {
    id:3,
    nombre: 'Procesadora', 
    precio: 400,
    stock: 15
  },
  {
    id:4,
    nombre: 'Yogurtera', 
    precio: 800,
    stock: 17
  },
  {
    id:5,
    nombre: 'Picadora', 
    precio: 700,
    stock: 20
  },
  {
    id:6,
    nombre: 'Freidora', 
    precio: 1200,
    stock: 5
  },
]

productos.forEach((producto) => {
  let column = document.createElement('div')
  column.className = 'col-md-4 mt-3'
  column.id = `columna ${producto.id}`
  column.innerHTML = `
  <div class="card">
        <div class="card-body">
        <p class="card-text">Código Producto: <b>${producto.id}</b></p>
        <p class="card-text">Nombre: <b>${producto.nombre}</b></p>
        <p class="card-text">Precio: <b>${producto.precio}</b></p>
        <p class="card-text">Stock: <b>${producto.stock}</b></p>
        </div>
  </div>`; 
 contenedorProducto.append(column);
})

let opcion = 0
let total = []
let compra = []
let botonUno = document.getElementById("btnEventoUno")

botonUno.onclick = () => {
  do{
    opcion = parseInt(prompt(crearMensaje()))
    
    if(!isNaN(opcion)){
      if(opcion >= 7){
        alert(`Ingresó información incorrecta`)
        break
      }if(opcion === 0){
        alert(`El total de su compra es de $ ${calcularTotal(total)}. \Gracias por tu visita`)
        break
      }
    }else{
      alert(`Ingresó información incorrecta`)
      break
    }
    total.push(subtotal(cantidad(productos[opcion -1]), productos [opcion -1]))

  }while(true)
}


function crearMensaje (){
  let mensaje = 'Bienvenido a Nutrimarket! \nIngrese el código del producto que desea comprar:\n(Presione 0 para salir)'
  return mensaje
}

function cantidad(producto){
  return prompt(`Cuantas unidades de ${producto.nombre} desea comprar?`)
}

function subtotal(cantidad, producto){
  alert(`Compro ${cantidad} de ${producto.nombre} por $ ${cantidad * producto.precio}`)
  return cantidad * producto.precio
}

function calcularTotal(arr){
  return arr.reduce((acc, el) => acc + el, 0)
}




//Interaccion con el vendedor del local
const inicio = document.getElementById('superior')
let botonDos = document.getElementById("btnEventoDos")
botonDos.onclick = () => {
  ingresoUsuario()
  let existeUsuario = empleados.find((el) => el.user === usuario)
  if(existeUsuario !== undefined){
    alert('Bienvenido ' + existeUsuario.nombre)
    let userLog = document.getElementById('usuario')
    userLog.innerText = 'Bienvenido ' + existeUsuario.nombre
    botonDos.className = 'btn btn-success m-3'
    botonDos.innerText = 'Cerrar sesion'
    let btnNew = document.createElement('button')
    btnNew.className = 'btn btn-success m-3'
    btnNew.id = 'btnEventoTres'
    btnNew.innerText = 'Calcular ventas' 
    inicio.append(btnNew);
    btnNew.onclick = () => {
      solicitarVentas();
        if(isNaN(numeroVentas) || isNaN(porcentaje)){
          alert('No ingresó valores correctos, vuelva a intentarlo')  
        }else{ 
        informarGanancia();
        informarSituacion();
        if(ganancia <= 1000){
          respuestaSituacion();
        }else{
          alert('Gracias por su colaboración')
        }
        }
    }
    botonDos.onclick = () => {
      alert(`${existeUsuario.nombre} cerraste tu sesion`)
    }
    }else{
   alert('Usuario incorrecto')
  }
}


