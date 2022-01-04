import logo from '../logo.svg';
import './App.css';
import {useEffect, useState} from "react"
import Weather from  "./Weather.js"
import PageHeader from "./PageHeader.js"

function App() {

  const [weatherData, setWeatherData] = useState({})

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
    .then(data => {
      getStationForecast(data.properties.forecastGridData)
    })
  }

  function getStationForecast(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(data => setWeatherData(data.properties))
  }

  return (
    <>
      <PageHeader />
      <Weather weatherData={weatherData}/>
    </>
  );
}

export default App;
