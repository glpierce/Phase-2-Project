

function DailyForecast({ forecast }) {
    return(
        <div>
            <h4>{forecast.name}</h4>
            <div>
                <img src={forecast.icon} />
                <p>{forecast.shortForecast}</p>
                <p>{forecast.detailedForecast}</p>
                <ul>
                    <li>{forecast.temperature} &deg;</li>
                </ul>
            </div>
        </div>
    )
}

export default DailyForecast



// function getSavedLocationDataDB(coords) {
//     fetch(`http://localhost:WXYZ/weatherData/${coords}`)
//     .then(resp => resp.json())
//     .then(data => setDetailData(data))
// }

// function weatherDataDBSetup () {
//     getSavedLocationsDB(user)
// }

// function getSavedLocationsDB(user) {
//     fetch(`http://localhost:WXYZ/users/${user}/savedLocations`)
//     .then(resp => resp.json())
//     .then(locations => getSavedLocationDataAPI(locations))  //locations: array of coordinate strings
// }

// function getSavedLocationDataAPI(locations) {
//     const savedLocationData = locations.map(coords => getWeatherStation(coords)) //savedLocationData: array of objects - [{id: coords, grid:gridData, forecast:forecastData}, ...]
//     savedLocationData.forEach(locationDataObj => postSavedLocationDataDB(locationDataObj)) 
// }

// function postSavedLocationDataDB(locationDataObj) {
//     const postObj = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(locationDataObj)
//     }
//     fetch(`http://localhost:WXYZ/weatherData/`, postObj)
// }

// function deleteOneSavedLocationDataDB(coords) {
//     const deleteObj = {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }
//     fetch(`http://localhost:WXYZ/weatherData/${coords}`, deleteObj)
// }

// function deleteAllSavedLocationDataDB() {
//     const putObj = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify([])
//     }
//     fetch(`http://localhost:WXYZ/weatherData/${coords}`, putObj)
// }