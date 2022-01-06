import Card from "./Card";

function LocationCards({ gridData, degToCardinal }) {
    return(
        <div>
            {/* map cards based on db.json (user catalog) here */}
            <Card gridData={gridData} degToCardinal={degToCardinal} />
        </div>
    )
}

export default LocationCards;