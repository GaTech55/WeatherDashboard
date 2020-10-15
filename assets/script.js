$(document).ready(function () {
  //console log
  console.log("What's the good word?");
  var currentDay = moment().format("(MM/D/YYYY)");
  var apiKey = "a0d7c3074ce18b5e27c1432a4af93068";
  // function
  function searchCity(city) {
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;
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
        "Temperature: " + response.main.temp + " \xB0 "
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

      //   api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
      var queryUrlForecast =
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&cnt=5&appid=" +
        apiKey;
      console.log(queryUrlForecast);
      $.ajax({
        url: queryUrlForecast,
        method: "GET",
      }).then(function (responseFive) {
        console.log(responseFive);
        var date1 = responseFive.list[0].dt_txt;
        var icon1 = responseFive.list[0].weather[0].icon;
        var temp1 = responseFive.list[0].main.temp;
        var hum1 = responseFive.list[0].main.humidity;
        $("#card1").append(date1, icon1, temp1, hum1);
      });
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

// On click for history list.  will use a get item
