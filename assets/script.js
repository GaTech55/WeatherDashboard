$(document).ready(function () {
  //console log
  console.log("What's the good word?");
  var currentDay = moment().format("(MM/d/YYYY)");
  // function
  function searchCity(city) {
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=a0d7c3074ce18b5e27c1432a4af93068";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var cityName = $("<h3>").text(response.name);
      var dateVar = $("<h3>").text(currentDay);
      var tempVar = $("<p>").text(
        "Temperature: " + response.main.temp + "&deg; F"
      );
      var humidityVar = $("<p>").text(
        "Humidity: " + response.main.humidity + "%"
      );
      var windVar = $("<p>").text(
        "Wind Speed: " + response.wind.speed + " MPH"
      );
      var uvVar = $("<p>").text(response.main.temp);
      var latVar = $("<p>").text(response.coord.lat);
      var lonVar = $("<p>").text(response.coord.lat);
      var weatherIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
      );
      console.log(parseInt(latVar));
      console.log(parseInt(lonVar));
      $("#cardText").empty();
      $("#cardText").attr("class", "d-inline");
      $("#cardText").append(
        cityName,
        dateVar,
        weatherIcon,
        tempVar,
        humidityVar,
        windVar
      );
      //   $("#cardText").append(weatherIcon);
    });
    // function uvIndex()
  }

  // Event handler for user clicking the search button
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var inputCity = $("#searchInput").val().trim();
    searchCity(inputCity);
  });
});

// api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=a0d7c3074ce18b5e27c1432a4af93068
