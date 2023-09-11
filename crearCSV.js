let csv = [];
let fileTitle = "reporteGenerado";


//Función de conversión de JSON a CSV
function pasarJSONaCSV() {
    // Encabezado del archivo CSV
    let campos = ["First Name", "Last name", "Email", "Curriculum/Series Title", "Completed Courses", "Courses in Curriculum"];

    // Función para reemplazar un valor null con un string vacío.
    let replacer = function(key, value) { 
        return value === null ? '' : value
    }
    
    // Dado que los datos vienen en un JSON llamado "sortedData", tomo cada elemento y le aplico la función
    // replacer para convertir a string cada campo que se definió arriba.
    // Luego al final concateno cada elemento del array usando comas.
    csv = sortedData.map(function(row) {
        return campos.map(function(fieldName){
          return JSON.stringify(row[fieldName], replacer)
        }).join(',')
    })

    // Los elementos del array "campos" los uno con comas formando un string
    // Luego ese string lo pongo al principio del CSV con "unshift".
    // De esa forma se crean las columnas de encabezado.
    csv.unshift(campos.join(','))
    
    // Finalmente uno cada elemento del array del CSV con caracteres de retorno de carro y nueva línea.
    csv = csv.join('\r\n');
    
    //console.log(csv)
}

// Función de exportado de CSV en navegador a un archivo en disco rígido
function exportarArchivo() {
    let exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}




