import * as Yup from 'yup';

export const postSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    image: Yup.string().required('Image is required'),
});