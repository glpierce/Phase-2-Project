

function DailyForecast({ forecast }) {
    return(
        <div>
            <h4>{forecast.name}</h4>
            <div>
                <p>{forecast.shortForecast}</p>
            </div>
        </div>
    )
}

export default DailyForecast