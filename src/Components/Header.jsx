import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaStickyNote, FaCog } from 'react-icons/fa';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header = ({ user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <FaStickyNote className="me-2 text-primary" />
          <span className="fw-bold">MphaNote</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button
              variant="outline-light"
              className="d-flex align-items-center me-2"
            >
              <FaCog className="me-1" /> Settings
            </Button>
            {user && (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">
                  {user.displayName || user.name || user.email}
                </span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 