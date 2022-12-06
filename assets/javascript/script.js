// Global Variables

var searchBar = document.querySelector("#search-bar");
var searchCity = document.querySelector("#search-city");
var forecast = document.querySelector("#forecast");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var searchButton = document.querySelector(".search-button");

// Personal API Key

const APIKey = "e9533dd16d43d2d43a7b7da994956940";

// Function to execute when button is pressed to find weather for indicated city

function findCity(event) {
    event.preventDefault();
    var cityValue = searchCity.value || event.target.innerText
    searchCity.value = "";

    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIKey + "&units=imperial";

    fetch(cityURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            // .then(function(data) {
            //     let latitude = data.coord.lat;
            //     let longitude = data.coord.lon;
            //     weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
            // })

            // fetch(weatherURL)
            // .then(function(response){
            //     return response.json()
            //})

            displayWeather(data)
            getForecast(data.coord.lat, data.coord.lon)
        })
}

function displayWeather(data) {

    var cityName = document.createElement("h2");
    var temperature = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    var uv = document.createElement("p");
    var image = document.createElement("img");

    cityName.textContent = data.name + " " + dayjs().format("MM/DD/YY");
    temperature.textContent = "Temperature: " + data.main.temp + "°F ";
    wind.textContent = data.wind.speed + " mph winds ";
    humidity.textContent = data.main.humidity + "% ";
    image.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

    forecast.append(cityName, temperature, wind, humidity, image);
}

function getForecast(latitude, longitude) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial"

    fetch(forecastURL)
        .then(
            function (response) {
                if (response.ok) {
                    return response.json()
                }
            }
        ).then(
            function (forecastData) {
                console.log(forecastData)
            }
        )
}


// Button instructions 

$(document).on("click", ".search-button", findCity);
searchButton.addEventListener("click", findCity); 