// App.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatWindow from "./Components/ChatWindow";
import NotesDisplay from "./Components/NotesDisplay";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
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

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header user={user} />
      <Container className="flex-grow-1 py-4">
        <Row className="g-4">
          <Col lg={6}>
            <ChatWindow
              messages={messages}
              setMessages={setMessages}
              addNote={addNote}
            />
          </Col>
          <Col lg={6}>
            <NotesDisplay
              notes={notes}
              deleteNote={deleteNote}
              updateNote={updateNote}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
