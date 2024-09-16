import React from 'react';
import useHome from '../hooks/useHome';

const FormPost: React.FC = () => {
  const { newPost, handleChange, handleSubmit, isPosting } = useHome(); // Ambil fungsi dari custom hook

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Content:
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit" disabled={isPosting}>
        {isPosting ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
};

export default FormPost;
