import React from 'react';
import {Link} from 'react-router-dom';
import AddPlant from './AddPlant';
import {Cta, List, Container} from '../styles/styles';

const Plants = props => {
  console.log(props.currentUser);
  
  if(props.plants.length > 0) {
    return (
      <Container>
        <List>
          {props.plants.map(plant => (
              <div key={plant.id}>
                {console.log(plant)}
                <img src={plant.avatar_url} alt='plants avatar'/>
                <p>{plant.nickname}</p>
              </div>        
          ))}
        </List>
        <AddPlant currentUser={props.currentUser} plants={props.plants} setPlants={props.setPlants} login={props.login} multi='true' />
      </Container>
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