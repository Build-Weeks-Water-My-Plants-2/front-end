import React from 'react';
import {Link} from 'react-router-dom';
import AddPlant from './AddPlant';
import {Cta, List} from '../styles/styles'

const Plants = props => {


  console.log(props.currentUser);
  
  if(props.plants.length > 0) {
    return (
      <List>
        {props.plants.map(plant => (
            <div>
              <img src={plant.avatar_url} alt='plants avatar'/>
              <p>{plant.nickname}</p>
            </div>        
        ))}
        <AddPlant currentUser={props.currentUser} plants={props.plants} setPlants={props.setPlants} />
      </List>
    )
  }else {
    return (
      <div>
        <h2>No plants to display!</h2>
        <Link to='/addplant'><Cta>Add a Plant!</Cta></Link>
      </div>
    )
  }
}

export default Plants;