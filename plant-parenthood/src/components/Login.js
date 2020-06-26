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

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    typo: '',
    username: '',
    password: ''
  })

  useEffect(() => {
    formSchema.isValid(props.login).then(valid => {
      setButtonDisabled(!valid)
    })
  }, [props.login])
  
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
    props.setLogin({...props.login, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('https://stark-sierra-74070.herokuapp.com/auth/login', props.login).then(res => {
      props.setCurrentUser(res)
      console.log(res);
      axios.get('https://stark-sierra-74070.herokuapp.com/plants', {
        headers: {
          authorization: props.currentUser.data.token
        }
      }).then(res => {
        props.setPlants(res.data)
        history.push(`plants/${props.login.username}`)
      })
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
        <Input id='username' type='text' name='username' value={props.login.username} onChange={handleChange} />
        {errors.username.length > 0 ? (<Error>{errors.username}</Error>) : null}

        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' name='password' value={props.login.password} onChange={handleChange} />
        {errors.password.length > 0 ? (<Error>{errors.password}</Error>) : null}
        {errors.typo.length > 0 ? (<Error>{errors.typo}</Error>) : null}
        
        {buttonDisabled === true ? (<Button type='submit' disabled={buttonDisabled}>Next</Button>) : (<Active type='submit' disabled={buttonDisabled}>Next</Active>) }
      </Form>
    </Container>
  )
}

export default Login;