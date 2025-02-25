import { useAuth } from "../context/useAuth";
import LoginForm from "./LoginForm";

const UserInfo = () => {
  const { user } = useAuth();

  const capitalizeFirstLetter = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return user ? (
    <div>
      <p>Hello, {capitalizeFirstLetter(user)}!</p>
    </div>
  ) : (
    <LoginForm />
  );
};

export default UserInfo;
