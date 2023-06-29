import styled from "styled-components";
import React from "react";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { sliderItems } from "../data";
// import { mobile } from "../responsive"
import { tabletSmall } from "../responsive"
import { tablet } from "../responsive"
import { Link } from "react-router-dom";




const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${tabletSmall({ display: "none"})}

`

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${ props => props.direction === "left" && "10px"};
  right: ${ props => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  &:hover {
    transition: ease-in-out 0.4s;
    opacity: 1;
  }
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.9s ease;
  transform: translateX(${props=>props.slideIndex * -100}vw);
`

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${props=>props.bg}

`

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  ${tablet({ display: "flex", alignItems: "center" })}
`

const Image = styled.img`
  height: 80%;
  ${tablet({ height: "60%"})}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`

const Title = styled.h1`
  font-size: 70px;
  letter-spacing: 1.5px;
`

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1.25px;
`

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  background-color: transparent;
  letter-spacing: 1.25px;
  cursor: pointer;

    &:hover {
    background-color: gold;
    transition: ease 0.5s;

    color: #000;
    border-color: #000;
  }
`

//arrow buttons that will reverse to original slide if reached to max slide
const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {

      if(direction === "left"){
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
      }
    };

    //automatically set moving slides every 10 seconds using useEffect
    useEffect(() => {
      const interval = setInterval(() => {
          setSlideIndex((prevIndex) =>
            prevIndex < sliderItems.length -1 ? prevIndex + 1 : 0
          );
        }, 10000);

        return () => clearInterval(interval)
      }, []);


  return (
      <Container>
        {/* arrow prop */}
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowBackIosNewOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item)=>(
            <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} alt={item.alt}/>
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button><Link to="/products/women" style={{ textDecoration: 'none', color: '#000'}}>SHOP NOW</Link></Button>
            </InfoContainer>
          </Slide>

            ))}

        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowForwardIosOutlined />
        </Arrow>

      </Container>
  );
}

export default Slider;
