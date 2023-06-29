import { Send } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

import { mobile } from "../responsive"
import { mobileSmall } from "../responsive"
import { tabletSmall } from "../responsive"

const Container = styled.div`
  height: 60vh;
  background-color: #000;
  color: gold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  letter-spacing: 3px;
  ${mobile({ fontSize: "55px" })}
  ${mobileSmall({ fontSize: "45px"  })}
`

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${tabletSmall({ textAlign: "center" })}
  ${mobileSmall({ fontSize: "20px" })}
`

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  ${mobile({ width: "80%" })}

`

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  font-size: 1.05rem;
  ${mobileSmall({ width: "50%" })}
`

const Button = styled.button`
  flex: 1;
  border: 1px solid #000;
  background-color: gold;
  color: #000;
  cursor: pointer;
`

const Newsletter = () => {
  return (
      <Container>
        <Title>
          Newsletter
        </Title>
        <Description>
          Receive our seasonal updates and discount opportunities
        </Description>
        <InputContainer>
          <Input placeholder="Your email">

          </Input>
          <Button>
              <Send />
          </Button>
        </InputContainer>
      </Container>
  );
}

export default Newsletter;
