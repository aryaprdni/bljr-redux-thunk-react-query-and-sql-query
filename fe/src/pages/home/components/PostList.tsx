import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Comment {
  id: number;
  content: string;
  user: User;
}

interface Post {
  content: string;
  image: string;
  title: string;
  user: User;
  comments: Comment[];
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <h1>Post List</h1>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h2>{post.title}</h2>
          <img src={post.image} alt={post.title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          <p>{post.content}</p>
          <div>
            <h3>Posted by: {post.user.name} ({post.user.email})</h3>
          </div>
          <div>
            <h3>Comments:</h3>
            {post.comments.length > 0 ? (
              <ul>
                {post.comments.map(comment => (
                  <li key={comment.id}>
                    <strong>{comment.user.name}:</strong> {comment.content}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
