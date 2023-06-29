import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile, mobileSmall, mobileLarge, tablet, screenLarge } from "../responsive"

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  border-radius: 3px;
  ${mobileSmall({ width: "80%", height: "80%", top: "10%", left: "10%"  })}
`

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 290px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: relative;
  border-radius: 3px;
  ${mobileSmall({ width: "50px", height: "100px"  })}
  ${mobile({ minWidth: "250px", height: "250px" })}
  ${screenLarge({ minWidth: "20%"})}

  &:hover ${Info}{
    opacity: 1;
  }
`

const Image = styled.img`
  height: 80%;
  z-index: 2;
  ${mobileSmall({ height: "80%" })}
  ${mobile({ height: "90%" })}
  ${mobileLarge({ height: "100%" })}
  ${tablet({ height: "60%"})}
`

const Icon = styled.div`
  width: 130px;
  height: 30px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  text-decoration: none;
  ${mobileSmall({ width: "50px", height: "50px" })}

  &:hover{
    background-color: gold;
    transform: scale(1.1);
  }
`

const Text = styled.span`
  color: #000; // adjust as needed
  font-size: 16px; // adjust as needed
`

const Product = ({item}) => {
  return (
    <Container>
      <Image src={item.img} /> 
      <Info>
        <Icon>
          {/* linking to specific product */}
          <Link to={`/product/${item._id}`}>
            <Text>VIEW ITEM</Text> {/* Replaced Icon with text */}
          </Link>
        </Icon>
      </Info>
    </Container>
  );
}

export default Product;
