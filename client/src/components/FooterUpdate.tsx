import Container from 'react-bootstrap/Container';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <Container className="p-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Get Social, Network. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
