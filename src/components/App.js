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
      console.log("fetching... ",middleMan2)
      setWeatherData(middleMan2)
      console.log("state set to... ",weatherData)
      // setWeatherData(data.properties)
      // console.log(weatherData)
    })
  }

  function convertDateTimes(valuesArray) {
    const filteredValuesArray = []
    valuesArray.forEach(valueObj => {
      const rawDate = valueObj.validTime
      const referenceWindow = parseDate(rawDate)
      const windowEnd = new Date(referenceWindow[0].toString())
      windowEnd.setHours(windowEnd.getHours()+referenceWindow[1])
      const currentDateTime = new Date()
      if (currentDateTime <= windowEnd) {
        filteredValuesArray.push({...valueObj, validTime: referenceWindow[0]})
      }
    })
    return filteredValuesArray
  }

  function parseDate (dateTimeString) {
    if (!dateTimeString) {
        return false
    }
    const dateArr = dateTimeString.split("/")
    const cleanDate = new Date(dateArr[0])
    let windowDuration 
    if (dateArr[1].includes("T")) {
      const step1 = dateArr[1].split("T")
      windowDuration = parseInt(step1[1].split("H")[0])
    } else {
      const step1 = dateArr[1].split("P")
      windowDuration = parseInt(step1[0].split("D")[0],10) * 24
    }
    return [cleanDate, windowDuration]
  }



    // const d2 = new Date() /* Malleable */
    
    // const testArr = []
    // weatherData.apparentTemperature?.values.map(value => testArr.push(value))

    // console.log(testArr)
    
    // console.log(testArr.filter(obj =>
    //     new Date(obj.validTime.split("/")[0])< d2 ? false : true))

    // console.log(d2.getHours())




  return (
    <>
      <PageHeader />
      <Weather weatherData={weatherData}/>
    </>
  );
}

export default App;