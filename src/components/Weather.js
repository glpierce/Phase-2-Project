import react from "react"
import SearchBar from "./SearchBar.js"
import LocationCards from "./LocationCards.js"
import LocationDetail from "./LocationDetail.js"

function Weather({weatherData}) {
    return(
        <div>
            <SearchBar />
            <LocationDetail />
            <LocationCards />
        </div>
    )
}

export default Weather