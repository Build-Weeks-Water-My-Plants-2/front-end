import React, {useState} from "react";
import {Route, Switch} from 'react-router-dom';
import "./App.css";
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import AddPlant from './components/AddPlant';
import Plants from './components/Plants';

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [plants, setPlants] = useState([]);

  return (
    <div className="App">
      <Nav />
      <Switch>
        
        <Route path='/login' >
          <Login setCurrentUser={setCurrentUser} currentUser={currentUser} setPlants={setPlants} />
        </Route>
        <Route path='/plants/:user' >
          <Plants currentUser={currentUser} plants={plants} setPlants={setPlants} />
        </Route>
        <Route path='/addplant'>
          <AddPlant currentUser={currentUser} setPlants={setPlants} />
        </Route>
        <Route path='/' >
          <Signup setCurrentUser={setCurrentUser} />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
