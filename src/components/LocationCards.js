import Card from "./Card";

function LocationCards({ weatherData, degToCardinal, toggleDetail }) {
    return(
        <div>
            {/* map cards based on db.json (user catalog) here */}
            <Card weatherData={weatherData} degToCardinal={degToCardinal} toggleDetail={toggleDetail} />
        </div>
    )
}

export default LocationCards;