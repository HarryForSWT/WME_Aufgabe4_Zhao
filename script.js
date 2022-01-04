var d3; // Minor workaround to avoid error messages in editors

window.onload = () => {
  makeDHs();//Test funktion
  var database;
  const keys=[
    "birth_rate_per_1000",
    "cell_phones_per_100",
    "children_per_woman",
    "electric_usage",
    "gdp_per_capita",
    "gdp_per_capita_growth",
    "inflation_annual",
    "internet_user_per_100",
    "life_expectancy",
    "military_expenditure_percent_of_gdp"
  ];
  lastSelected = keys[0];
  
  
  var svg1 = d3.select("#svg1");
  const svg1height= +svg1.attr("height") ;
  const svg1width= +svg1.attr("width");
  var svg2 = d3.select("#svg2");
  const svg2height= +svg2.attr("height") ;
  const svg2width= +svg2.attr("width");

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
    database = data;
    render(data);
  });


function render(data){
    d3.select("#svg1").selectAll("rect").remove();
    d3.selectAll("#yAxis").remove();
    var result;
    const xValue = d => d.name;
    var yValue =function (d) {
      switch(lastSelected){
        case "birth_rate_per_1000" :
          result= d.birth_rate_per_1000;
          break;
        case "cell_phones_per_100":
          result= d.cell_phones_per_100;
          break;
        case "children_per_woman":
          result= d.children_per_woman;
          break;
        case "electric_usage":
          result= d.electric_usage;
          break;
        case "gdp_per_capita":
          result= d.gdp_per_capita;
          break;
        case "gdp_per_capita_growth":
          result= d.gdp_per_capita_growth;
          break;
        case "inflation_annual":
          result= d.inflation_annual;
          break;
        case "internet_user_per_100":
          result= d.internet_user_per_100;
          break;
        case "life_expectancy":
          result= d.life_expectancy;
          break;
        case "military_expenditure_percent_of_gdp":
          result= d.military_expenditure_percent_of_gdp;
          break;
        default:
          break;
      }
      return result;
    };


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
    const g1 = svg1.append("g");
    const g2 = svg2.append("g");

    const xAxis = d3.axisLeft(xScale);
    const yAxis = d3.axisLeft(yScale);
    //y-Achse Zeichnen

    const yAxisG1 = g1
      .append("g")
      .call(yAxis)
      .attr("id","yAxis")
      .attr("transform", `translate(40,30)`);
   
    //x-Achse Zeichnen
   const xAxisG1 = g1
      .append("g")
      .call(xAxis)
      .attr('transform', `translate(40,180) rotate(270)`);



    //Daten in Balken visualisieren
    g1
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


  

  const option1 = d3.select("#bar1")
    .insert("select", ":first-child")
    .attr("id", "select1")
    .on("change", function () {
      lastSelected = this.value;
      render(database);
    })
    .selectAll("option")
    .data(keys)
    .enter()
    .append("option")
    .attr("value", function (d) { return d; })
    .text(function (d) { return d; })
     ;

    function removeBar(){
      d3.select("#svg1").selectAll("rect").remove();
    }

    d3.select("input").on("click", function () {
     removeBar();
 
    });

  





}



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
  