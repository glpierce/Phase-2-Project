import SearchBar from "./SearchBar"
import LocationCards from "./LocationCards"
import LocationDetail from "./LocationDetail"
import { useState } from "react"

function Weather({ weatherData }) {
    const [detailViewer, setDetailViewer] = useState(false);
    const { apparentTemperature, snowLevel } = weatherData
    // console.log( apparentTemperature.values )

    function parseDate (date) {
        const dateArray = []
        const workingArray = date.split("T")
        workingArray[0].split("-").map(dateComponent => dateArray.push(dateComponent))
        workingArray[1].slice(0, workingArray[1].indexOf("+")).split(":").map(timeComponent => dateArray.push(timeComponent))
        return new Date(Date.UTC(dateArray[0], dateArray[1], dateArray[2], dateArray[3], dateArray[4], dateArray[5]))
      }
    
      weatherData.apparentTemperature.values.forEach(value => (parseDate(value.validTime)))

    return(
        <div>
            {/* {apparentTemperature.values.map(value => <p>{value.validTime, value.value}</p>)} */}
            <SearchBar />
            {detailViewer ? <LocationDetail /> : <LocationCards />}
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