
function crearGraficoDeBarras(jsonFiltrado) {
	const marginLeft = 60;
	const marginRight = 10;
	const marginTop = 5;
	const marginBottom = 130;
	let ancho = 1000;
	let alto = 500;

	const personaCurso = jsonFiltrado.map(elem => {
		return [elem["First Name"] + " " + elem["Last name"], elem["Completed Courses"]]
	})

	// d3.max no funciona bien en arrays desordenados. Tampoco anduvo con d3.extent
	// const maxY = d3.max(personaCurso, (d) => d[1]);
	// Por lo que me veo obligado a calcular el máximo sin usar la librería de D3.js
	const cantCompletada = jsonFiltrado.map(elem => elem["Completed Courses"])
	const maxY = Math.max(...cantCompletada)

	const xScale = d3.scaleBand()
		.domain(personaCurso.map((data) => data[0]))
		.range([marginLeft, ancho - marginRight])
		.paddingInner(0.03);

	const yScale = d3.scaleLinear()
		.domain([0, maxY])
		.range([alto - marginBottom, marginTop]);


	const svg = d3.select("#graficoContainer")
		.append("svg")
		.classed("graficoContainer", true) //container class to make it responsive
		// .attr("width", ancho)
		// .attr("height", alto)
		.attr("id", "canvas")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 1000 500");
		

	svg.selectAll("rect")
		.data(personaCurso)
		.enter()
		.append("rect")
		.attr("x", (data, i) => xScale(data[0]))
		.attr("y", (data, i) => yScale(data[1]))
		.attr("width", xScale.bandwidth())
		.attr("height", (data, i) => alto - yScale(data[1]) - marginBottom)
		.attr("fill", "#aaf")
		.attr("class", "bar");

	// Configurar ejes
	let xAxis = d3.axisBottom(xScale);
	let yAxis = d3.axisLeft(yScale).ticks(maxY)

	svg.append('g')
		.attr("transform", "translate(0," + (alto - marginBottom) + ")")
		.call(xAxis)
		.selectAll("text")
		.attr("class", "xAxis")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", "rotate(-30)");

	svg.append('g')
		.attr("transform", "translate(" + marginLeft + ",0 )")
		.call(yAxis)
		.selectAll("text")
		.attr("class", "yAxis")

}
