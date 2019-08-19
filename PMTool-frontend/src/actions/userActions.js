import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJwt from '../securityUtils/setJwt';
import jwt_decode from 'jwt-decode';


export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch ({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch ({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}

export const login = loginRequest => async dispatch => {
    try {
        //post > loginRequest(username, password)
        const res = await axios.post("/api/users/login", loginRequest);
        //extract token from res.data
        const { token } = res.data
        //store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        //set token in header of request
        setJwt(token);
        //decode token on React
        const decodedToken = jwt_decode(token);
        //dispatch to userReducer
        dispatch ({
            type: SET_CURRENT_USER,
            payload: decodedToken
        });
        dispatch ({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch ({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJwt(false);
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
}