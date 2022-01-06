import DailyForecast from './DailyForecast.js'
import { Link } from "react-router-dom";

function LocationDetail({ coordinates, gridData, forecastData, saveLocation, degToCardinal, getAddress }) {
    const { temperature, 
            apparentTemperature, 
            maxTemperature, 
            minTemperature, 
            relativeHumidity, 
            windDirection, 
            windSpeed, 
            probabilityOfPrecipitation : precipitation, 
            skyCover} = gridData

    function handleSave() {
        const locationData = {coordinates: coordinates, grid: gridData, forecast: forecastData}
        saveLocation(coordinates, locationData)
        //Toggle star/heart
    }

    function createForecast() {
        const dailyForecasts = forecastData.filter(forecast => forecast.isDaytime === true && (!forecast.name.includes("This") && !forecast.name.includes("Today")))
        const forecastElement =  dailyForecasts.map(forecast => <DailyForecast key={forecast.number} forecast={forecast}/>)
        return forecastElement
    }

    return(
        <div>
            <div>
                <h2>Address Placeholder</h2>
                {/* <h2>{getAddress(coordinates)}</h2> */}
                <button onClick={handleSave} >Save Button</button>
                <Link to={"/weather/saved"}>
                    <button>To Saved</button>
                </Link>
            </div>
            {/* leftpanel */}
            <div>
                <h3>Today:</h3>
                <div>
                    <p>High: {(maxTemperature?.values[0].value).toFixed(2)} &deg; {/* C/F ternary here */} | Low: {(minTemperature?.values[0].value).toFixed(2)} &deg; {/* C/F ternary here */}</p>
                    <h3>{(temperature?.values[0].value).toFixed(2)} &deg; {/* C/F ternary here */}</h3>
                    <h5>Feels Like: {(apparentTemperature?.values[0].value).toFixed(2)} &deg; {/* C/F ternary here */}</h5>
                </div>
                <h5>{forecastData[0].shortForecast}</h5>
                <ul>
                    <li>Precipitation: {precipitation?.values[0].value}%</li>
                    <li>Cloud Cover: {skyCover?.values[0].value}%</li>
                    <li>Relative Humidity: {relativeHumidity?.values[0].value}%</li>
                    <li>Wind: {(windSpeed?.values[0].value).toFixed(1)} {/* MPH/KPH ternary here */} {degToCardinal(windDirection?.values[0].value)}</li>
                </ul>
            </div>
            {/* rightpanel */}
            <div>
                {createForecast()}
            </div>
        </div>
    )
}

export default LocationDetail;