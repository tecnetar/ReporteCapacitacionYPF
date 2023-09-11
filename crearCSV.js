// Encabezado del archivo CSV

function pasarJSONaCSV() {
    let campos = ["First Name", "Last name", "Email", "Curriculum/Series Title", "Completed Courses", "Courses in Curriculum"];

    // Función para reemplazar un valor null con un string vacío.
    let replacer = function(key, value) { 
        return value === null ? '' : value
    }
    
    // Dado que los datos vienen en un JSON llamado "sortedData", tomo cada elemento y le aplico la función
    // replacer para convertir a string cada campo que se definió arriba.
    // Luego al final concateno cada elemento del array usando comas.
    let csv = sortedData.map(function(row) {
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
    
    console.log(csv)
}




