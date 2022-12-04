var searchBar = document.getElementById("#search-bar");
var searchCity = document.getElementById("#search-city");
var forecast = document.getElementById("#forecast");
var fiveDayForecast = document.getElementById("#5-day-forecast");

const APIKey = "e9533dd16d43d2d43a7b7da994956940";

function findCity(event) {
    event.preventDefault();
    var cityValue = searchCity.value;
    searchCity.value = "";
    
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?" + cityValue + "&appid=" + APIKey + "&units=imperial";
    
    fetch(cityURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data) {
        let latitude = data.coord.latitude;
        let longitude = data.coord.longitude;
        weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
    })

    fetch(weatherURL)
    .then(function(response){
        return response.json()
    })

}

