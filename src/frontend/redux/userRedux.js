import { createSlice } from "@reduxjs/toolkit"

//for the cart icon and how many items are inside the cart
const userSlice = createSlice({
  name: "user",
  initialState:{
    currentUser : null,
    isFetching: false,
    error: false
  },
  //mapping
  reducers:{
    //async function and api request
    loginStart: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser=action.payload
    },
    //if login fails or something wrong with the api
    loginFailure: (state) => {
      state.isFetching = false
      state.error = true
    }
  }
})


export const { loginStart, loginSuccess, loginFailure } = userSlice.actions
export default userSlice.reducer;
