// on submit, retrieve correct data and present it in the cards on the page

// function to create the div for the information of that city that was submitted

let cityBig = $("#cityBig");
let cityBigContent = $(`<div class="p-3 border border-dark border-1px">
    <h2 id="cityTitle" class="w-100 p-1"></h2>
    <p class=""></p>
    <p class="">Wind: </p>
    <p class="">Humidity: </p>
  </div>
  <div class="pt-3">
    <h3 class="w-100">5 Day Forecast:</h3>
    <div class="row justify-content-around">
      <div id='dayCard' class="col-2 border border-dark border-1px bg-darkblue">
        <h4>Date</h4>
        <img></img>
        <p>Temp: </p>
        <p>Wind: </p>
        <p>Humidity: </p>
      </div>
      <div id='dayCard' class="col-2 border border-dark border-1px">
        <h4>Date</h4>
        <img></img>
        <p>Temp: </p>
        <p>Wind: </p>
        <p>Humidity: </p>
      </div>
      <div id='dayCard' class="col-2 border border-dark border-1px">
        <h4>Date</h4>
        <img></img>
        <p>Temp: </p>
        <p>Wind: </p>
        <p>Humidity: </p>
      </div>
      <div id='dayCard' class="col-2 border border-dark border-1px">
        <h4>Date</h4>
        <img></img>
        <p>Temp: </p>
        <p>Wind: </p>
        <p>Humidity: </p>
      </div>
      <div id='dayCard' class="col-2 border border-dark border-1px">
        <h4>Date</h4>
        <img></img>
        <p>Temp: </p>
        <p>Wind: </p>
        <p>Humidity: </p>
      </div>
    </div>
  </div>`);
// create a funciton to create and present empty div cards for the weather info to get put in later

function createCityBigCard() {
  let currentDay =  dayjs().format("M/D/YYYY")
  const search = $("#searchBtn");
  search.on("click", function () {
    const myKey = "bcb6773f3b002fedb6080301885d15d3";
    let lat;
    let lon;
    let cityName = $("#searchBar")
    let inputValue = cityName.val()
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&lat=${lat}&lon=${lon}&limit=1&appid=${myKey}`;

    cityBig.append(cityBigContent);
    let updateCityTitle = $("#cityTitle")

    $.ajax({
      url: apiUrl,
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          const latitude = item.lat;
          const longitude = item.lon;
          updateCityTitle.text(item.name + " " + currentDay)
          const secondUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${myKey}`

          $.ajax({
            url: secondUrl,
            success: function (data2) {

              // big card
              let temp = data2.list[0].main.temp
              let wind = data2.list[0].wind.speed
              let hum = data2.list[0].main.humidity

              // day 1 card
              let wind1 = data2.list[1].wind.speed
              let hum1 = data2.list[1].main.humidity
              // let icon = data2.list[0].weather[0].icon
              // var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";

              function fillCards(temp, wind, humidity){
                let temp1 = data2.list[1].main.temp
                cityBig.children().eq(1).children().eq(1).children().children().eq(2).text("Temp: " + temp1 + "°F")
              }

              fillCards(temp1)

              cityBig.children().eq(0).children().eq(1).text("Temp: " + temp + "°F")
              cityBig.children().eq(0).children().eq(2).text("Wind: " + wind + " MPH")
              cityBig.children().eq(0).children().eq(3).text("Humidity: " + hum + " %")

              // cityBig.children().eq(1).children().eq(1).children().children().eq(2).text("Temp: " + temp1 + "°F")
            },
          });
        }
      },
    });
  });
}

createCityBigCard();



// TODO
  // get icon pic
