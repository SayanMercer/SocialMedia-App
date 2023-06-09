import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useAuth } from '../hooks';

import { getPosts } from '../api';
//import { Home, Login, Signup ,Settings} from '../pages';
import  UserProfile  from '../pages/UserProfile';
import  Home  from '../pages/Home';
import  Login  from '../pages/Login';
import  Signup  from '../pages/Signup';
import Settings from '../pages/Settings';
import {Loader ,Navbar} from './';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// function PrivateRoute({ children, ...rest }) {
//   const auth = useAuth();

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  const Navigate = useNavigate();
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }
          Navigate("/login"); 
       // return <Navigate to="/login" />;
      }}
    />
  );
}

const About = () => {
  return <h1>About</h1>
};
const UserInfo = () => {
  return <h1>User</h1>
};
const Page404 = () => {
  return <h1>404</h1>
};

function App() {
  const [posts, setPosts] = useState([]);   /// error coming due to post calling
  
  const auth = useAuth();
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await getPosts();
  //     console.log('response', response);
  //     if(response.success){
  //       setPosts(response.data.posts)    
  //     }
  //     setLoading(false);
      
  //   };

  //   fetchPosts();
  // }, []);

  if (auth.loading){
    return <Loader/>;
  }

  // return (
  //   <div className="App">
      
  //     <Router>
  //       <Navbar/>  
  //       <Routes>
  //        <Route exact path="/"> 
  //         <Home posts={posts} />
  //        </Route> 

  //        <Route exact path ="/login"> 
  //         <Login />
  //        </Route>
  //        <Route exact path ="/about"> 
  //         <About />
  //        </Route> 
  //        <Route exact path ="/user/asdasd"> 
  //         <UserInfo />
  //        </Route>
  //         <Route path ="/about"> 
  //          <Page404 />
  //         </Route>
  //       /</Routes>
  //     </Router>
      
  //   </div>
  // );
  return (
    <div className="App">
      
      <Router>
      <Navbar />
      <ToastContainer autoClose={1000} position= "top-left"/>
      <Routes>
      <Route exact path="/" element={<Home  posts={posts}/>} />
      <Route exact path="/login" element={<Login />} />
       <Route exact path="/register" element={<Signup/>}/>
        {/* <Route exact path="/register" element={}>
            <Signup />
          </Route> */}
       <Route exact path="/settings" element={<Settings/>}/>    
        {/* <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>  */}
           {/* <PrivateRoute exact path="/user/:userId">
            <UserProfile />
          </PrivateRoute> */}
           <Route exact path="/user/:userId" element={<UserProfile/>}/>
          
      <Route exact path="/about" element={<About />} />
      <Route exact path="*" element={<Page404 />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
