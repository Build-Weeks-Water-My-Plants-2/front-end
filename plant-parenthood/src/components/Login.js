import React, {useState} from 'react';

const Login = props => {
  const [login, SetLogin] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setLogin({...login, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <h3>Welcome back!</h3>
      <h3>Log into your account</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          Username
          <input id='username' type='text' name='username' onChange={handleChange} />
        </label>
        <label htmlFor='password'>
          Password
          <input id='password' type='password' name='password' onChange={handleChange} />
        </label>
        <button type='submit'>Next</button>
      </form>
    </div>
  )
}

export default Login;