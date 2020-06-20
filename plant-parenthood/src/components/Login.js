import React, {useState, useEffect} from 'react';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

const Login = props => {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(login).then(valid => {
      setButtonDisabled(!valid)
    })
  }, [login])

  const handleChange = e => {
    setLogin({...login, [e.target.name]: e.target.value})
    console.log(login)
  }

  const handleSubmit = e => {
    e.preventDefault()

    setLogin({
      username: '',
      password: ''
    })
  }

  return (
    <div>
      <h3>Welcome back!</h3>
      <h3>Log into your account</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          Username
          <input id='username' type='text' name='username' value={login.username} onChange={handleChange} />
        </label>
        <label htmlFor='password'>
          Password
          <input id='password' type='password' name='password' value={login.password} onChange={handleChange} />
        </label>
        <button type='submit' disabled={buttonDisabled}>Next</button>
      </form>
    </div>
  )
}

export default Login;