//Variables
var searchInput = $("#search-input");
var searchBtn = $("#search-button");
var forecastToday = $("#today");
var forecastFiveDays = $("#forecast");
var latitude = "";
var longitude = "";

// Dates for Cards
var todayDate = dayjs();
var dayOne = todayDate.add(1, "day").format("DD/MM/YYYY");
var dayTwo = todayDate.add(2, "day").format("DD/MM/YYYY");
var dayThree = todayDate.add(3, "day").format("DD/MM/YYYY");
var dayFour = todayDate.add(4, "day").format("DD/MM/YYYY");
var dayFive = todayDate.add(5, "day").format("DD/MM/YYYY");
var fiveDayCardsArr = [dayOne, dayTwo, dayThree, dayFour, dayFive];

//Set search history array
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

createButtons()

function renderSearchHistoryBtns() {
  //Generate Buttons for City Search History
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  for (let i = 0; i < 10; i++) {
    if (i === searchHistory.length) {
      break;
    }
    var cityButton = $(`<button >${searchHistory[i]}</button>`);
    cityButton.addClass("btn btn-primary m-1");

    cityButton.on("click", () => {
      getWeather(searchHistory[i]);
    });
    $("#history").prepend(cityButton);
  }
}

//Add event listener to search button
searchBtn.on("click", (event) => {
  event.preventDefault();
  var citySearched = searchInput.val();
  getWeather(citySearched);
  searchInput.val('')
});

function saveToStorage(citySearched) {
  if (searchHistory.includes(citySearched)) {
    return;
  }
  searchHistory.unshift(citySearched);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  createButtons();
}

function createButtons() {
  $("#history").empty()
  for (let i = 0; i < searchHistory.length; i++) {
    var cityButton = $(`<button>${searchHistory[i]}</button>`);
    cityButton.addClass("btn btn-primary m-1");
    cityButton.on('click', function(){
      getWeather($(this).text())
    })
    $("#history").append(cityButton);
  }
}

function printWeatherInfo() {

}

function getWeather(citySearched) {
  $("#today").empty();
  $("#forecast").empty();

  var queryUrlCityCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=3c4f418d697258b26a8f47e2024d5b99`;

  fetch(queryUrlCityCoordinates)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      latitude = data[0].lat.toFixed(4);
      longitude = data[0].lon.toFixed(4);


      var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&&lon=${longitude}&appid=3c4f418d697258b26a8f47e2024d5b99`;

      fetch(queryURL)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {

          saveToStorage(data.city.name);
       
          

          var forecastHeading = $(
            `<h2>${
              data.city.name
            } ${todayDate.format(
              "(DD/MM/YYYY)"
            )} <img src="http://openweathermap.org/img/w/${
              data.list[0].weather[0].icon
            }.png"></h2>`
          );
          var forecastTemp = $(
            `<p>Temp: ${(data.list[0].main.temp - 273.15).toFixed(
              2
            )} &deg;C</p>`
          );
          var forecastWind = $(`<p>Wind: ${data.list[0].wind.speed} KPH</p>`);
          var forecastHumidity = $(
            `<p>Humidity: ${data.list[0].main.humidity}%</p>`
          );

          forecastToday.append(
            forecastHeading,
            forecastTemp,
            forecastWind,
            forecastHumidity
          );

          var fiveDayHeader = $(`<h4>5-Day Forecast</h4>`);
          forecastFiveDays.append(fiveDayHeader);

          var fiveDayCardData = [7, 15, 23, 31, 39];

          for (let i = 0; i < fiveDayCardData.length; i++) {
            var fiveDayCard = $(`<div class="card col-2 m-1">
             <div class="card-body">
                <h6>${fiveDayCardsArr[i]} </h6>
                <img id="pic" src="http://openweathermap.org/img/w/${
                  data.list[fiveDayCardData[i]].weather[0].icon
                }.png">
                <p id= "temp" class= "card-text">Temp: ${(
                  data.list[fiveDayCardData[i]].main.temp - 273.15
                ).toFixed(2)} &deg;C</p>
                <p id= "wind" class= "card-text">Wind: ${
                  data.list[fiveDayCardData[i]].wind.speed
                } KPH</p>
                <p id= "humidity" class= "card-text">Humidity: ${
                  data.list[fiveDayCardData[i]].main.humidity
                }%</p>
             </div>  
            </div>`);

            forecastFiveDays.append(fiveDayCard);
          }
        });
    });
}
