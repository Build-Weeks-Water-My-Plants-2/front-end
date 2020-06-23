import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import {Container, Form, Label, Input, Title, LightTitle, Button, Active, Error} from '../styles/forms'

const formSchema = yup.object().shape({
  username: yup.string().required('Must add a username'),
  password: yup.string().required('Must include password')
})

const Login = props => {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    formSchema.isValid(login).then(valid => {
      setButtonDisabled(!valid)
    })
  }, [login])

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
    <Container>
      <Title>Welcome back!</Title>
      <LightTitle>Log into your account</LightTitle>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' type='text' name='username' value={login.username} onChange={handleChange} />
        {errors.username.length > 0 ? (<Error>{errors.username}</Error>) : null}

        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' name='password' value={login.password} onChange={handleChange} />
        {errors.password.length > 0 ? (<Error>{errors.password}</Error>) : null}
        
        {buttonDisabled === true ? (<Button type='submit' disabled={buttonDisabled}>Next</Button>) : (<Active type='submit' disabled={buttonDisabled}>Next</Active>) }
      </Form>
    </Container>
  )
}

export default Login;