import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
//import { useToasts } from 'react-toast-notifications';
import {  toast } from 'react-toastify';
//import { register } from '../api';
import "react-toastify/dist/ReactToastify.css";


import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

const Signup = () => {
  const [name, setName] = useState('');   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  //const { addToast } = useToasts();
  const auth = useAuth();
  //const history = useNavigate();
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast('Please fill all the fields', {
        appearance: 'error',
        autoClose: true,
      });
      error = true;
    }

    if (password !== confirmPassword) {
      toast('Make sure password and confirm password matches', {
        appearance: 'error',
        autoDismiss: true,
      });

      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }
    

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      //history.push('/login');
      navigate('/login',{replace:true})
      setSigningUp(false);

      return toast('User registered successfully, please login now', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      toast(response.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    setSigningUp(false);
  };

  if (auth.user) {
   // return <Navigate to="/" />;
   navigate('/',{replace:true})
  }

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
