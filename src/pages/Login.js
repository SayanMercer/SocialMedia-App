import styles from '../styles/login.module.css';
const Login = () => {
 return (
    <form className={styles.loginForm}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" placeholder="Email" required/>
      </div>

      <div className={styles.field}>
        <input type="password" placeholder="Password" required/>
      </div>

      <div className={styles.field}>
        <button>
          Login
        </button>
      </div>
    </form>
  );

};


export default Login;