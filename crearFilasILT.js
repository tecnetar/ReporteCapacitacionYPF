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

        // Crear los textos
        const $firstName = document.createElement("div");
        const $lastName = document.createElement("div");
        const $email = document.createElement("div");
        const $courseName = document.createElement("div");

        // Asigno la clase a los contenedores de texto
        $panelFirstName.className = "panelConBorde anchoCorto alturaBaja";
        $panelLastName.className = "panelConBorde anchoCorto alturaBaja";
        $panelEmail.className = "panelConBorde anchoLargo alturaBaja";
        $panelCourseName.className = "panelConBorde anchoLargo alturaBaja";

        // Asigno la clase a los textos
        $firstName.className = "textoGenerado";
        $lastName.className = "textoGenerado";
        $email.className = "textoGenerado";
        $courseName.className = "textoGenerado";

        // Limpiar el texto del nombre de curricula
        // const regex1 = /YPF |iFIX & Historian|[(]|[)]/g;
        // const nuevoCurriculum = element["Curriculum/Series Title"].replace(regex1, "");

        $firstName.innerText = element["First Name"];
        $lastName.innerText = element["Last name"];
        $email.innerText = element["Email"];
        $courseName.innerText = "Nombre del curso";
        
        // Agrego los contenedores al elemento padre que es el que tiene ID contenedor-textoGenerado
        $contenedorTextoGenerado.appendChild($panelFirstName);
        $contenedorTextoGenerado.appendChild($panelLastName);
        $contenedorTextoGenerado.appendChild($panelEmail);
        $contenedorTextoGenerado.appendChild($panelCourseName);
        
        // Agrego los textos al elemento padre que es el que tiene ID empezando con "panel"
        $panelFirstName.appendChild($firstName)
        $panelLastName.appendChild($lastName)
        $panelEmail.appendChild($email)
        $panelCourseName.appendChild($courseName)

        contador++
    });
}
