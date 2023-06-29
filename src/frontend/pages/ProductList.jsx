import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";


import { mobileLarge } from "../responsive"
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`

`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  margin: 20px;
`

const Filter = styled.div`
  margin: 20px;
  ${mobileLarge({ width: "0 20px", display: "flex", flexDirection: "column" })}
`

const FilterText =styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobileLarge({ marginRight: 0 })}
`

//styled.select is dropdown option
const Select =styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobileLarge({ margin: "10px 0" })}
`
const Option =styled.option`

`


const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split("/")[2]
  const [filters, setFilters] = useState({})
  const [sort, setSort ] = useState("newest")

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    })
  }


  return (
      <Container>
        <Announcement />
        <Navbar />
        <Title>
          {/* catergory title and making upper case*/}
          {String(cat).toUpperCase()}
        </Title>
        <FilterContainer>
          <Filter>
            <FilterText>
              Filter Products:
          </FilterText>
            <Select name="color" onChange={handleFilters}>
              {/* disabled is cannot be selected, selected is default when loading page */}
              <Option disabled >Color</Option>
              <Option>white</Option>
              <Option>black</Option>
              <Option>red</Option>
              <Option>blue</Option>
              <Option>yellow</Option>
              <Option>green</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
              <Option>Size</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>
              Sort Products:
            </FilterText>
              <Select onChange={e=>setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="lowest">Price (Lowest)</Option>
              <Option value="highest">Price (Highest)</Option>
              </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <Newsletter />
        <Footer />
      </Container>
  );
}

export default ProductList;
