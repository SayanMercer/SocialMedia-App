import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';

const Navbar = () => {
    const auth = useAuth();
    return (
     <div className={styles.nav}>
        <div className={styles.leftDiv}>
            <Link to="/">
               <img alt="" src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"/>
            </Link>
        </div>
        <div className={styles.rightNav}>
            {auth.user && <div className={styles.user}>
                <Link to="/settings">
                   <img 
                     src="https://cdn-icons-png.flaticon.com/512/560/560277.png" 
                     alt=""
                     className={styles.userDp} 
                    />
                </Link>
                
                <span>{auth.user.name}</span>
            </div>}
            <div className={styles.navLinks}>
                
                <ul>
                    {auth.user ?(
                 <>
                    <li onClick={auth.logout}>
                        Log out
                    </li>
                 </>
                 ):(
                 <>
                 <li>
                        <Link to="/login">Log in</Link>
                    </li>
                    
                    <li>
                        {/* <a href="/">Register</a> */}
                        <Link to="/register">Register</Link>
                    </li>
                 </>
           ) }
                    
                </ul>

            </div>
        </div>
     </div>
    );
};

export default Navbar;