import React, {useState, useEffect} from 'react';
import leafy from '../assets/DpphPG9ENsI.png';
import flower from '../assets/ls4OK8rINvc.png';
import succulent from '../assets/tcgMBsW4zlU.png';
import * as yup from 'yup';
import {Container, ImgContainer, Active, Error, Input, Form, Label, Button, Title, LightTitle} from '../styles/forms';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const formSchema = yup.object().shape({
  species: yup.string(),
  nickname: yup.string().required('Must add a nickname'),
  maintenance: yup.mixed().oneOf(['low', 'medium', 'high']).required('Must include maintenance level'),
  avatar_url: yup.string().required('Must choose avatar')
})

const AddPlant = props => {
  const history = useHistory();

  const [newPlant, setNewPlant] = useState({
    species: '',
    nickname: '',
    maintenance: '',
    avatar_url: '',
    happiness: false,
    user_id: props.currentUser.data.token,
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [errors, setErrors] = useState({
    species: '',
    nickname: '',
    maintenance: '',
    avatar_url: '',
  })

  useEffect(() => {
    formSchema.isValid(newPlant).then(valid => {
      setButtonDisabled(!valid)
    })
  }, [newPlant])

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
    setNewPlant({...newPlant, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://stark-sierra-74070.herokuapp.com/plants/', newPlant, {
      headers: {
        'Authorization': props.currentUser.data.token,
      }
    }).then(res => {
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
  }  

  return (
    <Container>
      <Title>Looking Good!</Title>
      {props.multi ? (<LightTitle>Now, let's add another plant!</LightTitle>) : (<LightTitle>Now, let's add your first plant!</LightTitle>)}
      
      <Form onSubmit={handleSubmit}>
      <ImgContainer>
        <label htmlFor='radio1'>
          <input id='radio1' data-cy='1' type='radio' name='avatar_url' value={leafy} onChange={handleChange} />
          <img src={leafy} alt="big leaf plant" />
        </label>
        <label htmlFor='radio2'>
          <input id='radio2' data-cy='2' type='radio' name='avatar_url' value={flower} onChange={handleChange} />
          <img src={flower} alt='leafy plant with small flowers' />
        </label>
        <label htmlFor='radio3'>
          <input id='radio3' data-cy='3' type='radio' name='avatar_url' value={succulent} onChange={handleChange} />
          <img src={succulent} alt='Close up of a succulent plant' />
        </label>
        <label htmlFor='radio4'>
          <input id='radio4' type='radio' name='avatar_url' onChange={handleChange} />
          <i className="fa fa-camera"></i>
        </label>
        {errors.avatar_url.length > 0 ? (<Error>{errors.avatar_url}</Error>) : null}
      </ImgContainer>

        <Label htmlFor='plant'>
          Plant Name
        </Label>
        <Input id='plant' data-cy='nickname' type='text' name='nickname' onChange={handleChange} />
        {errors.nickname.length > 0 ? (<Error>{errors.nickname}</Error>) : null}

        <Label htmlFor='maint'>
          Maintenance
        </Label>
        <select id='maint' data-cy='maint' name='maintenance' onChange={handleChange}>
          <option></option>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>
        {errors.maintenance.length > 0 ? (<Error>{errors.maintenance}</Error>) : null}

        <Label htmlFor='species'>
          Species (optional)
        </Label>
        <Input id='species' type='text' name='species' onChange={handleChange} />

        {buttonDisabled === true ? (<Button type='submit' disabled={buttonDisabled}>Next</Button>) : <Active type='submit' data-cy='btn' disabled={buttonDisabled}>Next</Active> }
      </Form>
      <button>Skip</button>
    </Container>
  )
}

export default AddPlant;