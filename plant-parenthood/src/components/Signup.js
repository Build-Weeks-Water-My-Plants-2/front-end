import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    username: yup.string().required('Must choose a username'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Must choose a password'),
    pw_confirm: yup.string().required('Must add a password confirmation'),
    phone_number: yup.string().required('Must add phone number'),
})

const Signup = props => {
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    pw_confirm: '', //add to state, validate it matches password, success: remove pw_confirm and pass on newUser, catch: throw error?
    phone_number: '',
  })

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    pw_confirm: '',
    phone_number: '',
  });

  useEffect(() => {
    formSchema.isValid(newUser).then(valid => {
      setButtonDisabled(!valid)
    })
  }, [newUser])

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors, 
          [e.target.name]: ''
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        })
      })
  }

  const handleChange = e => {
    e.persist();
    validateChange(e);
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
          {errors.username.length > 0 ? (<p className='error'>{errors.username}</p>) : null}
        </label>
        <label htmlFor='tel'>
          Phone Number
          <input id='tel' type='tel' name='phone_number' value={newUser.phone_number} onChange={handleChange} />
          {errors.phone_number.length > 0 ? (<p className='error'>{errors.phone_number}</p>) : null}
        </label>
        <label htmlFor='password'>
          Password
          <input id='password' type='password' name='password' value={newUser.password} onChange={handleChange} />
          {errors.password.length > 0 ? (<p className='error'>{errors.password}</p>) : null}
        </label>
        <label htmlFor='pwConfirm'>
          Confirm Password
          <input id='pwConfirm' type='password' name='pw_confirm' value={newUser.pw_confirm} onChange={handleChange} />
          {errors.pw_confirm.length > 0 ? (<p className='error'>{errors.pw_confirm}</p>) : null}
        </label>
        <button type='submit' disabled={buttonDisabled}>Next</button>
      </form>
    </div>
  )
}

export default Signup;