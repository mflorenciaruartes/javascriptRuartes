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

let sumatoria = 0
let ganancia = 0
let numeroVentas = 0
let porcentaje = 0

solicitarVentas();
informarGanancia();
informarSituacion();
if(ganancia <= 1000){
respuestaSituacion();
}else{
    alert('Gracias por su colaboración')
}

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
    while (opcionSeleccionada !== "ESC") {
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
    }
}
  