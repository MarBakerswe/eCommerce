import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";

import { mobile } from "../responsive"
import { mobileLarge } from "../responsive"
import { tablet } from "../responsive"

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";
//used to send action object to redux store to update the state
import { useDispatch } from "react-redux";
import { addProduct } from '../redux/cartRedux';

const Container = styled.div`

`

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobileLarge({ padding: "10px", flexDirection: "column" })}
`

const ImageContainer = styled.div`
  flex: 1;
  ${mobileLarge({ display: "flex", justifyContent: "center"})}
`

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
   ${mobileLarge({ height: "60vh", width: "80%" })}
   ${tablet({ height: "100%", width: "100%" })}
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
  font-weight: 200;
`

const ProductDescription = styled.p`
  margin: 20px 0;
`

const Price = styled.span`
  weight: 100;
  font-size: 40px;
`



const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
  ${mobileLarge({ width: "60%" })}
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0 5px;
  cursor: pointer;
  border: ${props =>
  props.selected ? "2px solid gold" : "1px solid grey"};
`

const FilterSize = styled.select`
  margin-left: 5px;
  padding: 5px;
`

const FilterSizeOption = styled.option`

`

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobileLarge({ width: "100%" })}

`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: #fff;
  cursor: pointer;
  font-weight: bolder;
  color: teal;
    &:hover{
      transition: ease-in 0.5s;
      background-color: teal;
      color: #fff;
    }
`



const Product = () => {
  // using useLocation hook
  const location = useLocation()
  //thrid element from the pathname ex) localhost3000/Product/...
  const id = location.pathname.split("/")[2]
  const [product, setProduct] = useState({})
  //for adding and removing item before adding into cart
  const [quantity, setQuantity] = useState(1)
  //choosing color and size for each product
  const [color, setColor] = useState("")
  //for selecting color and border gold
  const [selectedColor, setSelectedColor] = useState("");
  const [size, setSize] = useState("")
  const dispatch = useDispatch()

  const handleColorClick = color => {
    setSelectedColor(color);
  };

  useEffect(() => {
    const getProduct = async () => {
      try{
        const res = await publicRequest.get("/products/find/" + id)
        setProduct(res.data)
      }catch(err) {}
    }
    getProduct()
  }, [id])

  const handleQuantity = (type) => {
    if (type === "decrease") {
      //decrease button and cannot be lower than 1
     quantity > 1 && setQuantity(quantity - 1)
    } else {
      //increase quantity
      setQuantity(quantity + 1)
    }
  }

  const handleClick = () => {
    //update cart - product and quantity
    //ALL product information, quantity, color and size
    dispatch(
      addProduct({ ...product, quantity, color, size})
      )
  }

  return (
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <ImageContainer>
            <Image src={product.img} />
          </ImageContainer>
          <InfoContainer>
            <Title>
              {product.title}
              </Title>
            <ProductDescription>
              {product.des}
              </ProductDescription>
              <Price>
                $ {product.price}
              </Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>
                    Color
                  </FilterTitle>
                    {product.color && product.color.map((c) => (
                      <FilterColor
                        color={c}
                        key={c}
                        selected={c === selectedColor}
                        onClick={() => {
                        setColor(c);
                        handleColorClick(c)} }
                        />
                    ))}
                </Filter>
                <Filter>
                  <FilterTitle>
                    Size
                  </FilterTitle>
                  <FilterSize onChange={(e)=>setSize(e.target.value)}>
                    {product.size && product.size.map((s) => (
                      <FilterSizeOption key={s}>{s}</FilterSizeOption>
                    ))}

                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity("decrease")}/>
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity("increase")}/>
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
              </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
  );
}

export default Product;
