import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import {Container, Active, Error, Input, Form, Label, Button, Title, LightTitle} from '../styles/forms';
import {useHistory} from 'react-router-dom';

const formSchema = yup.object().shape({
    username: yup.string().required('Must choose a username'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Must choose a password'),
    pw_confirm: yup.string().required('Must add a password confirmation'),
    phone_number: yup.string().required('Must add phone number'),
})

const Signup = props => {
  const history = useHistory();

  const [newUserVal, setNewUserVal] = useState({
    username: '',
    password: '',
    pw_confirm: '',
    phone_number: '',
  })

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
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
    formSchema.isValid(newUserVal).then(valid => {
      setButtonDisabled(!valid)
    })
  }, [newUserVal])

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
    setNewUserVal({...newUserVal, [e.target.name]: e.target.value});
    if (e.target.name !== 'pw_confirm') {
      setNewUser({...newUser, [e.target.name]: e.target.value})
    } 
  }

  const handleSubmit = e => {
    e.preventDefault()

    if(newUser.password === newUserVal.pw_confirm) {
      axios.post(' https://stark-sierra-74070.herokuapp.com/auth/register', newUser).then(res => {
        axios.post('https://stark-sierra-74070.herokuapp.com/auth/login', newUser).then(res => {
          console.log(res)
          props.setCurrentUser(res)
          props.setLogin(newUser)
          history.push('/addplant')
        })
      })
      .catch(err => {
        console.log('error', err)
        console.log(newUser)
      })
    } else {
      setErrors({...errors, pw_confirm: 'Passwords must match'})
    }
  }  
    
  return (
    <Container>
      <div>
        <Title>Lets get Started!</Title>
        <LightTitle>Create your account</LightTitle>
      </div>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' data-cy='username' type='text' name='username' value={newUserVal.username} onChange={handleChange} />
        {errors.username.length > 0 ? (<Error>{errors.username}</Error>) : null}
        
        <Label htmlFor='tel'>Phone Number</Label>
        <Input id='tel' data-cy='phone' type='tel' name='phone_number' value={newUserVal.phone_number} onChange={handleChange} />
        {errors.phone_number.length > 0 ? (<Error>{errors.phone_number}</Error>) : null}
        
        <Label htmlFor='password'>Password</Label>
        <Input id='password' data-cy='pass' type='password' name='password' value={newUserVal.password} onChange={handleChange} />
        {errors.password.length > 0 ? (<Error>{errors.password}</Error>) : null}
        
        <Label htmlFor='pwConfirm'>Confirm Password</Label>
        <Input id='pwConfirm' data-cy='confirm' type='password' name='pw_confirm' value={newUserVal.pw_confirm} onChange={handleChange} />
        {errors.pw_confirm.length > 0 ? (<Error>{errors.pw_confirm}</Error>) : null}
        {buttonDisabled === true ? (<Button type='submit' disabled={buttonDisabled}>Next</Button>) : (<Active data-cy='btn' type='submit' disabled={buttonDisabled}>Next</Active>) }
      </Form>
    </Container>
  )
}

export default Signup;