import React from "react";
import styled from "styled-components";
// import LoginImage from "../images/login-page.jpg"

import { mobileSmall } from "../responsive"
import { mobileLarge } from "../responsive"
import { tablet } from "../responsive"

import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(https://ecommercemcm.s3.us-west-1.amazonaws.com/4/marbaker.swe_website_banner_for_a_e-commerce_japanese_desiner_h_c6deee26-b839-4452-b143-2811a17a8c67.png);
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #fff;
  ${mobileLarge({ width: "75%" })}
  ${tablet({ width: "55%" })}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;

`

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #000;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  ${mobileSmall({ width: "70%" })};

  &:disabled {
    color: #000;
    cursor: not-allowed;
  }

`

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;

`

const Error = styled.span`
  color: red;
`

const Login = () => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  //useDispatch to trigger state updates
  const dispatch = useDispatch()
  //useSelector to extract and access specific slices of state from redux store
  const { isFetching, error } = useSelector((state) => state.user)


  const handleClick = (e) => {
    //preventDefault function is to stop default behavior of an event from occuring in a webpage
    e.preventDefault()
    login(dispatch, { username, password })
  }

  return (
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}/>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
            {error && <Error>Something went wrong...</Error>}
            <Link>Forgot Password?</Link>
             <Link>Create New Account</Link>
          </Form>
        </Wrapper>
      </Container>
  );
}

export default Login;
