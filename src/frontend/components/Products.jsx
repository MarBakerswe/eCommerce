import React from "react"; // React library
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useState, useEffect } from "react";

// Responsive utility for small mobile devices
import { mobileSmall } from "../responsive"

// Container style for product display
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobileSmall({ justifyContent: "center" })} // Responsive style for small mobile devices
`

// Products component
const Products = ({ cat, filters, sort }) => {
  // State for storing the fetched products and filtered products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Effect hook for fetching products from the server based on category or all products 
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          // If category is specified, fetch products from that category, else fetch all products
          cat
            ? `/api/products?category=${cat}`
            : `/api/products`
        );
        setProducts(res.data); // Save the fetched products to state
      } catch (err) {

      }
    };
    getProducts(); // Invoke the function to fetch products
  }, [cat]); // Depend on the category, so the products are refetched when the category changes

  // Effect hook for filtering products based on selected filters
  useEffect(() => {
    cat &&
      setFilteredProducts( // Filter the products based on the selected filters
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]); // Depend on products, category and filters

  // Effect hook for sorting the filtered products based on the selected sort option (newest, lowest price, highest price)
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (itemOne, itemTwo) => itemOne.createdAt - itemTwo.createdAt
        )
      );
    } else if (sort === "lowest") {
      setFilteredProducts((prev) =>
        [...prev].sort((itemOne, itemTwo) => itemOne.price - itemTwo.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((itemOne, itemTwo) => itemTwo.price - itemOne.price)
      );
    }
  }, [sort]); // Depend on the sort option

  return (
    <Container>
      {/* If a category is selected, display the filtered products, else display a limited number of products */}
      {cat
        ? filteredProducts.map((item) => (
          <Product item={item} key={item.id} /> // Mapping through filtered products
        ))
        : products.slice(0, 8).map((item) => (
          <Product item={item} key={item.id} /> // Displaying only 8 products if no category is selected
        ))}
    </Container>
  );
}

export default Products; // Exporting the Products component
