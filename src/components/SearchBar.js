import { useState } from 'react'

function SearchBar({newSearch}) {
    const [addressInput, setAddressInput] = useState("")

    function handleSearch() {
        newSearch(addressInput)
        setAddressInput("")
        {/* fetch function call to pull detail */}
    }

    return(
        <div>
            <input type="text" placeholder="Enter address..." value={addressInput} onChange={event => setAddressInput(event.target.value)}/>
            <button onClick={handleSearch}>DetailSearch</button>
            <button>AddLocation</button>
        </div>
    )
}

export default SearchBar;