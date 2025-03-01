import ThoughtFeed from '../components/ThoughtFeedUpdate';
import WriteThought from '../components/WriteThoughtUpdate';
import '../assets/thoughtPage.css';

const ThoughtPage = () => {
  return (
    <div className="blog-page-container">
      <WriteThought />
      <ThoughtFeed />
    </div>
  );
};

export default ThoughtPage;
