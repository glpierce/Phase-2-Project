import logo from '../logo.svg';
import './App.css';
import {useEffect} from "react"

function App() {

  useEffect(() => { 
    getPlanets()
    getWeather()
  },[])

  function getPlanets() {
    fetch(`https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,neq,false`)
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  function getWeather() {
    navigator.geolocation.getCurrentPosition(function(position) {
      let latLong =`${position.coords.latitude},${position.coords.longitude}`
      getWeatherStation(latLong)
    }, function(error) {
      alert(`${error.message}.`)
    })
  }

  function getWeatherStation(latLong) {
    fetch(`https://api.weather.gov/points/${latLong}`)
    .then(resp => resp.json())
    .then(data => getStationForecast(data.properties.forecastGridData))
  }

  function getStationForecast(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  return (<div/>);
}

export default App;
