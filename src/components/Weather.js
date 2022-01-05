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

    // const testDate = weatherData.apparentTemperature?.values[12].validTime.split("/")[0];
    // const d = new Date(testDate)
    // console.log(d);
    const d2 = new Date() /* Malleable */
    console.log("d2 is ",d2);
    
    // d < d2 ? console.log("false") : console.log("true")
    
    // const d3 = Date() /* Only spits out current time, does not evaluate correctly */
    // console.log("d3 is ",d3)

    const testArr = []
    weatherData.apparentTemperature?.values.map(value => testArr.push(value))

    // console.log(testArr.forEach(obj => console.log(new Date(obj.validTime.split("/")[0]))));

    console.log(testArr.filter(obj => new Date(obj.validTime.split("/")[0]) < d2 ? false : true))

    // console.log(Date(testArr[0].validTime.split("/")[0]))


// Default behaviors
// SearchBar Persistent on top of screen
// LocationCards get appended into Weather with (conditional render)
    // LocationCards are the thumbnail/preview/gist cards
// LocationDetail gets toggled onClick @Card (conditional render)
    // Detail includes card data; shows forecast and additional data

export default Weather;