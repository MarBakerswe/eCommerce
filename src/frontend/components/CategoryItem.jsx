import React from "react";
import styled from "styled-components";
import { mobile, mobileSmall } from "../responsive"; // Importing responsive design helper functions
import { Link } from "react-router-dom";

//Using Styled Componenets
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })};
  ${mobileSmall({ height: "15vh" })};
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  color: #fff;
  margin-bottom: 20px;
  font-weight: bolder;
  font-size: 2.5rem;
  ${mobileSmall({ fontSize: "1rem" })};
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: gold;
  color: #000;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #fff;
    transition: ease-in-out 0.6s;
    color: #000;
    border-color: #fff;
  }
`;

// Creating a functional component "CategoryItem" that takes an item as a prop.
// It returns a JSX that uses the styled components defined above to show each category item.
// It contains a link to a dynamic route `/products/${item.cat}` where item.cat will be replaced by the category of the item.
const CategoryItem = ({item}) => { 
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img}/>
        <Info>
          <Title>
            {item.title}
          </Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
