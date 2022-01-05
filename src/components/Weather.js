import SearchBar from "./SearchBar"
import LocationCards from "./LocationCards"
import LocationDetail from "./LocationDetail"
import { useState } from "react"

function Weather({ weatherData }) {
    const [detailViewer, setDetailViewer] = useState(false);
    
    function degToCardinal(dir) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      
        dir += 22.5;
      
        dir < 0 ? dir = 360 - Math.abs(dir) % 360 : dir = dir % 360;
      
        let wind = parseInt(dir / 45);
        return `${directions[wind]}`;
    }

    function toggleDetail(){
        console.log("STOP POKING MEEEEE!")
    }

    return(
        <div>
            {/* {apparentTemperature.values.map(value => <p>{value.validTime, value.value}</p>)} */}
            <SearchBar />
            {detailViewer ? <LocationDetail weatherData={weatherData} degToCardinal={degToCardinal} toggleDetail={toggleDetail} /> : <LocationCards weatherData={weatherData} degToCardinal={degToCardinal} toggleDetail={toggleDetail} />}
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