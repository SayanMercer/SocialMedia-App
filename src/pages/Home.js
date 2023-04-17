import PropTypes from 'prop-types';

import { Comment, CreatePost, FriendsList, Loader } from '../components';

import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
import Post from '../components/Post';

const Home = () => {
  
  const auth = useAuth();
  const posts = usePosts();
   

  if(posts.loading){
    return <Loader/>;
  }

  return (
    <div className={styles.home}>
      
    <div className={styles.postsList}>
      <CreatePost/>
      {posts.data.map((post) => (
      //      <div className={styles.postWrapper} key={`post-${post._id}`}>
      //   <div className={styles.postHeader}>
      //     <div className={styles.postAvatar}>
      //       <img
      //         src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      //         alt="user-pic"
      //       />
      //       <div>
      //         <Link to ={{
      //           pathname: `/user/${post.user._id}`,
      //           state : {
      //             user:post.user,
      //           }
      //         }}className={styles.postAuthor}>{post.user.name}</Link>
      //         <span className={styles.postTime}>a minute ago</span>
      //       </div>
      //     </div>
      //     <div className={styles.postContent}>{post.content}</div>

      //     <div className={styles.postActions}>
      //       <div className={styles.postLike}>
      //         <img
      //           src="https://cdn-icons-png.flaticon.com/512/1077/1077086.png"
      //           alt="likes-icon"
      //         />
      //         <span>{post.likes.length}</span>
      //       </div>

      //       <div className={styles.postCommentsIcon}>
      //         <img
      //           src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
      //           alt="comments-icon"
      //         />
      //         <span>2</span>
      //       </div>
      //     </div>
      //     <div className={styles.postCommentBox}>
      //       <input placeholder="Start typing a comment" />
      //     </div>

      //     <div className={styles.postCommentsList}>
      //       <div className={styles.postCommentsItem}>
      //         <div className={styles.postCommentHeader}>
      //           <span className={styles.postCommentAuthor}>Bill</span>
      //           <span className={styles.postCommentTime}>a minute ago</span>
      //           <span className={styles.postCommentLikes}>22</span>
      //         </div>

      //         <div className={styles.postCommentsList}>
      //           {post.comments.map((comment) => (
      //           <Comment comment={comment}/>
      //         ))}</div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
     
      <Post post = {post} key = {`post-${post._id}`}/>

      ))}
      
    </div>
    {auth.user && <FriendsList/>}
   </div> 
  );
};

Home.propTypes = {
  posts : PropTypes.array.isRequired,
};

export default Home;
