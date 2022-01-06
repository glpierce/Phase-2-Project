import { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchBar({ setSearchCoordinates }) {
    const [addressInput, setAddressInput] = useState("")

    function handleSearch() {
        getCoordinates(addressInput)
        setAddressInput("")
        {/* fetch function call to pull detail */}
    }

    function getCoordinates(address) {
        fetch(`https://geocode.xyz/?locate=${address}&json=1`)
        .then(resp => resp.json())
        .then(data => {
            console.log(`Hither 1, ${data.latt},${data.longt}`)
            setSearchCoordinates(state => ({...state, searchCoordinates: `${data.latt},${data.longt}`, newSearch: true, savedSearch: false}))
        }) //setSearchCoordinates(state => ({...state, coordinates: data, newSearch: true, savedSearch: false}))
      }

    function geolocate() {
        navigator.geolocation.getCurrentPosition(function(position) {
          let latLong =`${position.coords.latitude},${position.coords.longitude}`
          console.log(`Hither 1, ${latLong}`)
          setSearchCoordinates(state => ({...state, searchCoordinates: latLong, newSearch: true, savedSearch: false}))
        }, function(error) {
          alert(`${error.message}.`)
        })
    }

    return(
        <div>
            <input type="text" placeholder="Enter address..." value={addressInput} onChange={event => setAddressInput(event.target.value)}/>
            <Link to={"/weather/detail"} >
                <button onClick={handleSearch}>DetailSearch</button>
            </Link>
            <Link to={"/weather/detail"} >
                <button onClick={geolocate}>Current Locatioon</button>
            </Link>
        </div>
    )
}

export default SearchBar;