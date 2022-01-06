

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