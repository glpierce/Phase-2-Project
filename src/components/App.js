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
    .then(data => {
      let middleMan1 = {}
      Object.keys(data.properties).forEach(key => {
        if (typeof data.properties[key] === "object") {
          middleMan1[key] = data.properties[key]
        }
      })
      let middleMan2 = {}
      Object.keys(middleMan1).forEach(key => {
        const workingObj = {}
        if (middleMan1[key].uom) {
          workingObj.uom = middleMan1[key].uom.split(":")[1]
        }
        if (middleMan1[key].values) {
          workingObj.values = convertDateTimes(middleMan1[key].values)
        } else {
          workingObj.value = middleMan1[key].value
        }
        middleMan2[key] = workingObj
      })
      console.log(middleMan2)
      setWeatherData(middleMan2)
    })
  }

  function convertDateTimes(valuesArray) {
    const filteredValuesArray = []
    valuesArray.forEach(valueObj => {
      const rawDate = valueObj.validTime
      const referenceWindow = parseDate(rawDate)
      const dateArray = referenceWindow[0]
      const windowEnd = new Date(Date.UTC(dateArray[0], dateArray[1], dateArray[2], (dateArray[3] + referenceWindow[1]), dateArray[4], dateArray[5]))
      const currentDateTime = new Date()
      if (currentDateTime <= windowEnd) {
        const convertedDate = new Date(Date.UTC(dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4], dateArray[5]))
        filteredValuesArray.push({...valueObj, validTime: convertedDate})
      }
    })
    return filteredValuesArray
  }

  function parseDate (dateTimeString) {
    if (!dateTimeString) {
        return false
    }
    const dateArray = []
    const workingArray1 = dateTimeString.split("/")
    const workingArray2 = workingArray1[0].split("T")
    workingArray2[0].split("-").map(dateComponent => dateArray.push(dateComponent))
    workingArray2[1].slice(0, workingArray2[1].indexOf("+")).split(":").map(timeComponent => dateArray.push(timeComponent))
    let windowDuration 
    if (workingArray1[1].includes("T")) {
      const step1 = workingArray1[1].split("PT")
      windowDuration = step1[0].split("H")
    } else {
      const step1 = workingArray1[1].split("P")
      windowDuration = parseInt(step1[0].split("D")) * 24
    }
    return [dateArray, windowDuration]
  }

  return (
    <>
      <PageHeader />
      <Weather weatherData={weatherData}/>
    </>
  );
}

export default App;