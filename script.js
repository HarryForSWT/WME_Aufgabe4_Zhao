var d3; // Minor workaround to avoid error messages in editors

function makeDHs() {
  
  var canvas = d3
    .select("#map")
    .append("svg")
    .attr("width", 300)
    .attr("height", 300);

  var circle = canvas
    .append("circle")
    .attr("cx", 50)
    .attr("cy", 68)
    .attr("r", 27)
    .attr("fill", "transparent")
    .attr("stroke", "black")
    .attr("stroke-width", 4);

  var triangle = canvas
    .append("polygon")
    .attr("points", "50,3 98,98 2,98")
    .attr("fill", "transparent")
    .attr("stroke", "black")
    .attr("stroke-width", 4);

  var line = canvas
    .append("line")
    .attr("x1", 50)
    .attr("y1", 6)
    .attr("x2", 50)
    .attr("y2", 100)
    .attr("stroke", "black")
    .attr("stroke-width", 4);

}
  
window.onload = () => {
  makeDHs();

  var svg1 = d3.select("#svg1");
  const svg1height= +svg1.attr("height") ;
  const svg1width= +svg1.attr("width");
  var svg2 = d3.select("#svg2");
  const svg2height= +svg2.attr("height") ;
  const svg2width= +svg2.attr("width");


  const render = data => {
    
    const xValue = d => d.name;
    const yValue = d=> d.birth_rate_per_1000;

    //y "Wertebereich" dateneinstellen
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, yValue)])
      .nice()
      .range([150,0]);
    //x "Definitionsbereich" Dateneinstellen
    const xScale = d3
      .scaleBand()
      .domain(data.map(xValue))
      .range([0, svg1width-65])
      .padding(0.2);
    
    //Objekt "g" mit der generellen Translationseinstelleung
    const g = svg1
      .append("g");

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    //y-Achse Zeichnen

    const yAxisG = g
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(40,30)`);
   
    //x-Achse Zeichnen
   const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr('transform', `translate(40,180)`);
   

    //Daten in Balken visualisieren
    svg1
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(xValue(d))+40)
      .attr("y", d => yScale(yValue(d)))
      .attr("height", d => 150-yScale(yValue(d)))
      .attr("width", xScale.bandwidth())
      .attr("fill", "black")
      .attr('transform', `translate(0,30)`);


  };


  d3.csv("world_data_v1.csv").then(data => {
    data.forEach(d => {
      d.birth_rate_per_1000 = +d.birth_rate_per_1000;
      d.cell_phones_per_100 = +d.cell_phones_per_100;
      d.children_per_woman = +d.children_per_woman;
      d.electric_usage = +d.electric_usage;
      d.gdp_per_capita = +d.gdp_per_capita;
      d.gdp_per_capita_growth = +d.gdp_per_capita_growth;
      d.inflation_annual = +d.inflation_annual;
      d.internet_user_per_100 = +d.internet_user_per_100;
      d.life_expectancy = +d.life_expectancy;
      d.military_expenditure_percent_of_gdp = +d.military_expenditure_percent_of_gdp;
      d.gps_lat = +d.gps_lat;
      d.gps_long = +d.gps_long;
    });
    render(data);
  });







}


