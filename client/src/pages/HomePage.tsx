
import MainLayout from '../components/MainLayout'; // Import the custom layout component

const HomePage = () => {
  return (
    <MainLayout>
      <div className="home-page-content">
        <h2>Welcome to the Quirky Blog!</h2>
        <p>This is the home page where you can find blog posts and updates.</p>
      </div>
    </MainLayout>
  );
};

export default HomePage;

