import React from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import { FaStickyNote, FaMicrophone, FaSearch, FaCloud, FaRobot, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <Navbar className="navbar-landing" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <FaStickyNote className="me-2 text-primary" />
            <span className="fw-bold">MphaNote</span>
          </Navbar.Brand>
          <div className="ms-auto">
            <Link to="/login">
              <Button variant="primary" className="px-4">Sign In</Button>
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col lg={6} className="text-white">
              <h1 className="display-3 fw-bold mb-4">
                Your Intelligent Note-Taking Companion
              </h1>
              <p className="lead mb-5">
                Capture, organize, and access your notes effortlessly using your voice.
              </p>
              <Link to="/login">
                <Button variant="light" size="lg" className="px-5 py-3">
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="hero-image">
                <FaStickyNote className="pulse-icon" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">- Features -</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="feature-card">
                <FaMicrophone className="feature-icon" />
                <h3>Voice Notes</h3>
                <p>Convert your speech to text instantly with advanced voice recognition.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <FaRobot className="feature-icon" />
                <h3>AI Assistant</h3>
                <p>Get a summary of your voicenotes.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <FaSearch className="feature-icon" />
                <h3>Smart Search</h3>
                <p>Find any note instantly with our powerful search.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <FaCloud className="feature-icon" />
                <h3>Cloud Sync</h3>
                <p>Access your notes from anywhere, anytime from the Cloud.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <FaMobileAlt className="feature-icon" />
                <h3>Mobile Ready</h3>
                <p>Take notes on the go with our mobile-friendly interface.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <FaShieldAlt className="feature-icon" />
                <h3>Secure & Private</h3>
                <p>Your notes are encrypted and protected.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section py-5">
        <Container>
          <h2 className="text-center mb-5">- Meet The Creators -</h2>
          <Row className="g-4 justify-content-center">
            {/* Team Member 1 */}
            <Col md={4}>
              <div className="team-card">
                <div className="team-image mb-3">
                  <img 
                    src="src/Components/assets/gm.jpg" 
                    alt="Gaurav Murali" 
                    className="team-avatar rounded-circle"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <h3 className="text-center">Gaurav Murali</h3>
                <p className="text-center mb-3">B.E @ISE, BMS Institute Of Technology</p>
                <div className="social-links d-flex justify-content-center gap-3">
                  <a href="https://github.com/g-mav" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-white" />
                  </a>
                  <a href="https://in.linkedin.com/in/gaurav-murali-9098bb258" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-white" />
                  </a>
                </div>
              </div>
            </Col>

            {/* Team Member 2 */}
            <Col md={4}>
              <div className="team-card">
                <div className="team-image mb-3">
                  <img 
                    src="src/Components/assets/db.png" 
                    alt="Durpat Balayar" 
                    className="team-avatar rounded-circle"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <h3 className="text-center">Durpat Balayar</h3>
                <p className="text-center mb-3">BTech @CSE, Sambhram Institute Of Technology</p>
                <div className="social-links d-flex justify-content-center gap-3">
                  <a href="https://github.com/durpatbalayar2" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-white" />
                  </a>
                  <a href="https://www.linkedin.com/in/durpat-singh-balayar" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-white" />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer-landing py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <p className="mb-0 text-white-50">
                Built for Mphasis by Gaurav Murali and Durpat Balayar © 2025.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex justify-content-md-end gap-3">
                <a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a>
                <a href="#" className="text-white-50 text-decoration-none">Terms of Service</a>
                <a href="#" className="text-white-50 text-decoration-none">Contact</a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;