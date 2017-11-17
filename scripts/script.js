$(document).ready(function () {
  getLocation()
})

var myPlace = document.querySelector('.myPlace')
var myTemperature = document.querySelector('.myTemperature')
var description = document.querySelector('.description')
var icon = document.querySelector('.icon')
var loader = document.querySelector('.loader')
var change = document.querySelector('.change')
var fahr = document.querySelector('.fahr')
var cels = document.querySelector('.cels')
var iframe = document.querySelector('iframe')
var user_time = document.querySelector('.user-time')
var lat, long

function getLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    myPlace.innerHTML = 'Geolocation is not supported by this browser.'
  }
};

function showPosition (position) {
  var myLat = position.coords.latitude
  var myLong = position.coords.longitude

  $.ajax({
    url: 'https://fcc-weather-api.glitch.me/api/current?lat=' + myLat + '&lon=' + myLong,
    type: 'GET',

    success: function (data) {
      updateUI(data)
    },
    error: function () {
      description.innerHTML = 'Geolocation is not supported by the browser.'
      change.style.display = 'none'
    },
    beforeSend: function () {
      change.style.display = 'none'
    },
    complete: function () {
      var n = new Date()
      var y = n.getFullYear()
      var m = n.getMonth() + 1
      var d = n.getDate()
      cels.style.color = 'tomato'
      change.style.display = 'inline-block'
      loader.style.display = 'none'
      iframe.style.display = 'inline-block'
      user_time.style.display = 'inline-block'
      user_time.innerHTML = m + '/' + d + '/' + y
    }
  })

  function updateUI (data) {
    console.log(data)
    myPlace.innerHTML = data.name + ', ' + data.sys.country
    myTemperature.innerHTML = data.main.temp
    fahr.onclick = function () {
      var fahr = data.main.temp * 1.8 + 32
      myTemperature.innerHTML = fahr.toFixed(2)
      this.style.color = 'tomato'
      cels.style.color = 'white'
    }

    cels.onclick = function () {
      myTemperature.innerHTML = data.main.temp
      this.style.color = 'tomato'
      fahr.style.color = 'white'
    }

    description.innerHTML = data.weather[0].description
    var userTime = ''
    var today = new Date()
    var hour = today.getHours()
    if (hour > 6 && hour < 19) {
      userTime = 'day'
    } else {
      userTime = 'night'
    };

    switch (data.weather[0].description) {
      case 'clear sky':
        if (userTime = 'day') {
          icon.src = 'images/day.svg'
        } else {
          icon.src = 'images/night.svg'
        }
        break
      case 'few clouds':
        if (userTime = 'day') {
          icon.src = 'images/cloudy-day-1.svg'
        } else {
          icon.src = 'images/cloudy-night-1.svg'
        }
        break
      case 'scattered clouds':
        if (userTime = 'day') {
          icon.src = 'images/cloudy-day-2.svg'
        } else {
          icon.src = 'images/cloudy-night-2.svg'
        }
        break
      case 'broken clouds':
        if (userTime = 'day') {
          icon.src = 'images/cloudy-day-3.svg'
        } else {
          icon.src = 'images/cloudy-night-3.svg'
        }
        break
      case 'shower rain':
        icon.src = 'images/rainy-6.svg'
        break
      case 'light rain':
        icon.src = 'images/rainy-1.svg'
        break
      case 'thunderstorm':
        icon.src = 'images/thunder.svg'
        break
      case 'snow':
        icon.src = 'images/snowy-6.svg'
        break
      case 'mist':
        icon.src = 'images/snowy-1.svg'
        break
      default:
        icon.src = 'images/cloudy.svg'
        break
    };
  };
};
