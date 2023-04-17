import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../providers";
import {editProfile, fetchUserFriends, login as userLogin,getPosts} from '../api';
import { setItemInLocalStorage,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage } from "../utils";
import jwt from 'jwt-decode';
import { register } from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { PostsContext } from "../providers/PostsProvider";




export const useAuth = () => {
    return useContext(AuthContext);
};
//const navigate = useNavigate();

export const useProvideAuth=() => {
    const [user,setUser] =useState(null);
    const [loading,setLoading] =useState(true);

    useEffect(()=>{

        const getUser = async () => {
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if(userToken){
            const user = jwt(userToken);
            const response = await fetchUserFriends();
            
            let friends = [];
            if (response.success){
                
                    
                    friends = response.data.friends;
                
            }

             setUser({
                    ...user,
                    friends
                });
           
        }
        setLoading(false);
        };
        getUser();
        

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

    const updateUserFriends = (addFriend,friend) => {
        if (addFriend) {
            setUser ({
                ...user,
                friends : [...user.friends,friend],
            });
            return;
        }

      const newFriends = user.friends.filter((f) => f.to_user._id !== friend.to_user._id
      );
      setUser({
        ...user,
        friends: newFriends,
      })
    };

    return {
        user,
        login,
        logout,
        signup,
        loading,
        updateUser,
        updateUserFriends,
    };
};
export const usePosts = () => {
    return useContext(PostsContext);
};

export const useProvidePosts=() => {
    const [posts,setPosts] =useState(null);
    const [loading,setLoading] =useState(true);

    useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if(response.success){
        setPosts(response.data.posts);
      }
      setLoading(false);
      
    };

    fetchPosts();
  }, []);

  const addPostToState = (post) =>{
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  const addComment = (comment,postId) => {
    const newPosts = posts.map((post) => {
        if(post._id === postId){
            return{...post,comments: [...post.comments, comment]};
        }
        return post;
    });
    setPosts(newPosts);
  };
    return {

        data : posts,
        loading,
        addPostToState,
 };
};