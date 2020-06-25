import React, {useState} from "react";
import {Route, Switch} from 'react-router-dom';
import "./App.css";
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import AddPlant from './components/AddPlant';

function App() {
  const [currentUser, setCurrentUser] = useState()

  return (
    <div className="App">
      <Nav />
      <Switch>
        
        <Route path='/login' >
          <Login setCurrentUser={setCurrentUser} />
        </Route>
        <Route path='/addplant'>
          <AddPlant currentUser={currentUser} />
        </Route>
        <Route path='/' >
          <Signup setCurrentUser={setCurrentUser} />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
