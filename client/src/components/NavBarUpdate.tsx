import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarUpdate = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Move useNavigate() here

    const handleLogout = () => {
        logout(); // Call logout from AuthContext
        navigate("/login"); // Redirect to login page after logout
        setMenuOpen(false); // Close the mobile menu after logout
    };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Social Network</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <div className={`nav-right ${menuOpen ? "open" : ""}`}>
          {user ? (  
          <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link>
            <Nav.Link href="friends">Friends</Nav.Link>
            <Nav.Link href="blog">Blog</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </>
            ) : (
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
            </div>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
};

export default NavbarUpdate;