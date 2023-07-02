import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { useState ,useEffect} from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
    const [results,setResults] = useState([]);
    const [searchText,setSearchText] = useState('');
    const auth = useAuth();
   const navigate = useNavigate();
    const logoutpage =() =>{
        auth.logout();
        navigate("/login");
    }
    useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);

      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);
    
    return (
     <div className={styles.nav}>
        <div className={styles.leftDiv}>
            <Link to="/">
               <img alt="" src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"/>
            </Link>
        </div>

        
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://img.icons8.com/?size=512&id=7695&format=png"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
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
                    <li onClick={logoutpage}>
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
                        <Link to="/register">Sign-up</Link>
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