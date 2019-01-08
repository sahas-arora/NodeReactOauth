import axios from "axios";
import { FETCH_USER } from "./types";

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios.get("/api/current_user")
//     .then(response => {
//       dispatch({
//         type: FETCH_USER,
//         payload: response
//       });
//     });
//   };
// };

//The code written below is exactly the same as the commented one written above.
//It's just condensed down and much cleaner due to the ES2017 syntaxes.

export const fetchUser = () => async dispatch => {
  let response = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const tokenHandler = token => async dispatch => {
  let response = await axios.post("/api/stripe", token); //Post request because we are sending some information(in this case, the token that we get back from the STRIPE API) to our backend server.

  dispatch({ type: FETCH_USER, payload: response.data });
};
