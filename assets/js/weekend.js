var subjectObject = {
    "Front-end": {
      "HTML": ["Links", "Images", "Tables", "Lists"],
      "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
      "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]    
    },
    "Back-end": {
      "PHP": ["Variables", "Strings", "Arrays"],
      "SQL": ["SELECT", "UPDATE", "DELETE"]
    }
  }
  window.onload = function() {
    var subjectSel = document.getElementById("subject");
    var topicSel = document.getElementById("topic");
    var chapterSel = document.getElementById("chapter");
    for (var x in subjectObject) {
      subjectSel.options[subjectSel.options.length] = new Option(x, x);
    }
    subjectSel.onchange = function() {
      //empty Chapters- and Topics- dropdowns
      chapterSel.length = 1;
      topicSel.length = 1;
      //display correct values
      for (var y in subjectObject[this.value]) {
        topicSel.options[topicSel.options.length] = new Option(y, y);
      }
    }
    topicSel.onchange = function() {
      //empty Chapters dropdown
      chapterSel.length = 1;
      //display correct values
      var z = subjectObject[subjectSel.value][this.value];
      for (var i = 0; i < z.length; i++) {
        chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
      }
    }
  }
// hardcoded lat and lon will later be passed from map API
var lat = parseInt("40.7608");
var lon = parseInt("-111.8911");

// runs current weather api call with city name passed as a parameter
var getDailyWeather = function (lat, lon) {
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=c845404333af03f8f793eadcc58eeb29";


    fetch(forecastApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                // passes response data to display function
                displayDailyWeather(data);
            });
        };
    });

};

// recieves data parameter from getDailyWeather function and will dynamically display data to page
var displayDailyWeather = function (data) {

    for (var i = 0; i < 7; i++) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var dailyUnixTime = data.daily[i].dt;
        var millisecond = dailyUnixTime * 1000;

        var dailyDate = new Date(millisecond);
        var dailyDate = dailyDate.toLocaleString("en-US", options);

        var weatherList = $("<div>").addClass("columns");
        // need to add classes to style weather list ex: var cityname = $("<li>").addClass("new classes here").text(data.name);
        var date = $("<div>").text(dailyDate);
        var cityTemp = $("<div>").text("Tempurature: " + data.daily[i].temp.day + "F");
        var cityWind = $("<div>").text("Wind: " + data.daily[i].wind_speed + " Mph");
        var cityHumid = $("<div>").text("Humidity: " + data.daily[i].humidity + "%");
        var cityImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
        // appends weather info to <ul> as <li>
        weatherList.append(date, cityTemp, cityWind, cityHumid, cityImage);
        // appends <ul> to div with the id of weather
        $("#weather").append(weatherList);
    };
};

// calls getDailyWeather function to run current weather api with hard coded value of Salt Lake City
// will be changed to an event listener capturing the value of the user input city name
getDailyWeather(lat, lon);

