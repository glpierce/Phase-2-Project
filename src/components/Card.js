import react from "react"
import { Link, useHistory } from "react-router-dom";

function Card({ coordinates, setSearchCoordinates, gridData: { temperature, relativeHumidity, windDirection, windSpeed, probabilityOfPrecipitation : precipitation }, degToCardinal, toggleDetail, setDetailData }) {
    const history = useHistory()
    
    function handleSearch() {
        setSearchCoordinates({searchCoordinates: coordinates, newSearch: false, savedSearch: true})
        // setDetailData({gridStatus: "pending", forecastStatus: "pending" })
        history.push("/weather/details")
    }
    return(
        // <Link to="/weather/details">
            <div onClick={handleSearch}>
                <h3>Location</h3> {/* Location needs to pull getAddress data down from Weather */}
                <ul>
                    <li>Current Temp: {(temperature?.values[0].value).toFixed(2)} &deg; {/* C/F ternary here */}</li>
                    <li>Wind: {(windSpeed?.values[0].value).toFixed(1)} {/* MPH/KPH ternary here */} {degToCardinal(windDirection?.values[0].value)}</li>
                    <li>Precipitation: {precipitation?.values[0].value}%</li>
                    <li>Relative Humidity: {relativeHumidity?.values[0].value}%</li>
                </ul>
            </div>
        // </Link>
    )
}

export default Card;