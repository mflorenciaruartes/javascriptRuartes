//Desafio entregable clase 3 - solicitar ventas del dia para saber la ganancia segun el porcentaje
const NUMERO_VENTAS = parseFloat(prompt('Ingrese el numero de ventas realizadas el dia de hoy'))
const PORCENTAJE = parseFloat(prompt('Ingrese el porcentaje que le queda de ganancia'))
let sumatoria = 0
let ganancia = 0

for(let i=1; i<=NUMERO_VENTAS; i++){
    let ventas = prompt('ingrese la venta '+ i)
    sumatoria = sumatoria + parseFloat(ventas)
}
ganancia = (sumatoria*PORCENTAJE)/100
alert('Su ganancia del día de hoy es ' + ganancia)

while(ganancia >= 5000){
    alert('Felicitaciones alcanzaste un crédito de ventas')  
}
if(ganancia >= 3000){
    alert('Tus ganancias el día de hoy fueron aceptables')
}else if(ganancia >= 1000){
    alert('Tus ganancias el dia de hoy fueron bajas')
}else{
    alert('Hoy no fue un gran día pero podras mejorarlo')
}
