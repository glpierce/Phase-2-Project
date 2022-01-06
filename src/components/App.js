import logo from '../logo.svg';
import './App.css';
import { useEffect, useState, useRef } from "react"
import PageHeader from "./PageHeader.js"
import Home from "./Home.js"
import Weather from  "./Weather.js"
import Planets from "./Planets.js"
import { Route, Switch } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <PageHeader user={user}/>
      <Weather user={user}/>
      {/* <Switch>
        <Route path="/weather">
          <Weather user={user} />
        </Route>
        <Route path="/planets">
          <Planets/>
        </Route>
        <Route path="/">
          <Home setUser={setUser} />
        </Route>
      </Switch> */}
    </>
  );
}

export default App;




//getPlanets()

// function getPlanets() {
//   fetch(`https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,neq,false`)
//   .then(resp => resp.json())
//   .then(data => console.log(data))
// }