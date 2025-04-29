import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { Container, Button, Card } from 'react-bootstrap';
import { FaMicrosoft, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      onLogin(result.user);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleTeamsLogin = () => {
    // TODO: Implement Teams login
    alert('Teams login will be implemented soon!');
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-button">
        <Button 
          variant="link" 
          className="text-white p-0 d-flex align-items-center"
        >
          <FaArrowLeft className="me-2" />
          Back to Home
        </Button>
      </Link>
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Card className="border-0 shadow-lg login-card" style={{ maxWidth: '400px', width: '100%' }}>
          <Card.Body className="p-5">
            <h3 className="text-center mb-4 text-white">Sign In</h3>
            <p className="text-center text-white-50 mb-4">
              Login to access your notes.
            </p>
            <div className="d-grid gap-3">
              <Button 
                variant="outline-light" 
                size="lg" 
                onClick={handleGoogleLogin}
                className="d-flex align-items-center justify-content-center gap-2 py-3"
              >
                <img 
                  src="https://www.google.com/favicon.ico" 
                  alt="Google" 
                  style={{ width: '20px' }} 
                />
                Continue with Google
              </Button>

              <Button 
                variant="outline-light" 
                size="lg" 
                onClick={handleTeamsLogin}
                className="d-flex align-items-center justify-content-center gap-2 py-3"
              >
                <FaMicrosoft style={{ width: '20px' }} />
                Continue with Teams
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login; 