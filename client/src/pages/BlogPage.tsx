import BlogLayout from '../components/BlogLayout';
import WriteThought from '../components/WriteThought';
import '../assets/thoughtPage.css';

const BlogPage = () => {
  return (
    <div className="blog-page-container">
      <WriteThought />
      <BlogLayout />
    </div>
  );
};

export default BlogPage;
