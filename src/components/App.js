import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import './App.css';

function App() {
  const [space, setSpace] = useState([])
  const PLANETARY_URL = "https://api.le-systeme-solaire.net/rest/bodies/"
  const PLANET_FILTER = "?filter[]=isPlanet,neq,false"
  const WEATHER_URL = "https://api.weather.gov/points/"
  const WEATHER_KEY = "data.properties.forecastGridData"


  function getPlanets(){
    fetch(PLANETARY_URL+PLANET_FILTER)
    .then(r => r.json())
    .then(data => console.log(data))
  }

  function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude
      let long = position.coords.longitude
      let userCoords = `${lat},${long}`
    }, function(error) {
      alert(`${error.message},`)
    })
  }

  function getWeather(){
      fetch(WEATHER_URL+userCoords)
      .then(r => r.json())
      .then(data => console.log(data))
  }

  useEffect(()=>{
    getPlanets();
    getWeather();
  },[])

  return (
    <div className="App">
    </div>
  );
}

export default App;
