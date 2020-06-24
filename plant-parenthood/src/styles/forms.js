import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #F2F3F2;
  width: 33vw;
  margin: 20vh auto 20vh;
  opacity: 0.95;
`

export const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  width: 70%;
  margin: auto;
  justify-content: space-evenly;
`

export const Label = styled.label`
  margin-top: 3%;
`

export const Input = styled.input`
  height: 2rem;
  border: none;
  padding-left: 5px;
`

export const Title = styled.h3`
  margin-top: 5%;
  text-align: center;
`

export const LightTitle = styled.h3`
  margin-bottom: 5%;
  text-align: center;
  font-weight: 200;
`

export const Button = styled.button`
  display: block;
  width: 60%;
  margin: 5% auto;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background: #79867C;
  color: #fff;
`
export const Active = styled(Button)`
  background: #235B2D;
`

export const Error = styled.p`
  font-size: .75rem;
  color: red;
`

export const ImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: auto;
`
