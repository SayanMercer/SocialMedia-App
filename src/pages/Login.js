import { useState } from 'react';
import styles from '../styles/login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { login } from '../api';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password,setPasssword]  = useState('');
  const [loggingIn,setLoggingIn] = useState(false);
  //const {addToast} =useToast();
  const auth = useAuth();
  const navigate = useNavigate()
  console.log(auth);

  // const handleSubmit =async(e) => {
  //   e.preventDefault();
  //   setLoggingIn(true);
  //   if (!email || !password){
  //     return toast('Please enter both email and password',{
  //       appearance : 'error',
        
  //     });

  //   }
  //   const response = await auth.login (email, password);
  //    if(response.success) {
  //       toast('Successfully logged in',{
  //       appearance : 'success',
  //      });
    
  //     }else{toast(response.message,{
  //       appearance : 'error',

  //     });
  //   }
  //   setLoggingIn(false);
     
   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      return toast('Please enter both email and password', {
        appearance: 'error',
      });
    }

    const response = await auth.login(email, password);

    if (response.success) {
      toast('Successfully logged in', {
        appearance: 'success',
      });
     navigate('/',{replace:true})
      
    
    }
     
    else {
      toast(response.message, {
        appearance: 'error',
      });
    }

    setLoggingIn(false);
  };

 return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email"  value={email} 
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Password"  value={password}
        onChange={(e) => setPasssword(e.target.value)}/>
      </div>

      <div className={styles.field} >
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
          <ToastContainer autoClose={1000} position= "top-left"/>
        </button>
      </div>
    </form>
  );

};


export default Login;