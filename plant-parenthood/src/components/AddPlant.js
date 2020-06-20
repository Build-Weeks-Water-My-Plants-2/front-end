import React from 'react';

const AddPlant = props => {
  const handleSubmit = e => {
    e.preventDefault()
  }  

  return (
    <div>
      <h3>Looking Good!</h3>
      <h3>Now, let's add your first plant</h3>
      <form onSubmit={handleSubmit}>
      <label htmlFor='radio1'>
          <input id='radio1' type='radio' name='img' />
          <img src='#' />
        </label>
        <label htmlFor='radio2'>
          <input id='radio2' type='radio' name='img' />
          <img src='#' />
        </label>
        <label htmlFor='radio3'>
          <input id='radio3' type='radio' name='img' />
          <img src='#' />
        </label>
        <label htmlFor='radio4'>
          <input id='radio4' type='radio' name='img' />
          <img src='#' />
        </label>
        <label htmlFor='plant'>
          Plant Name
          <input id='plant' type='text' />
        </label>
        <label htmlFor='maint'>
          Maintenance
          <select>
            <option></option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </label>
        <label htmlFor='species'>
          Species (optional)
          <input id='species' type='text' />
        </label>
        <button type='submit'>Next</button>
      </form>
      <button>Skip</button>
    </div>
  )
}

export default AddPlant;