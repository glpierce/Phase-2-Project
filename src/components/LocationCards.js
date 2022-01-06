import { useState } from "react"
import Card from "./Card";

function LocationCards({ cardsData, setSearchCoordinates, degToCardinal, setDetailData }) {
    function createCards() {
        return cardsData.map(dataset => <Card key={dataset.coordinates} coordinates={dataset.coordinates} gridData={dataset.grid} setSearchCoordinates={setSearchCoordinates} degToCardinal={degToCardinal} setDetailData={setDetailData} />)
    }

    return(
        <div>
            {createCards()} 
        </div>
    )
}

export default LocationCards;