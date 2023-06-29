import { createSlice } from "@reduxjs/toolkit"

//for the cart icon and how many items are inside the cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    //start from zero items in cart
    quantity: 0,
    total: 0
  },
  //mapping
  reducers: {
    addProduct: (state, action) => {
      //clicking "add cart" from Product.jsx will add number for the cart icon at the Navbar.jsx
      state.quantity += 1;
      //payload is total product
      state.products.push(action.payload)
      //depends how many quantity you add and add to cart VS how many times you click the cart
      state.total += action.payload.price * action.payload.quantity

      fetch("/api/carts/649366decf0ab6cd5694c0dd", {
        method: "PUT",
        body: JSON.stringify(action.payload),
        headers: {
          "Content-Type": "application/json"
        },
      })
    }

  }
})


export const { addProduct } = cartSlice.actions
export default cartSlice.reducer;
