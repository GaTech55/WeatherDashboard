$(document).ready(function () {
  console.log("What's the good word?");
  var currentDay = moment().format("(MM/D/YYYY)");
  var apiKey = "a0d7c3074ce18b5e27c1432a4af93068";
  var name1 = $("#searchInput").val().trim();
  //          FUNCTION

  function searchCity(city) {
    var queryURL =
      "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      //   console.log(response);
      var cityName = $("<h3>").text(response.name);
      cityName.addClass("d-inline");
      var dateVar = $("<h3>").text(currentDay);
      dateVar.addClass("d-inline");
      var tempVar = $("<p>").text(
        "Temperature: " + response.main.temp + " \xB0F"
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
      //   console.log(response.coord.lat);
      //   console.log(response.coord.lon);
      var weatherIcon = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
      );

      $("#cardText").empty();
      $("#forecastTitle").empty();
      $("#card0").empty();
      $("#card1").empty();
      $("#card2").empty();
      $("#card3").empty();
      $("#card4").empty();
      $("#noBorder").attr(
        "style",
        "border: 1px solid rgba(0,0,0,.125) !important"
      );
      $("#cardText").append(
        cityName,
        " ",
        dateVar,
        weatherIcon,
        tempVar,
        humidityVar,
        windVar
      );

      //          UV INDEX

      var queryUVindex =
        "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/uvi?lat=" +
        latVar +
        "&lon=" +
        lonVar +
        "&appid=a0d7c3074ce18b5e27c1432a4af93068";
      //   console.log(queryUVindex);
      $.ajax({
        url: queryUVindex,
        method: "GET",
      }).then(function (responseUV) {
        // console.log(responseUV);
        var uvButton = $("<button>").text(responseUV.value);
        uvButton.addClass("d-inline");
        var uvValue = $("<div>").text("UV Index: ");
        uvValue.addClass("d-inline");

        if (responseUV.value >= 3 && responseUV.value <= 5) {
          uvButton.attr("class", "btn-warning");
        } else if (responseUV.value > 5) {
          uvButton.attr("class", "btn-danger");
        } else {
          uvButton.attr("class", "btn-success");
        }

        $("#cardText").append(uvValue, uvButton);
      });

      //          5 Day Forecast

      var queryUrlForecast =
        "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&cnt=5&appid=" +
        apiKey;
      //   console.log(queryUrlForecast);
      $.ajax({
        url: queryUrlForecast,
        method: "GET",
      }).then(function (response) {
        // console.log(response);
        var forecastTitle = "5-Day Forecast:";
        $("#forecastTitle").append(forecastTitle).prepend("<br>");
        // FOR LOOP
        for (var i = 0; i < 5; i++) {
          var date1 = moment()
            .add(i + 1, "days")
            .format("MM/DD/YYYY");
          //   var date1 = Date(response.list[i].dt * 1000);
          var icon1 = $("<img>").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.list[i].weather[0].icon +
              "@2x.png"
          );
          var temp1 = $("<p>").text(
            "Temp: " + response.list[i].main.temp + " \xB0F"
          );
          var hum1 = $("<p>").text(
            "Humidity: " + response.list[i].main.humidity + "%"
          );

          $("#card" + i)
            .append(date1, icon1, temp1, hum1)
            .addClass("card text-white bg-primary mb-3")
            .attr("style", "max-width: 30rem");
        }
      });
    });
  }

  // Event handler for user clicking the search button
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var cityKey = "NameInput" + inputCity,
      inputCity;
    var inputCity = $("#searchInput").val().trim();

    searchCity(inputCity);
    console.log(inputCity);
    localStorage.setItem("NameInput" + inputCity, inputCity);
    var newButton = $("<button>")
      .text(inputCity)
      .attr("id", inputCity)
      .addClass("listDkb btn btn-light btn-outline-dark");
    // $("#" + cityKey).val(localStorage.getItem(cityKey));
    newButton.val(localStorage.getItem(cityKey));
    $("#cityList").after(newButton);
  });

  //   $("#Atlanta").val(localStorage.getItem("NameInputAtlanta"));
});
