// //If going the route of creating all cards with array of objects


// var dayOneIcon = document.createElement("img");
// dayOneIcon.src = "http://openweathermap.org/img/w/${data.list[7].weather[0].icon}.png"
// var dayOneTemp =  $(`<p>Temp: ${(data.list[7].main.temp - 273.15).toFixed(2)} &deg;C</p>`);
// var dayOneWind = $(`<p>Wind: ${data.list[7].wind.speed} KPH</p>`);
// var dayOneHumidity = $(`<p>Humidity: ${data.list[7].main.humidity}%</p>`);

// var cardsArray = [
//     {
//         date: dayOne,
//         icon: dayOneIcon,
//         temp: dayOneTemp,
//         wind: dayOneWind,
//         humidity: dayOneHumidity
//     },
//     {
//         date: dayTwo,
//         icon: dayOneIcon,
//         temp: $(`<p>Temp: ${(data.list[15].main.temp - 273.15).toFixed(2)} &deg;C</p>`),
//         wind: $(`<p>Wind: ${data.list[15].wind.speed} KPH</p>`),
//         humidity: $(`<p>Humidity: ${data.list[15].main.humidity}%</p>`)
//     },
//     {
//         date: dayThree,
//         icon: dayOneIcon,
//         temp: dayOneTemp,
//         wind: dayOneWind,
//         humidity: dayOneHumidity
//     },
//     {
//         date: dayFour,
//         icon: dayOneIcon,
//         temp: dayOneTemp,
//         wind: dayOneWind,
//         humidity: dayOneHumidity
//     },
//     {
//         date: dayFive,
//         icon: dayOneIcon,
//         temp: dayOneTemp,
//         wind: dayOneWind,
//         humidity: dayOneHumidity
//     },

// ];

// var tempEl = "";

//           for(let i = 0; i < cardsArray.length; i++) {
//             var fiveDayCard = $(`<div class="card col-2 m-1">
//                <div class="card-body">
//                <h5 class="card-title"> cardsArray[i].date.text() </h5>
//                <p class="card-text">cardsArray[i].icon.text()</p>
//                <p class="card-text">cardsArray[i].temp.text()</p>
//                <p class="card-text">cardsArray[i].wind.text()</p>
//                <p class="card-text">cardsArray[i].humidity.text()</p>


//                </div>
//               </div>`);
