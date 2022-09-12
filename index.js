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
    while(ganancia >= 5000){
        alert('Felicitaciones alcanzaste un crédito de ventas')  
    }
    if(ganancia >= 3000){
        alert('Tus ganancias el día de hoy fueron aceptables')
    }else if(ganancia >= 1000){
        alert('Tus ganancias el día de hoy fueron bajas')
    }else{
        alert('Hoy no fue un gran día de ventas pero podrás mejorar')
    }
}

function menu() {
    let opcion = prompt(
      "Cuál consideras que es la causa de ventas bajas (ESC para salir)\n1. Crisis económica\n2. La competencia nos supera\n3. Mala comunicación\n4. Calidad del producto"
    );
    return opcion;
  }
 
function respuestaSituacion() {
   let opcionSeleccionada = menu();
    while (opcionSeleccionada.toLowerCase !== "esc") {
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
          alert("Ingresó una letra");
        }
      } else {
        alert("Seleccione la opción");
      }
      alert('Gracias por su colaboración');
      break
    }
}

//Interaccion con el comprador
let productos = [
  {nombre : 'Licuadora', precio: 200},
  {nombre: 'Minipimer', precio: 500},
  {nombre: 'Procesadora', precio: 400},
  {nombre: 'Yogurtera', precio: 800},
  {nombre: 'Picadora', precio: 700},
]

function crearMensaje (){
  let mensaje = 'Bienvenido a Nutrimarket! \nQue producto desea comprar?'
  let count = 1

  for(let producto of productos){
      mensaje +=  `\n${count}. ${producto.nombre} - $ ${producto.precio} `
      ++count
  }

  mensaje += `\n${count}. salir`
  return mensaje
}

function cantidad(producto){
  return prompt(`Cuantas unidades de ${producto.nombre} desea comprar?`)
}

function subtotal(cantidad, producto){
  alert(`Compro ${cantidad} de ${producto.nombre} por ${cantidad * producto.precio}`)
  return cantidad * producto.precio
}

function calcularTotal(arr){
  return arr.reduce((acc, el) => acc + el, 0)
}

let opcion = 0
let total = []

do{
  opcion = parseInt(prompt(crearMensaje()))
  
  if(opcion === productos.length +1){
      alert(`Su total es de $ ${calcularTotal(total)}. \Gracias por tu visita`)
      break
  }
  total.push(subtotal(cantidad(productos[opcion -1]), productos [opcion -1]))
}while(true)

//Interaccion con el vendedor del local
solicitarVentas();
informarGanancia();
informarSituacion();
if(ganancia <= 1000){
  respuestaSituacion();
}else{
  alert('Gracias por su colaboración')
}