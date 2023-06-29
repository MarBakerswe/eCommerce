import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive"
import { mobileSmall } from "../responsive"

// Create a styled component called "Container" using styled-components library
const Container = styled.div`
  height: 30px;
  background-color: #000;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  ${mobile({ fontSize: "12px" })} // Apply the specified styles when the screen size is below the "mobile" breakpoint
  ${mobileSmall({ fontSize: "10px", textAlign: "center" })} // Apply the specified styles when the screen size is below the "mobileSmall" breakpoint
`

const Announcement = () => {
  return (
    <Container>
      New Arrivings! Free Shipping on Orders Over $60!
    </Container>
  );
}

export default Announcement; 
