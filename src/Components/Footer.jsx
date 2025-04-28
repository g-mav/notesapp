import { Container, Row, Col } from 'react-bootstrap';
import { FaStickyNote, FaMicrophone, FaSearch, FaShieldAlt, FaMobileAlt, FaCloud } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 className="text-primary mb-3">
              <FaStickyNote className="me-2" />
              Voice Notes
            </h5>
            <p className="text-muted">
              Your intelligent note-taking companion. Capture thoughts, ideas, and reminders with voice or text, anytime, anywhere.
            </p>
            <div className="d-flex gap-2 mt-3">
              <span className="badge bg-primary">
                <FaMicrophone className="me-1" /> Voice Input
              </span>
              <span className="badge bg-success">
                <FaSearch className="me-1" /> Smart Search
              </span>
              <span className="badge bg-info">
                <FaCloud className="me-1" /> Cloud Sync
              </span>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="text-primary mb-3">Features</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaMicrophone className="me-2 text-primary" />
                Voice-to-Text Notes
              </li>
              <li className="mb-2">
                <FaSearch className="me-2 text-primary" />
                Smart Search & Organization
              </li>
              <li className="mb-2">
                <FaMobileAlt className="me-2 text-primary" />
                Cross-Device Sync
              </li>
              <li className="mb-2">
                <FaShieldAlt className="me-2 text-primary" />
                Secure & Private
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5 className="text-primary mb-3">Quick Access</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#notes" className="text-light text-decoration-none">
                  My Notes
                </a>
              </li>
              <li className="mb-2">
                <a href="#voice" className="text-light text-decoration-none">
                  Voice Input
                </a>
              </li>
              <li className="mb-2">
                <a href="#search" className="text-light text-decoration-none">
                  Search Notes
                </a>
              </li>
              <li className="mb-2">
                <a href="#settings" className="text-light text-decoration-none">
                  Settings
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center text-muted">
            <p className="mb-0">
              © {new Date().getFullYear()} Voice Notes. All rights reserved.
            </p>
            <small>Your thoughts, our technology.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
} 