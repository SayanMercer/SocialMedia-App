import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import { addFriend,removeFriend, fetchUserProfile } from '../api';
import { Loader } from '../components';
// import { useNavigate } from 'react-router-dom';


const UserProfile =()=>{

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [requestInProgress, setRequestInProgress] = useState(false);
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
    const checkIfUserIsAFriend =() => {
        const friends = auth.user.friends;
        if(!friends){
         return false;
           }
        const friendIds = friends?.map(friend => friend.to_user._id);
        const index = friendIds.indexOf(userId);

        if(index !== -1){
            return true;
        }
        return false;
    };
    const handleRemoveFriendClick = async() => {
        setRequestInProgress (true);
         const response = await removeFriend(userId);
         if(response.success){
            const friendship = auth.user.friends.filter (
                friend => friend.to_user._id === userId
                );
            auth.updateUserFriends(false,friendship[0]);
            toast('Friend removed successfully!',{
                apperance: 'success',
            });
         }else{
             toast(response.message,{
                apperance: 'error',
             });
         }
        setRequestInProgress(false);
    };
    
    const handleAddFriendClick = async () => {
        setRequestInProgress (true);
         const response = await addFriend(userId);
         if(response.success){
            const {friendship} = response.data;
            auth.updateUserFriends(true,friendship);
            toast('Friend added successfully!',{
                apperance: 'success',
            });
         }else{
             toast(response.message,{
                apperance: 'error',
             });
         }
        setRequestInProgress(false);
    };
    
  
  
  

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
        { checkIfUserIsAFriend()? (
       <button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriendClick}>
        {requestInProgress ?'Removing friend...': 'Remove Friend'}</button>
  ):(  
       <button
            className={`button ${styles.saveBtn}`} onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
           {requestInProgress ?'Adding friend...': 'Add Friend'}
          </button>
  )   }
        
         
        
      </div>
    </div>
  );
};

export default UserProfile;

