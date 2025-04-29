// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import ChatWindow from "./Components/ChatWindow";
import NotesDisplay from "./Components/NotesDisplay";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      timestamp: noteData.timestamp
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id, title, content) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title, content } : note
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/app" />} />
        
        {/* Protected routes */}
        <Route
          path="/app"
          element={
            user ? (
              <div className="d-flex flex-column min-vh-100">
                <Header user={user} />
                <Container className="flex-grow-1 py-4">
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <ChatWindow
                        messages={messages}
                        setMessages={setMessages}
                        addNote={addNote}
                      />
                    </div>
                    <div className="col-lg-6">
                      <NotesDisplay
                        notes={notes}
                        deleteNote={deleteNote}
                        updateNote={updateNote}
                      />
                    </div>
                  </div>
                </Container>
                <Footer />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
