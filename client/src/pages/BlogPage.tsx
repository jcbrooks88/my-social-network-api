import BlogLayout from '../components/BlogLayout';
import CreateThoughtForm from '../components/CreateThoughtForm';

const BlogPage = () => {
  return (
    <div>
      <CreateThoughtForm />
      <BlogLayout />
    </div>
  );
};

export default BlogPage;
