import PropTypes from 'prop-types';
import { Comment } from '../components';
import styles from '../styles/home.module.css';

const Home = ({ posts }) => {
  console.log(posts);
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
           <div className={styles.postWrapper} key={`post-${post._id}`}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user-pic"
            />
            <div>
              <span className={styles.postAuthor}>{post.user.name}</span>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077086.png"
                alt="likes-icon"
              />
              <span>5</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                alt="comments-icon"
              />
              <span>2</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            <div className={styles.postCommentsItem}>
              <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>Bill</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
              </div>

              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                <Comment comment={comment}/>
              ))}</div>
            </div>
          </div>
        </div>
      </div>
      ))}
      
    </div>
  );
};

Home.propTypes = {
  posts : PropTypes.array.isRequired,
};

export default Home;
