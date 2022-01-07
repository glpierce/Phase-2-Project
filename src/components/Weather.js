import SearchBar from "./SearchBar"
import LocationCards from "./LocationCards"
import LocationDetail from "./LocationDetail"
import { useState, useEffect, useRef } from "react"
import { Route, Switch } from 'react-router-dom'

function Weather({ user }) {
    const [{searchCoordinates, newSearch, savedSearch}, setSearchCoordinates] = useState({searchCoordinates: null, newSearch: false, savedSearch: false})
    const [{coordinates, gridData, gridStatus, forecastData, forecastStatus}, setDetailData] = useState({coordinates: "", gridData: null, gridStatus: "idle", forecastData: null, forecastStatus: "idle"})
    const [{cardData, cardStatus}, setCardData] = useState({cardData: {}, cardStatus: "pending"})
    const [{cardsData, cardsStatus}, setCardsData] = useState({cardsData: [],  cardsStatus:"pending"})

    useEffect(() => { 
        console.log(searchCoordinates)
        if (newSearch) {
            setDetailData(state => ({...state, coordinates: searchCoordinates, gridStatus: "pending", forecastStatus: "pending"}))
            getWeatherStation(searchCoordinates)
        } else if (savedSearch) {
            const selectedCard = cardsData.find(card => card.coordinates === searchCoordinates)
            console.log(selectedCard)
            setDetailData(state => ({...state, coordinates: selectedCard.coordinates, gridData: selectedCard.grid, gridStatus: "fulfilled", forecastData: selectedCard.forecast, forecastStatus: "fulfilled"}))
        }
    }, [searchCoordinates])

    useEffect(() => {
        if (cardStatus === "fulfilled") {
            setCardsData(state => ({...state, cardsData: [...cardsData, cardData]}))
        // } else {
            // getSavedLocationsDB(user)
        }
    }, [user, cardStatus])

    function getSavedLocationsDB(user) {
        fetch(`http://localhost:WXYZ/users/${user}/savedLocations`)
        .then(resp => resp.json())
        .then(locations => {
            if (locations.length > 0) {
                locations.forEach(coords => {
                    setCardData(state => ({...state, cardData: {...cardData, coordinates: coords}}))
                    getWeatherStation(coords)
                })
            }
        })  //locations: array of coordinate strings
        .then(setCardsData(state => ({...state, cardsStatus: "fulfilled"})))
    }

    function getWeatherStation(coords) {
        fetch(`https://api.weather.gov/points/${coords}`)
        .then(resp => resp.json())
        .then(respData => {getGridData(respData.properties.forecastGridData, respData.properties.forecast)})
    }

    function getGridData(gridURL, forecastURL) {
        fetch(gridURL)
        .then(resp => resp.json())
        .then(data => {
            let middleMan1 = {}
            Object.keys(data.properties).forEach(key => {
                typeof data.properties[key] === "object" && (middleMan1[key] = data.properties[key])
            })
            let middleMan2 = {}
            Object.keys(middleMan1).forEach(key => {
                const workingObj = {}
                middleMan1[key].uom && (workingObj.uom = middleMan1[key].uom.split(":")[1]);
                (middleMan1[key].values) ? workingObj.values = convertDateTimes(middleMan1[key].values) : (workingObj.value = middleMan1[key].value);
                middleMan2[key] = workingObj
            })
            console.log("gridData fetched... ", middleMan2)
            if (newSearch) {
                setDetailData(state => ({...state, gridData: middleMan2, gridStatus: "fulfilled"}))
                getForecastData(forecastURL)
            } else {
                setCardData(state => ({...state, cardData: {...cardData, grid: middleMan2}}))
                getForecastData(forecastURL)
            }
        })
    }  

    function getForecastData(url) {
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            if (newSearch) {
                setDetailData(state => ({...state, forecastData: data.properties.periods, forecastStatus: "fulfilled"}))
            } else {
                setCardData(state => ({...state, cardData: {...cardData, forecast: data.properties.periods, cardStatus: "fulfilled"}}))
            }
        })
    }

    function postUserSubmit(locationDataObj) {
    const postObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(locationDataObj)
    }
    fetch(`http://localhost:8000/weatherData/`, postObj)
    /* http://localhost:8000/weatherData/:id? */
}
    
    function saveLocation(coordinates, locationData) {
        //push to server
        console.log(locationData)
        setCardsData(state => ({...state, cardsData: [...cardsData, locationData], cardsStatus: "fulfilled"}))
        console.log("saveLocation... ", locationData, cardsData)
        // postSavedLocationDataDB(cardsData)
        localGetTest()
    }

    function localGetTest(){
        fetch(`http://localhost:8000/users/2`)
        .then(r => r.json())
        .then(data => console.log("local savedLocations pull..." , data.savedLocations))
    }

    function getAddress(coordinates) {
        fetch(`https://geocode.xyz/?locate=${coordinates}&json=1`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            /* data needs to be returned -- create a state? */
            return ("getAddress: ",data.city, ", ", data.state)
            /* not functional -- tinkering logic, switched console.log to return */
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

    
    function degToCardinal(dir) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        dir += 22.5;
        dir < 0 ? dir = 360 - Math.abs(dir) % 360 : dir = dir % 360;
        let wind = parseInt(dir / 45);
        return `${directions[wind]}`;
    }

    return(
        <div>
            {/* {apparentTemperature.values.map(value => <p>{value.validTime, value.value}</p>)} */}
            <SearchBar setSearchCoordinates={setSearchCoordinates} />
            <Switch>
                <Route path= "/weather/saved">
                    {cardsStatus === "fulfilled" ? <LocationCards cardsData={cardsData} setSearchCoordinates={setSearchCoordinates} gridData={gridData} degToCardinal={degToCardinal} setDetailData={setDetailData} /> : <p>Loading...</p>}
                </Route>
                <Route path= "/weather/detail">
                    {gridStatus === "fulfilled" && forecastStatus === "fulfilled" ? <LocationDetail coordinates={coordinates} gridData={gridData} forecastData={forecastData} saveLocation={saveLocation} degToCardinal={degToCardinal} getAddress={getAddress} /> : <p>Loading...</p>}
                    {/* {<LocationDetail coordinates={coordinates} gridData={gridData} forecastData={forecastData} saveLocation={saveLocation} degToCardinal={degToCardinal} getAddress={getAddress} />} */}
                    {/* passed down getAddress for testing */}
                </Route>
            </Switch>
        </div>
    )
}

// Default behaviors
// SearchBar Persistent on top of screen
// LocationCards get appended into Weather with (conditional render)
    // LocationCards are the thumbnail/preview/gist cards
// LocationDetail gets toggled onClick @Card (conditional render)
    // Detail includes card data; shows forecast and additional data

export default Weather;