import SearchBar from "./SearchBar"
import LocationCards from "./LocationCards"
import LocationDetail from "./LocationDetail"
import { useState } from "react"

function Weather({ weatherData }) {
    const [detailViewer, setDetailViewer] = useState(false);
    const { apparentTemperature, snowLevel } = weatherData
    // console.log( apparentTemperature.values )
    //console.log(weatherData.apparentTemperature)
    //console.log(weatherData.apparentTemperature?.values[0])
    //console.log(parseDate(weatherData.apparentTemperature?.values[0].validTime))

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