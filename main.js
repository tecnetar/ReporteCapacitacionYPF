const $contenedorTextoGenerado = document.getElementById("contenedor-textoGenerado");
const $totalInscriptos = document.getElementById("totalInscriptos");
const $alMenosUno = document.getElementById("alMenosUnCurso");
const $ningunCurso = document.getElementById("ningunCurso");
const $tablaDeResultados = document.getElementById("tablaDeResultados");

const $contenedorResultados = document.getElementById("contenedorResultados")
const $graficoContainer = document.getElementById("graficoContainer");
const $pieChartContainer = document.getElementById("pieChartContainer")

const $buttonContainer = document.getElementById("buttonContainer");
const $reporteGeneral = document.getElementById("reporteGeneral");
const $reporteFoundational = document.getElementById("reporteFoundational");
const $reporteIntermediate = document.getElementById("reporteIntermediate");
const $reporteAdvanced = document.getElementById("reporteAdvanced");
const $reporteInstructor = document.getElementById("reporteInstructor");

let jsonData;
let jsonDataILT;
let filteredData;
let sortedData;
let arrayNombresConCursos;
let tipoDeReporte = "ReporteGeneral";
let mesesArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let objetoDate = new Date();
let mesActual = objetoDate.getMonth();
let anioActual = objetoDate.getFullYear();


fetch('reporte.json')
  .then(response => response.json())
  .then(data => {
    
    // Asigno (copio) el JSON a un array para poder manipularlo como hacía antes con el input del usuario
    jsonData = [...data];

    // Manipular el JSON
    filteredData = filterNonYpfPeople(jsonData);
    sortedData = ordenarAlfabeticamente(filteredData);
    replaceWithZero(sortedData);

    // Resetear las listas generadas y diseños en pantalla
    borrarLista();
    borrarResultados();
    cambiarTituloGeneral();
    borrarCanvasAnterior();
    ocultarCanvasContainer();
    mostrarBotones();
    generarReporteGeneral(sortedData);

  })


  fetch('reporteILT.json')
  .then(response => response.json())
  .then(data => {
    
    // Asigno (copio) el JSON a un array para poder manipularlo como hacía antes con el input del usuario
    jsonDataILT = [...data]

    console.log(jsonDataILT);
  })

function filterNonYpfPeople(argumento) {
  // Quitar los elementos que no pertenezcan a YPF
  return argumento.filter(elem =>
    elem["Email"] != "marcos.perez@ilagroup.com" &&
    elem["Email"] != "ml.shiroma@tecnet-ibermatica.com.ar" &&
    elem["Email"] != "TEST@ypftest.comx")
}

function ordenarAlfabeticamente(argumento) {
  // Ordenar alfabeticamente
  return argumento.sort(function (elemA, elemB) {
    if (elemA["First Name"] < elemB["First Name"]) {
      return -1;
    }
    if (elemA["First Name"] > elemB["First Name"]) {
      return 1;
    }
    return 0;
  })
}

let replaceWithZero = function (argumento) {
  // Agregar un cero a los campos vacíos de "Cursos Completados"
  // No lo hago en el forEach para no recargar cada función y que sea legible a futuro
  argumento.map(elem => elem["Completed Courses"] == "" ? elem["Completed Courses"] = 0 : elem)
}


$reporteGeneral.onclick = function () {
  borrarLista();
  borrarResultados();
  cambiarTituloGeneral();
  borrarCanvasAnterior();
  ocultarCanvasContainer();
  tipoDeReporte = "ReporteGeneral";
  generarReporteGeneral(sortedData);
}

$reporteFoundational.onclick = function () {
  borrarLista();
  borrarResultados();
  cambiarTituloFoundational();
  borrarCanvasAnterior();
  mostrarCanvasContainer();
  tipoDeReporte = "curriculaFiltrada";
  generarReporteFoundational(sortedData);
}

$reporteIntermediate.onclick = function () {
  borrarLista();
  borrarResultados();
  cambiarTituloIntermediate();
  borrarCanvasAnterior();
  mostrarCanvasContainer();
  tipoDeReporte = "curriculaFiltrada";
  generarReporteIntermediate(sortedData);
}

$reporteAdvanced.onclick = function () {
  borrarLista();
  borrarResultados();
  cambiarTituloAdvanced();
  borrarCanvasAnterior();
  mostrarCanvasContainer();
  tipoDeReporte = "curriculaFiltrada";
  generarReporteAdvanced(sortedData);
}

$reporteInstructor.onclick = function () {
  borrarLista();
  borrarResultados();
  cambiarTituloInstructor();
  borrarCanvasAnterior();
  // mostrarCanvasContainer();
  tipoDeReporte = "curriculaFiltrada";
  // generarReporteAdvanced(sortedData);
}

function mostrarBotones() {
  $buttonContainer.className = "";
}

function borrarLista() {
  const $textosGenerados = document.querySelectorAll(".textoGenerado");
  const $panelesTextosGenerados1 = document.querySelectorAll(".panelConBorde");
  const $panelesTextosGenerados2 = document.querySelectorAll(".bordeSupInfBlanco");
  $textosGenerados.forEach(elem => elem.remove());
  $panelesTextosGenerados1.forEach(elem => elem.remove());
  $panelesTextosGenerados2.forEach(elem => elem.remove());
}

function borrarResultados() {
  $contenedorResultados.className = "oculto";
  $tablaDeResultados.className = "oculto";
  arrayNombresConCursos = [];
}

function borrarCanvasAnterior() {
  const $canvas = document.getElementById("graficoContainer")
  const $canvas2 = document.getElementById("pieChartContainer")
  if ($canvas || $canvas2) {
    d3.select("svg").remove();
  }
}

function mostrarCanvasContainer() {
  $graficoContainer.className = "graficoContainer";
}

function ocultarCanvasContainer() {
  $graficoContainer.className = "oculto";
  $pieChartContainer.className = "oculto";
}

function cambiarTituloGeneral() {
  document.querySelector("h1").textContent = "Reporte General de Capacitacion " + mesesArray[mesActual] + " " + anioActual;
}

function cambiarTituloFoundational() {
  document.querySelector("h1").textContent = "Avance de Capacitacion Foundational"
}

function cambiarTituloIntermediate() {
  document.querySelector("h1").textContent = "Avance de Capacitacion Intermediate"
}

function cambiarTituloAdvanced() {
  document.querySelector("h1").textContent = "Avance de Capacitacion Advanced"
}

function cambiarTituloInstructor() {
  document.querySelector("h1").textContent = "Avance de Capacitacion con Instructor"
}

function generarReporteGeneral(sortedData) {
  crearFilas(sortedData, tipoDeReporte);
  generarEstadisticasGenerales(sortedData);
}

function generarReporteFoundational(sortedData) {
  const tier1Filter = sortedData.filter(elem => elem["Curriculum/Series Title"] == "YPF Tier 1 - iFIX & Historian (Foundational)")
    .filter(elem => elem["Completed Courses"] > 0);

  crearFilas(tier1Filter, tipoDeReporte)
  crearGraficoDeBarras(tier1Filter);
}

function generarReporteIntermediate(sortedData) {
  const tier2Filter = sortedData.filter(elem => elem["Curriculum/Series Title"] == "YPF Tier 2 - iFIX & Historian (Intermediate)")
    .filter(elem => elem["Completed Courses"] > 0);

  crearFilas(tier2Filter, tipoDeReporte)
  crearGraficoDeBarras(tier2Filter);
}

function generarReporteAdvanced(sortedData) {
  const tier3Filter = sortedData.filter(elem => elem["Curriculum/Series Title"] == "YPF Tier 3 - iFIX & Historian (Advanced)")
    .filter(elem => elem["Completed Courses"] > 0);

  crearFilas(tier3Filter, tipoDeReporte)
  crearGraficoDeBarras(tier3Filter);
}