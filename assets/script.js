$(document).ready(function () {
  //console log
  console.log("What's the good word?");
  var currentDay = moment().format("(MM/D/YYYY)");
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
      cityName.addClass("d-inline");
      var dateVar = $("<h3>").text(currentDay);
      dateVar.addClass("d-inline");
      var tempVar = $("<p>").text(
        "Temperature: " + response.main.temp + " deg F"
      );
      var humidityVar = $("<p>").text(
        "Humidity: " + response.main.humidity + "%"
      );
      var windVar = $("<p>").text(
        "Wind Speed: " + response.wind.speed + " MPH"
      );
      var uvVar = $("<p>").text(response.main.temp);
      var latVar = response.coord.lat;
      var lonVar = response.coord.lon;
      console.log(response.coord.lat);
      console.log(response.coord.lon);
      var weatherIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
      );

      $("#cardText").empty();
      //   $("#cardText").attr("class", "d-inline");
      $("#cardText").append(
        cityName,
        dateVar,
        weatherIcon,
        tempVar,
        humidityVar,
        windVar
      );

      var queryUVindex =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        latVar +
        "&lon=" +
        lonVar +
        "&appid=a0d7c3074ce18b5e27c1432a4af93068";
      console.log(queryUVindex);
      $.ajax({
        url: queryUVindex,
        method: "GET",
      }).then(function (responseUV) {
        console.log(responseUV);
        var uvValue = $("<div>").text("UV Index: " + responseUV.value);
        console.log(responseUV.value);
        $("#cardText").append(uvValue);
      });

      //   https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
      var queryUrlForecast =
        "http://api.openweathermap.org/data/2.5/onecall?lat=" +
        latVar +
        "&lon=" +
        lonVar +
        "&appid=a0d7c3074ce18b5e27c1432a4af93068";
      console.log(queryUrlForecast);
    });
  }

  // Event handler for user clicking the search button
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var timeValue = inputCity;
    var inputCity = $("#searchInput").val().trim();
    searchCity(inputCity);
    localStorage.setItem(timeValue, inputCity);
  });
});

// api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=a0d7c3074ce18b5e27c1432a4af93068
