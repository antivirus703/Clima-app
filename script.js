navigator.geolocation.getCurrentPosition(function (posicao) {
  let url =
    "http://nominatim.openstreetmap.org/reverse?lat=" +
    posicao.coords.latitude +
    "&lon=" +
    posicao.coords.longitude +
    "&format=json&json_callback=preencherDados";

  let script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
});

function preencherDados(dados) {
  alert(dados.address.city);
}

let weather = {
  apiKey: "14dbe3bb87123dfc86a149de1b179ce6",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&lang=pt_br&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Local não encontrado.");
          throw new Error("Local não encontrado.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, temp_min, temp_max, feels_like } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;
    document.querySelector(".city").innerText =
      "Clima em " + name + ", " + country;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "ºC";
    document.querySelector(".temp_min").innerText =
      "Mínima de: " + Math.round(temp_min) + "ºC";
    document.querySelector(".temp_max").innerText =
      "Máxima de: " + Math.round(temp_max) + "ºC";
    document.querySelector(".feels_like").innerText =
      "Sensação real: " + Math.round(feels_like) + "ºC";
    document.querySelector(".humidity").innerText =
      "Umidade do ar: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Velocidade do vento: " + Math.round(speed) + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

function searchResults(city) {
  fetch(
    `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
    })
    .then((response) => {
      displayResults(response);
    });
}

weather.fetchWeather("Foz do Iguaçu");

