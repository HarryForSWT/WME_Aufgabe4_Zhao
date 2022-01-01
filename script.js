var d3; // Minor workaround to avoid error messages in editors

function makeDHs() {
  
  var canvas = d3
    .select("body")
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
}


