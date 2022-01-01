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


  const render = data => {
    
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


