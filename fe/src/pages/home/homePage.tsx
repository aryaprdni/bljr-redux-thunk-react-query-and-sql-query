import React from 'react';
import useHome from './hooks/useHome';
import PostList from './components/PostList';
import FormPost from './components/FormPost';

const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useHome();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h1>Home Page</h1>
      
      <FormPost />

      {data && <PostList posts={data} />}
    </div>
  );
};

export default HomePage;
