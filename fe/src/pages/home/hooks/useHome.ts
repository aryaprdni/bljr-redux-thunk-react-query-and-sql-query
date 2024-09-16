import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { APIWithToken } from "../../../libs/axios";

interface NewPost {
  title: string;
  content: string;
  image: File | null;
}

const useHome = () => {
  const [newPost, setNewPost] = useState<NewPost>({
    title: '',
    content: '',
    image: null,
  });

  const queryClient = useQueryClient();

  const getPosts = async () => {
    const response = await APIWithToken.get('/posts');
    return response.data.data;
  };

  const addPost = async (postData: NewPost) => {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    if (postData.image) {
      formData.append('image', postData.image);
    }

    const response = await APIWithToken.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      resetForm();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type} = e.target;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setNewPost(prevState => ({
        ...prevState,
        image: file,
      }));
    } else {
      setNewPost(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(newPost);
  };

  const resetForm = () => {
    setNewPost({ title: '', content: '', image: null });
  };

  return {
    data,
    error,
    isLoading,
    isError,
    newPost,
    handleChange,
    handleSubmit,
    isPosting: mutation.status === 'pending',
  };
};

export default useHome;
