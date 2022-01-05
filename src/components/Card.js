import react from "react"

function Card({ weatherData, weatherData: { temperature, relativeHumidity, windDirection, windSpeed, probabilityOfPrecipitation : precipitation }, degToCardinal, toggleDetail }) {

    return(
    <div onClick={toggleDetail}>
        <h3>Location</h3>
        <ul>
            <li>Current Temp: {(temperature?.values[0].value).toFixed(2)} &deg; {/* C/F ternary here */}</li>
            <li>Wind: {(windSpeed?.values[0].value).toFixed(1)} {/* MPH/KPH ternary here */} {degToCardinal(windDirection?.values[0].value)}</li>
            <li>Precipitation: {precipitation?.values[0].value}%</li>
            <li>Relative Humidity: {relativeHumidity?.values[0].value}%</li>
        </ul>
    </div>
    )
}

export default Card;