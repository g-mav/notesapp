import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

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

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Welcome to Note App</h2>
              <div className="d-grid">
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  onClick={handleGoogleLogin}
                  className="d-flex align-items-center justify-content-center"
                >
                  <img 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    style={{ width: '20px', marginRight: '10px' }} 
                  />
                  Continue with Google
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login; 