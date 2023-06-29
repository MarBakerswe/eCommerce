import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive"
import { mobileLarge } from "../responsive"
import { tablet } from "../responsive"
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout"
import { useState } from "react";
import { Link } from "react-router-dom";




const KEY = "sk_test_51NIrLxEkNg4eAb3UbCXGMDFseAup62r6SGcZCqL2qzbnCE8m00QgI9DVEGwevsw6eWHuTNIPzuCq6O3sjtRdOLMS009ejopbeV"

const Container = styled.div`

`

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
  // ${tablet({ display: "flex", flexWrap: "wrap", flexDirection: "column" })}
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${tablet({ display: "flex", flexWrap: "wrap" })}
`
const TopButton = styled.button`
  padding: 0;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: #000;
  color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #fff;
      color: #000;

    }
`
const TopButtonTwo = styled.button`

  padding: 15px;
  background-color: #fff;
  color: #000;
  font-weight: bolder;
  font-size: 17px;
  letter-spacing: 1.5px;
  border: 3px solid #000;
  transition: ease-in 0.4s;
  cursor: pointer;
    &:hover {
      background-color: #000;
      color: #fff;

    }
`

const TopTexts = styled.div`

`

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  ${tablet({ display: "none" })}
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
  flex: 3;
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-top: 1rem;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
`
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Image = styled.img`
  width: 200px;
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span`

`

const ProductId = styled.span`

`

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`

const ProductSize = styled.span`

`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-right: 10px;
  display: flex;
  align-items: center;
  ${mobile({ marginBottom: "20px", fontWeight: "bolder" })}
  `

const MoneySymbol = styled.span`
  font-size: 20px;
  font-weight: 1000;
  margin: 3px;
`

// const MoneySymbolSmall = styled.span`
//   font-size: 12px;

// `


const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  padding: 20px;
  height: 50vh;
  ${mobileLarge({ width: "70vw", marginLeft: "-10px" })}
`

const SummaryTitle = styled.h1`
  font-weight: 600;
`

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "bolder"};
  font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span`

`

const SummaryItemPrice = styled.span`

`

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #000;
  color: #fff;
  font-weight: bolder;
  font-size: 17px;
  letter-spacing: 1.5px;
  border: 3px solid #000;
  transition: ease-in 0.4s;
  cursor: pointer;
    &:hover {
      background-color: #fff;
      color: #000;

    }

`



const Cart = () => {
  //retrieves the value of cart state from redux store and assign it to cart variable
  const cart = useSelector(state => state.cart) // useSelector is a hook that allows you to extract data from the Redux store state, using a selector function.
  const [stripeToken, setStripeToken] = useState(null) //stripeToken is a state variable that is set to null

  const onToken = (token) => {
    setStripeToken(token) //setStripeToken is a function that takes in a token and sets the state of stripeToken to that token
  }
  console.log(stripeToken)
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>
          YOUR CART
        </Title>
        <Top>
          <Link to="/">
            <TopButtonTwo>
              CONTINUE SHOPPING
            </TopButtonTwo>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">
            {/* https://www.npmjs.com/package/react-stripe-checkout - react stripe checkout */}
            <StripeCheckout
              name="MCM"
              image="https://ecommercemcm.s3.us-west-1.amazonaws.com/just+shirts/marbaker.swe_japanese_desiner_shirt_hip_hop_fashion_1066938d-eef0-4c40-b858-59c1c8691176+copy1.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              //numbers are calculated in cents
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW
              </Button>
            </StripeCheckout>
          </TopButton>

        </Top>
        <Bottom>
          <Info>
            <Hr />

            {cart.products.map(product => ( //map through the products in the cart and display them
              <Product>
                <ProductDetails>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product: </b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size: </b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetails>
                <PriceDetails>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>
                      {product.quantity}
                    </ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    <MoneySymbol>$</MoneySymbol>
                    {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetails>
              </Product>
            ))}

            <Hr />


          </Info>

          <Summary>
            <SummaryTitle>
              ORDER SUMMARY
            </SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal: </SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated Shipping: </SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Shipping Discount: </SummaryItemText>
              <SummaryItemPrice>$-5.90</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText>Total: </SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>

            {/* https://www.npmjs.com/package/react-stripe-checkout - react stripe checkout */}
            <StripeCheckout
              name="MCM"
              image="https://ecommercemcm.s3.us-west-1.amazonaws.com/just+shirts/marbaker.swe_japanese_desiner_shirt_hip_hop_fashion_1066938d-eef0-4c40-b858-59c1c8691176+copy1.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              //numbers are calculated in cents
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW
              </Button>
            </StripeCheckout>

          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
