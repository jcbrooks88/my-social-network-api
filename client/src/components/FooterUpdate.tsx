import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="footer-custom">
      <Container className="p-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Get Social, Network. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
