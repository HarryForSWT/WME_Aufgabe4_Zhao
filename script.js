var d3; 

window.onload = () => {

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

  //Karte OSM vorbereitung
  var map = L.map('map');
  var osm = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    });
  map.setView(new L.LatLng(51.3, 0.7), 2);
  map.addLayer(osm);
  L.control.scale({imperial: true, metric: true}).addTo(map);


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
    renderbarChart1(data);
    renderbarChart2(data);
  });

  var markers = new Array();
  function buildLeaflet(){
    markers.length=0;
    for(var l=0; l<database.length;l++){
      var lat_ = database[l].gps_lat;
      var long_ = database[l].gps_long;
      var name = database[l].name;
      var m = new L.marker({lat: lat_,lon: long_});
      m.bindPopup(lastSelected + "<br/>from:"+name + "<br/>"+ database[l][lastSelected]);
      m.addTo(map);
      markers.push(m);
      m.on('mouseover',function (d){
          var latitude = this._latlng.lat;       
          var x = document.querySelectorAll("."+findCountryName(latitude));
          x.forEach(function (d){return d.setAttribute("style", "fill: steelblue");})  
          
      });
      m.on('mouseout', function (d){
        var latitude = this._latlng.lat;       
        var x = document.querySelectorAll("."+findCountryName(latitude));
        x.forEach(function (d){return d.setAttribute("style", "fill: gray");})   
      });
    } 
         
  }
  
  function findCountryName(latitude){
    var countryName='not found';
    for(let i=0; i<database.length; i++){
      if(database[i].gps_lat==latitude){
        countryName= database[i].name;
        break;
      }
    }
    return countryName;
  }

  const xValue = d => d.name;
  var yValue =function (d) {
    var result;
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

 
  function renderbarChart1(data){
    buildLeaflet();
    d3.select("#svg1").selectAll("rect").remove();
    d3.selectAll("#yAxis1").remove();
    
      //y "Wertebereich" dateneinstellen
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, yValue), d3.max(data, yValue)])
      .nice()
      .range([149,0]);

   //x "Definitionsbereich" Dateneinstellen
   const xScale = d3
      .scaleBand()
      .domain(data.map(xValue))
      .range([0, svg1width-65])
      .padding(0.2);
  
    
    //Objekt "g" mit der generellen Translationseinstelleung
    const g1 = svg1.append("g");
    const xAxis = d3.axisLeft(xScale);
    const yAxis = d3.axisLeft(yScale);

    //y-Achse Zeichnen
    const yAxisG1 = g1
      .append("g")
      .call(yAxis)
      .attr("id","yAxis1")
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
      .attr("class",d=>d.name)
      .attr("x", d => xScale(xValue(d))+40)
      .attr("y", function(d){
        let result=0;
        if(lastSelected=="gdp_per_capita_growth"){
          if (yValue(d)>=0){
            return yScale(yValue(d));
          }else if(yValue(d)<0){
            return 68;
            
          }
        }else if(lastSelected=="inflation_annual"){
          if (yValue(d)>=0){
            return yScale(yValue(d));
          }else if(yValue(d)<0){
            return yScale(yValue(d))-10;
            
          }
        }
        result=yScale(yValue(d));
        return result;} )
      .attr("height", function(d){
        let result=0;

        if(lastSelected=="gdp_per_capita_growth"){
          if (yValue(d)>=0){
            return 68-yScale(yValue(d));
          }else if(yValue(d)<0){
            return yScale(yValue(d))-68;
            
          }
        }else if(lastSelected=="inflation_annual"){
          if (yValue(d)>=0){
            return 130-yScale(yValue(d));
          }else if(yValue(d)<0){
            return yScale(yValue(d))-130;
            
          }
        }
        result=150-yScale(yValue(d));
        return result;
      } )
      .attr("width", xScale.bandwidth())
      .attr("fill", "gray")
      .attr('transform', `translate(0,30)`);
  };

  const option1 = d3.select("#bar1")
    .insert("select", ":first-child")
    .attr("id", "select1")
    .on("change", function () {
      lastSelected = this.value;
      renderbarChart1(database);
    })
    .selectAll("option")
    .data(keys)
    .enter()
    .append("option")
    .attr("value", function (d) { return d; })
    .text(function (d) { return d; });

    const option2 = d3.select("#bar2")
    .insert("select", ":first-child")
    .attr("id", "select2")
    .on("change", function () {
      lastSelected = this.value;
      renderbarChart2(database);
    })
    .selectAll("option")
    .data(keys)
    .enter()
    .append("option")
    .attr("value", function (d) { return d; })
    .text(function (d) { return d; });

  function renderbarChart2(data){
    buildLeaflet();
    d3.select("#svg2").selectAll("rect").remove();
    d3.selectAll("#yAxis2").remove();
    
    //y "Wertebereich" dateneinstellen
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, yValue), d3.max(data, yValue)])
      .nice()
      .range([149,0]);
  
    //x "Definitionsbereich" Dateneinstellen
    const xScale = d3
      .scaleBand()
      .domain(data.map(xValue))
      .range([0, svg2width-65])
      .padding(0.2);
    
    //Objekt "g" mit der generellen Translationseinstelleung
    const g2 = svg2.append("g");
    const xAxis = d3.axisLeft(xScale);
    const yAxis = d3.axisLeft(yScale);
  
    //y-Achse Zeichnen
    const yAxisG2 = g2
      .append("g")
      .call(yAxis)
      .attr("id","yAxis2")
      .attr("transform", `translate(40,30)`);
  
    //x-Achse Zeichnen
    const xAxisG2 = g2
      .append("g")
      .call(xAxis)
      .attr('transform', `translate(40,180) rotate(270)`);
  
    //Daten in Balken visualisieren
    g2
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class",d=>d.name)
      .attr("x", d => xScale(xValue(d))+40)
      .attr("y", function(d){
        let result=0;
        if(lastSelected=="gdp_per_capita_growth"){
          if (yValue(d)>=0){
            return yScale(yValue(d));
          }else if(yValue(d)<0){
            return 68;
            
          }
        }else if(lastSelected=="inflation_annual"){
          if (yValue(d)>=0){
            return yScale(yValue(d));
          }else if(yValue(d)<0){
            return yScale(yValue(d))-10;
            
          }
        }
        result=yScale(yValue(d));
        return result;} )
      .attr("height", function(d){
        let result=0;
  
        if(lastSelected=="gdp_per_capita_growth"){
          if (yValue(d)>=0){
            return 68-yScale(yValue(d));
          }else if(yValue(d)<0){
            return yScale(yValue(d))-68;
            
          }
        }else if(lastSelected=="inflation_annual"){
          if (yValue(d)>=0){
            return 130-yScale(yValue(d));
          }else if(yValue(d)<0){
            return yScale(yValue(d))-130;
            
          }
        }
        result=150-yScale(yValue(d));
        return result;
      } )
      .attr("width", xScale.bandwidth())
      .attr("fill", "gray")
      .attr('transform', `translate(0,30)`);
  };

}

