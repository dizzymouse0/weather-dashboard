var city="";

// declaring variables
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty= $("#humidity");
var currentWSpeed=$("#wind-speed");

var sCity=[];

var APIKey="5c8e6d041a648b2382cb982ed4821ece";


function displayWeather(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(city){

  var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
  $.ajax({
      url:queryURL,
      method:"GET",
  }).then(function(response){

     
      console.log(response);
      // dta from server side Api for icon
      var weathericon= response.weather[0].icon;
      var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
      
      var date=new Date(response.dt*1000).toLocaleDateString();
     
      $(currentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");

      
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(currentTemperature).html((tempF).toFixed(2)+"&#8457");
      // humidity
      $(currentHumidty).html(response.main.humidity+"%");
      // wind speed
      var ws=response.wind.speed;
      var windsmph=(ws*2.237).toFixed(1);
      //convert to mph
      $(currentWSpeed).html(windsmph+"MPH");
    

    

  });
}

function forecast(cityid){
  var dayover= false;
  var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
  $.ajax({
      url:queryforcastURL,
      method:"GET"
  }).then(function(response){
      
      for (i=0;i<5;i++){
          var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
          var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
          var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
          var tempK= response.list[((i+1)*8)-1].main.temp;
          var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
          var humidity= response.list[((i+1)*8)-1].main.humidity;
      
          $("#fDate"+i).html(date);
          $("#fImg"+i).html("<img src="+iconurl+">");
          $("#fTemp"+i).html(tempF+"&#8457");
          $("#fHumidity"+i).html(humidity+"%");
      }
      
  });
}
//Click Handlers
$("#search-button").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
$("#clear-history").on("click",clearHistory);