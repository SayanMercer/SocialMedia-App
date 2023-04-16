import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api';
import { Loader } from '../components';
// import { useNavigate } from 'react-router-dom';


const UserProfile =()=>{

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const {userId} = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    
    useEffect(()=>{
        const getUser = async () => {
             const response = await fetchUserProfile(userId);
             if (response.success) {
                setUser(response.data.user);

             }else {
              toast(response.message,{
                apperance : 'error'
              });
              return navigate.push('/');


             }
             setLoading(false);
        };
        getUser();

    },[userId,navigate,toast]);

    if(loading) {
        return <Loader/>
    }
    const checkIfUserIsFriend =() => {
        const friends = auth.user.friends;
        if(!friends){
         return false;
           }
        const friendIds = friends.map(friend => friend.to_user._id);
        const index = friendIds.indexof(userId);

        if(index !== -1){
            return true;
        }
        return false;
    }
    
  
  
  

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/560/560277.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
       
          <div className={styles.fieldValue}>{user.name}</div>
        
      </div>


      <div className={styles.btnGrp}>
        { checkIfUserIsFriend()? (
       <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
  ):(  
       <button
            className={`button ${styles.saveBtn}`}
            
          >
            Add Friend
          </button>
  )   }
        
         
        
      </div>
    </div>
  );
};

export default UserProfile;

