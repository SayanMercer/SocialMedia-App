import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


const UserProfile =()=>{
  
  const user = {};
  

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
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
       
          <div className={styles.fieldValue}>{user?.name}</div>
        
      </div>


      <div className={styles.btnGrp}>
        <button
            className={`button ${styles.saveBtn}`}
            
          >
            Add Friend
          </button>
         <button
            className={`button ${styles.saveBtn}`}
            
          >
            Remove Friend
          </button>  
        
      </div>
    </div>
  );
};

export default UserProfile;

