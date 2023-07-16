var city="";
// variable declaration
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");
var currentUvindex= $("#uv-index");
var sCity=[];

var APIKey="5c8e6d041a648b2382cb982ed4821ece";
// Display the curent and future weather to the user after grabing the city form the input text box.
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

// Here we create the AJAX call
function currentWeather(city){
  // Here we build the URL so we can get a data from server side.
  var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
  $.ajax({
      url:queryURL,
      method:"GET",
  }).then(function(response){

      // parse the response to display the current weather including the City name. the Date and the weather icon. 
      console.log(response);
      //Dta object from server side Api for icon property.
      var weathericon= response.weather[0].icon;
      var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
      // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
      var date=new Date(response.dt*1000).toLocaleDateString();
     
      $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
    

    

  });
}
// render function
function loadlastCity(){
  $("ul").empty();
  var sCity = JSON.parse(localStorage.getItem("cityname"));
  if(sCity!==null){
      sCity=JSON.parse(localStorage.getItem("cityname"));
      for(i=0; i<sCity.length;i++){
          addToList(sCity[i]);
      }
      city=sCity[i-1];
      currentWeather(city);
  }

}

//Click Handlers
$("#search-button").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
$("#clear-history").on("click",clearHistory);