$(document).ready(function () {
  //console log
  console.log("Hello World");
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
    });
  }

  // Event handler for user clicking the search button
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var inputCity = $("#searchInput").val().trim();
    searchCity(inputCity);
  });
});

// api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=a0d7c3074ce18b5e27c1432a4af93068
