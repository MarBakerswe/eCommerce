import { Menu, Search } from '@mui/icons-material';
import { Badge } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from "react";
import styled from 'styled-components'

import { mobile } from "../responsive"
import { mobileSmall } from "../responsive"
import { tabletSmall } from "../responsive"

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//using Styled Componenets
//*** npm install styled-components or yarn add styled-components */
const Container = styled.div`
  height: 60px;
  // position: sticky;
  // top: 0;
  // z-index: 4;
  background-color: #fff;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0" })}
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const MenuIcon = styled.div`
  display: none;
  ${mobileSmall({ display: "block" })}
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  // ${mobile({ display: "none" })}
  ${tabletSmall({ display: "none"})}
`

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
//   ${mobileSmall({ display: "none" })}

// `
// //styled input creates input
// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}

// `

const Center = styled.div`
  flex: 1;
  text-align: center;
    ${mobileSmall({ textAlign: "left" })}
`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  ${mobileSmall({ paddingRight: "6rem" })}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
  ${mobileSmall({ display: "none" })}
`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ flex: 2, fontSize: "12px", marginLeft: "10px"})}
`

const Navbar = () => {
  //using cart from cartRedux.js
  const quantity = useSelector(state => state.cart.quantity)

  return (
    <Container>
        <Wrapper>
        <Left>
          <MenuIcon>
              <Menu />
          </MenuIcon>
          <Language>
            <Link to="/products/men" style={{ textDecoration: 'none', color: '#000' }}>
            <MenuItem>Men</MenuItem>
          </Link>
          </Language>
          <Language>
            <Link to="/products/women" style={{ textDecoration: 'none', color: '#000' }}>
            <MenuItem>Women</MenuItem>
          </Link>
          </Language>
          <Language>
            <Link to="/products/jeans" style={{ textDecoration: 'none', color: '#000' }}>
            <MenuItem>Jeans</MenuItem>
          </Link>
          </Language>
        </Left>
        <Center>
          <Logo>
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>MCM</Link>
          </Logo>
        </Center>
        <Right>
          <Link to="/register" style={{ textDecoration: 'none', color: '#000' }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: '#000' }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link to="/cart">
            <MenuItem>
          {/* badge and mail icon from material ui */}
          {/* using quantity from cartRedux.js */}
              <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlinedIcon />
              </Badge>
          </MenuItem>
          </Link>
        </Right>
        </Wrapper>
    </Container>
  );
}

export default Navbar;
