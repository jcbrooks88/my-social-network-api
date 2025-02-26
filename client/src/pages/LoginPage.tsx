import LoginForm from '../components/LoginForm'; 
import '../assets/loginPage.css'; 


const LoginPage = () => {
  return (
    <div className="login-page-container">
      <h1>Welcome to the Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
