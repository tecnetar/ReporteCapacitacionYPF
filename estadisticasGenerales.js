function generarEstadisticasGenerales(sortedData) {

    mostrarResultados();
    calcularTotalInscriptos();
    crearArrayConPersonas();
    let arrayResultados = calcularEstadisticas();
    crearGraficoDeTorta(arrayResultados)
    mostrarGraficoDeTorta();
}

function mostrarResultados() {
    $contenedorResultados.className = "contenedorResultados";
    $tablaDeResultados.className = "tablaDeResultados";
}

function calcularTotalInscriptos() {
    $totalInscriptos.innerText = sortedData.length / 3;
}

function crearArrayConPersonas() {
    let arrayProv = [];

    for(let i = 0; i < sortedData.length; i++) {
        if (arrayProv.length == 4) {
            arrayProv = [];
        }

        if (arrayProv.length == 3) {
            arrayProv.push(sortedData[i]["Completed Courses"])
            arrayNombresConCursos.push(arrayProv)
        }

        if (arrayProv.length == 2) {
            arrayProv.push(sortedData[i]["Completed Courses"])
        }

        if (arrayProv.length == 0) {
            arrayProv.push(sortedData[i]["First Name"] + " " + sortedData[i]["Last name"])
            arrayProv.push(sortedData[i]["Completed Courses"])
        }
    }
}

function calcularEstadisticas() {
    let contadorAlMenosUno = 0;
    let contadorNingunCurso = 0;

    arrayNombresConCursos.map(elem => {
        if (elem[1] == 0 && elem[2] == 0 && elem[3] == 0) {
            contadorNingunCurso++
        } else contadorAlMenosUno++
    })

    $alMenosUno.innerText = contadorAlMenosUno
    $ningunCurso.innerText = contadorNingunCurso

    return [contadorAlMenosUno, contadorNingunCurso]

}

function mostrarGraficoDeTorta() {
    $pieChartContainer.className = "pieChartContainer";
}