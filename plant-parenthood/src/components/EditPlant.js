import React from 'react';

const EditPlant = props => {
  
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <img></img>
      <button>Update Photo</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor='plant'>
          Plant Name
          <input id='plant' type='text' />
        </label>
        <label htmlFor='species'>
          Species (optional)
          <input id='species' type='text' />
        </label>
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  )
}

export default EditPlant;