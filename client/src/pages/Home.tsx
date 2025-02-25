import "../assets/Home.css"; // Import CSS file
import UserInfo from "../components/UserInfo";

const Home = () => {
  return (
      <div className="home-container">
          <h1 className="home-title">Welcome to the Social Network</h1>
          <div className="login-container">
            <UserInfo />
          </div>
      </div>
  );
};

export default Home;
