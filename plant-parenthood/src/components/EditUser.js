import React from 'react';

const EditUser = props => {
  const handleChange = e => {
    //Not sure of the flow here just acting as if a setState for user will be passed in to the component
    props.setUser({...user, [e.target.name]: e.target.value}) //TBD
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor='userName'>
          Username
          <input id='userName' type='text' name='userName' value={props.user.userName} onChange={handleChange} />
        </label>
        <label htmlFor='tel'>
          Phone Number
          <input id='tel' type='tel' name='phone_number' value={props.user.phone_number} onChange={handleChange} />
        </label>
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  )
}

export default EditUser;