import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../providers/AuthProvider";
import {editProfile, login as userLogin} from '../api';
import { setItemInLocalStorage,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage } from "../utils";
import jwt from 'jwt-decode';
import { register } from "../api";
import { Navigate, useNavigate } from "react-router-dom";




export const useAuth = () => {
    return useContext(AuthContext);
}
//const navigate = useNavigate();

export const useProvideAuth=() => {
    const [user,setUser] =useState(null);
    const [loading,setLoading] =useState(true);

    useEffect(()=>{
        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if(userToken){
            const user = jwt(userToken);
            setUser(user);
        }
        setLoading(false);

    },[]);

    const updateUser = async (userId, name , password, confirmPassword) =>{
         const response = await  editProfile(userId, name , password, confirmPassword);

         console.log('response',response);
        if(response.success){
             setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token:null
                );
            return {
                success: true 
            }
        }else {
             return {
                success: false,
                message : response.message
            };
        }
    }

    const login = async (email, password) => {
        const response = await userLogin (email, password);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token:null
                );
            return {
                success: true 
            }
        }else {
             return {
                success: false,
                message : response.message
            };
        }
    };
    const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

    const logout = () =>{
       // const navigate = useNavigate();
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
       // navigate("/login");
    };

    return {
        user,
        login,
        logout,
        signup,
        loading,
        
        updateUser,
    };
};