import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FaStickyNote, FaSearch, FaMicrophone, FaCog } from 'react-icons/fa';
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
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <FaStickyNote className="me-2 text-primary" />
          <span className="fw-bold">Voice Notes</span>
          <Badge bg="primary" className="ms-2">Beta</Badge>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#notes" className="d-flex align-items-center">
              <FaStickyNote className="me-1" /> My Notes
            </Nav.Link>
            <Nav.Link href="#search" className="d-flex align-items-center">
              <FaSearch className="me-1" /> Search
            </Nav.Link>
            <Nav.Link href="#voice" className="d-flex align-items-center">
              <FaMicrophone className="me-1" /> Voice Input
            </Nav.Link>
          </Nav>
          <Nav>
            <Button
              variant="outline-light"
              className="d-flex align-items-center me-2"
            >
              <FaCog className="me-1" /> Settings
            </Button>
          </Nav>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 