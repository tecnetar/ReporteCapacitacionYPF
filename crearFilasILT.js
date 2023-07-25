// Crear un elemento HTML por cada elemento del array de JSON de los cursos con INSTRUCTOR

function crearFilasILT(jsonFiltrado) {
    let contador = 0;

    jsonFiltrado.forEach(element => {
        if (contador == 3) contador = 0;

        // Crear los contenedores de texto
        const $panelFirstName = document.createElement("div");
        const $panelLastName = document.createElement("div");
        const $panelEmail = document.createElement("div");
        const $panelCourseName = document.createElement("div");
        const $panelStartDate = document.createElement("div");
        const $panelEndDate = document.createElement("div");

        // Crear los textos
        const $firstName = document.createElement("div");
        const $lastName = document.createElement("div");
        const $email = document.createElement("div");
        const $courseName = document.createElement("div");
        const $startDate = document.createElement("div");
        const $endDate = document.createElement("div");

        // Asigno la clase a los contenedores de texto
        $panelFirstName.className = "panelConBorde anchoUno alturaBaja";
        $panelLastName.className = "panelConBorde anchoUno alturaBaja";
        $panelEmail.className = "panelConBorde anchoDos alturaBaja";
        $panelCourseName.className = "panelConBorde anchoTres alturaBaja";
        $panelStartDate.className = "panelConBorde anchoUno alturaBaja";
        $panelEndDate.className = "panelConBorde anchoUno alturaBaja";

        // Asigno la clase a los textos
        $firstName.className = "textoGenerado";
        $lastName.className = "textoGenerado";
        $email.className = "textoGenerado";
        $courseName.className = "textoGenerado";
        $startDate.className = "textoGenerado";
        $endDate.className = "textoGenerado";


        // Limpiar el texto del nombre de curricula
        const regex1 = /ILA Group|ILA Argentina|[ - ]|Private /g;
        const nuevoCourseName = element["Course Name"].replace(regex1, "");

        $firstName.innerText = element["First Name"];
        $lastName.innerText = element["Last name"];
        $email.innerText = element["Email"];
        $courseName.innerText = nuevoCourseName;
        $startDate.innerText = element["Start Date"];
        $endDate.innerText = element["End Date"];
        
        // Agrego los contenedores al elemento padre que es el que tiene ID contenedor-textoGenerado
        $contenedorTextoGenerado.appendChild($panelFirstName);
        $contenedorTextoGenerado.appendChild($panelLastName);
        $contenedorTextoGenerado.appendChild($panelEmail);
        $contenedorTextoGenerado.appendChild($panelCourseName);
        $contenedorTextoGenerado.appendChild($panelStartDate);
        $contenedorTextoGenerado.appendChild($panelEndDate);
        
        // Agrego los textos al elemento padre que es el que tiene ID empezando con "panel"
        $panelFirstName.appendChild($firstName);
        $panelLastName.appendChild($lastName);
        $panelEmail.appendChild($email);
        $panelCourseName.appendChild($courseName);
        $panelStartDate.appendChild($startDate);
        $panelEndDate.appendChild($endDate);

        contador++
    });
}
