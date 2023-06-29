import { loginStart, loginFailure, loginSuccess } from "./userRedux"
import { publicRequest } from "../requestMethods"

//username and password
export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try{
    //making a post request
    const res = await publicRequest.post("/auth/login", user)
    //res.data is our user information
    dispatch(loginSuccess(res.data))
  }catch(err){
    dispatch(loginFailure())
  }
}
