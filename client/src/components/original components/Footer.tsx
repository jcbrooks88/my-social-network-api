import "../assets/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Your Social Network. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
