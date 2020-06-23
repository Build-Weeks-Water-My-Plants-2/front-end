import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import {Container, Active, Error, Input, Form, Label, Button, Title, LightTitle} from '../styles/forms';

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
    <Container>
      <div>
        <Title>Lets get Started!</Title>
        <LightTitle>Create your account</LightTitle>
      </div>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' type='text' name='username' value={newUser.username} onChange={handleChange} />
        {errors.username.length > 0 ? (<Error>{errors.username}</Error>) : null}
        
        <Label htmlFor='tel'>Phone Number</Label>
        <Input id='tel' type='tel' name='phone_number' value={newUser.phone_number} onChange={handleChange} />
        {errors.phone_number.length > 0 ? (<Error>{errors.phone_number}</Error>) : null}
        
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' name='password' value={newUser.password} onChange={handleChange} />
        {errors.password.length > 0 ? (<Error>{errors.password}</Error>) : null}
        
        <Label htmlFor='pwConfirm'>Confirm Password</Label>
        <Input id='pwConfirm' type='password' name='pw_confirm' value={newUser.pw_confirm} onChange={handleChange} />
        {errors.pw_confirm.length > 0 ? (<Error>{errors.pw_confirm}</Error>) : null}
        {buttonDisabled === true ? (<Button type='submit' disabled={buttonDisabled}>Next</Button>) : <Active type='submit' disabled={buttonDisabled}>Next</Active> }
      </Form>
    </Container>
  )
}

export default Signup;