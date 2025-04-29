import React from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import { FaStickyNote, FaMicrophone, FaSearch, FaCloud, FaRobot, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <Navbar className="navbar-landing" expand="lg">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center">
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
          <h2 className="text-center mb-5">Powerful Features</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="feature-card">
                <FaMicrophone className="feature-icon" />
                <h3>Voice Notes</h3>
                <p>Convert your speech to text instantly with advanced voice recognition technology.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <FaRobot className="feature-icon" />
                <h3>AI Assistant</h3>
                <p>Get smart suggestions and automatic organization of your notes.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <FaSearch className="feature-icon" />
                <h3>Smart Search</h3>
                <p>Find any note instantly with our powerful search capabilities.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <FaCloud className="feature-icon" />
                <h3>Cloud Sync</h3>
                <p>Access your notes from anywhere, anytime, on any device.</p>
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
                <p>Your notes are encrypted and protected with enterprise-grade security.</p>
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