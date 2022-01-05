

function LocationDetail({ weatherData, weatherData: { temperature, relativeHumidity, windDirection, windSpeed, probabilityOfPrecipitation : precipitation, degToCardinal, toggleDetail }}) {
    return(
        <div onClick={toggleDetail}>
            {/* leftpanel */}
            <p>This is the LocationDetail placeholder...</p>
            <h2>Location</h2>
            <li>Wind: {(windSpeed?.values[0].value).toFixed(1)} {/* MPH/KPH ternary here */} {degToCardinal(windDirection?.values[0].value)}</li>
            <li>Precipitation: {precipitation?.values[0].value}%</li>
            <li>Relative Humidity: {relativeHumidity?.values[0].value}%</li>
            {/* rightpanel */}
            {/* Forecasts, etc */}
        </div>
    )
}

export default LocationDetail;