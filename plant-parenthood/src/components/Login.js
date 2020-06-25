import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import {Container, Form, Label, Input, Title, LightTitle, Button, Active, Error} from '../styles/forms';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const formSchema = yup.object().shape({
  username: yup.string().required('Must add a username'),
  password: yup.string().required('Must include password')
})

const Login = props => {
  const history = useHistory();

  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    typo: '',
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
  }

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('https://stark-sierra-74070.herokuapp.com/auth/login', login).then(res => {
      console.log(res)
      props.setCurrentUser(res)
    }).then((res) => {
      history.push(``)
    })
    .catch(err => {
      console.log(err)
      setErrors({...errors, typo: 'The username and password provided does not match our records'})
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
        {errors.typo.length > 0 ? (<Error>{errors.typo}</Error>) : null}
        
        {buttonDisabled === true ? (<Button type='submit' disabled={buttonDisabled}>Next</Button>) : (<Active type='submit' disabled={buttonDisabled}>Next</Active>) }
      </Form>
    </Container>
  )
}

export default Login;