import React from "react";
import {Route, Switch} from 'react-router-dom';
import "./App.css";
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import AddPlant from './components/AddPlant';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        
        <Route path='/login' >
          <Login />
        </Route>
        <Route path='/addplant'>
          <AddPlant />
        </Route>
        <Route path='/' >
          <Signup />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
