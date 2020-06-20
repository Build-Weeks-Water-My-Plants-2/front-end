import React, {useState} from 'react';

const Signup = props => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    pw_confirm: '', //add to state, validate it matches password, success: remove pw_confirm and pass on newUser, catch: throw error?
    phone_number: '',
  })

  const handleChange = e => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
    console.log(newUser)
  }

  const handleSubmit = e => {
    e.preventDefault()

    setNewUser({
      username: '',
    password: '',
    pw_confirm: '',
    phone_number: '',
    })
  }

  return (
    <div>
      <h3>Lets get Started!</h3>
      <h3>Create your account</h3>
      <form onSubmit={handleSubmit}>
      <label htmlFor='username'>
          Username
          <input id='username' type='text' name='username' value={newUser.username} onChange={handleChange} />
        </label>
        <label htmlFor='tel'>
          Phone Number
          <input id='tel' type='tel' name='phone_number' value={newUser.phone_number} onChange={handleChange} />
        </label>
        <label htmlFor='password'>
          Password
          <input id='password' type='password' name='password' value={newUser.password} onChange={handleChange} />
        </label>
        <label htmlFor='pwConfirm'>
          Confirm Password
          <input id='pwConfirm' type='password' name='pw_confirm' value={newUser.pw_confirm} onChange={handleChange} />
        </label>
        <button type='submit'>Next</button>
      </form>
    </div>
  )
}

export default Signup;