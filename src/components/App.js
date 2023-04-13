import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useAuth } from '../hooks';

import { getPosts } from '../api';
import { Home, Login, Signup ,Settings} from '../pages';
import {Loader ,Navbar} from './';

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
      <Routes>
      <Route exact path="/" element={<Home  posts={posts}/>} />
      <Route exact path="/login" element={<Login />} />
       <Route exact path="/register" element={<Signup/>}/>
        {/* <Route exact path="/register" element={}>
            <Signup />
          </Route> */}
       <Route exact path="/settings" element={<Settings/>}/>     
          
      <Route exact path="/about" element={<About />} />
      <Route exact path="*" element={<Page404 />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
