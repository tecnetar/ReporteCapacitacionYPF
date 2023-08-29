// Crear un elemento HTML por cada elemento del array de JSON
// Este código se repite con respecto al del Reporte General sólo que en este caso no hace falta eliminar
// la primera y tercera fila.

function crearFilas(jsonFiltrado, tipoDeReporte) {
    let contador = 0;

    jsonFiltrado.forEach(element => {
        if (contador == 3) contador = 0;

        // Crear los contenedores de texto
        const $panelFirstName = document.createElement("div");
        const $panelLastName = document.createElement("div");
        const $panelEmail = document.createElement("div");
        const $panelCurriculum = document.createElement("div");
        const $panelCompleted1 = document.createElement("div");
        const $panelCoursesInCurriculum = document.createElement("div");
        const $panelCompleted2 = document.createElement("div");

        // Crear los textos
        const $firstName = document.createElement("div");
        const $lastName = document.createElement("div");
        const $email = document.createElement("div");
        const $curriculum = document.createElement("div");
        const $completed1 = document.createElement("div");
        const $coursesInCurriculum = document.createElement("div");
        const $completed2 = document.createElement("div");

        // Asigno la clase a los contenedores de texto
        $panelFirstName.className = "panelConBorde anchoUno alturaBaja";
        $panelLastName.className = "panelConBorde anchoUno alturaBaja";
        $panelEmail.className = "panelConBorde anchoDos alturaBaja";
        $panelCurriculum.className = "panelConBorde anchoDos alturaBaja";
        $panelCompleted1.className = "panelConBorde anchoUno alturaBaja";
        $panelCoursesInCurriculum.className = "panelConBorde anchoUno alturaBaja";
        $panelCompleted2.className = "panelConBorde anchoUno alturaBaja";

        // Asigno la clase a los textos
        $firstName.className = "textoGenerado";
        $lastName.className = "textoGenerado";
        $email.className = "textoGenerado";
        $curriculum.className = "textoGenerado";
        $completed1.className = "textoGenerado";
        $coursesInCurriculum.className = "textoGenerado";
        $completed2.className = "textoGenerado";

        // Limpiar el texto del nombre de curricula
        const regex1 = /YPF |iFIX & Historian|[(]|[)]/g;
        const nuevoCurriculum = element["Curriculum/Series Title"].replace(regex1, "");

        $firstName.innerText = element["First Name"];
        $lastName.innerText = element["Last name"];
        $email.innerText = element["Email"];
        $curriculum.innerText = nuevoCurriculum;
        $completed1.innerText = element["Completed Courses"];
        $coursesInCurriculum.innerText = element["Courses in Curriculum"];
        $completed2.innerText = Math.round((element["Completed Courses"] / element["Courses in Curriculum"]) * 100) + "%"

        // Agrego los contenedores al elemento padre que es el que tiene ID contenedor-textoGenerado
        $contenedorTextoGenerado.appendChild($panelFirstName);
        $contenedorTextoGenerado.appendChild($panelLastName);
        $contenedorTextoGenerado.appendChild($panelEmail);
        $contenedorTextoGenerado.appendChild($panelCurriculum);
        $contenedorTextoGenerado.appendChild($panelCompleted1);
        $contenedorTextoGenerado.appendChild($panelCoursesInCurriculum);
        $contenedorTextoGenerado.appendChild($panelCompleted2);

        // Agrego los textos al elemento padre que es el que tiene ID empezando con "panel"
        $panelFirstName.appendChild($firstName)
        $panelLastName.appendChild($lastName)
        $panelEmail.appendChild($email)
        $panelCurriculum.appendChild($curriculum)
        $panelCompleted1.appendChild($completed1)
        $panelCoursesInCurriculum.appendChild($coursesInCurriculum)
        $panelCompleted2.appendChild($completed2)

        // Filtro nombre, apellido e email en HTML y NO en el JSON
        if (tipoDeReporte == "ReporteGeneral") {
            if (contador == 0 || contador == 2) {

                $firstName.innerText = " ";
                $lastName.innerText = " ";
                $email.innerText = " ";
            }

            if (contador == 1) {
                $firstName.innerText = element["First Name"];
                $lastName.innerText = element["Last name"];
                $email.innerText = element["Email"];

                $panelFirstName.classList.add("bordeSupInfBlanco");
                $panelLastName.classList.add("bordeSupInfBlanco");
                $panelEmail.classList.add("bordeSupInfBlanco");
            }
        }

        contador++
    });
}
