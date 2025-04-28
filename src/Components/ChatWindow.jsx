import { useState, useRef, useEffect } from "react";
import { Form, Card, ListGroup, FloatingLabel, Button, Alert, Badge, Modal } from "react-bootstrap";
import SpeechToText from "./SpeechToText";
import { FaEdit, FaTrash, FaSave, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

export default function ChatWindow({ messages, setMessages, addNote }) {
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [messageToSave, setMessageToSave] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleEditStart = (id, text) => {
    setEditingId(id);
    setEditText(text);
    setError("");
  };

  const handleEditSave = () => {
    if (!editText.trim()) {
      setError("Message cannot be empty");
      return;
    }
    setMessages(
      messages.map((msg) =>
        msg.id === editingId ? { ...msg, text: editText.trim() } : msg
      )
    );
    setEditingId(null);
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  const handleSend = () => {
    const cleanText = inputText.trim().replace(/\s+/g, " ");
    if (!cleanText) {
      setError("Message cannot be empty");
      return;
    }
    
    const newMessage = {
      id: Date.now(),
      text: cleanText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
      isFinal: false,
    };
    
    setMessages([...messages, newMessage]);
    setInputText("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveToNotes = (message) => {
    setMessageToSave(message);
    setShowSaveModal(true);
  };

  const handleSaveNote = () => {
    if (!noteTitle.trim()) {
      alert("Please enter a title for your note");
      return;
    }
    if (!messageToSave?.text) {
      alert("No message content to save");
      return;
    }
    
    addNote({
      title: noteTitle.trim(),
      content: messageToSave.text,
      timestamp: new Date().toISOString()
    });
    
    setShowSaveModal(false);
    setNoteTitle("");
    setMessageToSave(null);
  };

  return (
    <>
      <Card className="h-100 border-0 shadow-lg">
        <Card.Header className="bg-gradient-primary text-white d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <FaRobot className="me-2" />
            <h5 className="mb-0">Voice Notes Chat</h5>
          </div>
          <Badge bg="light" text="primary" className="px-3 py-2">
            {messages.length} Messages
          </Badge>
        </Card.Header>
        <Card.Body className="d-flex flex-column p-0 bg-light">
          <div
            className="flex-grow-1 overflow-auto p-3"
            style={{ minHeight: "400px" }}
          >
            {messages.length === 0 ? (
              <div className="text-center text-muted py-5">
                <div className="display-1 mb-3">👋</div>
                <h6>Welcome to Voice Notes!</h6>
                <small className="text-muted">Start by typing or using voice input</small>
              </div>
            ) : (
              <ListGroup variant="flush">
                {messages.map((message) => (
                  <ListGroup.Item key={message.id} className="border-0 p-1">
                    <div
                      className={`chat-bubble ${
                        message.isUser ? "user-message" : "system-message"
                      }`}
                    >
                      <div className="message-header d-flex align-items-center mb-2">
                        {message.isUser ? (
                          <FaUser className="me-2 text-primary" />
                        ) : (
                          <FaRobot className="me-2 text-success" />
                        )}
                        <small className="text-muted">{message.timestamp}</small>
                      </div>
                      {editingId === message.id ? (
                        <Form.Control
                          as="textarea"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="mb-2"
                          autoFocus
                        />
                      ) : (
                        <div className="message-content">{message.text}</div>
                      )}
                      <div className="d-flex justify-content-end gap-2 mt-2">
                        {editingId === message.id ? (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={handleEditSave}
                            className="rounded-pill"
                          >
                            <FaSave className="me-1" /> Save
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() =>
                                handleEditStart(message.id, message.text)
                              }
                              className="rounded-pill"
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(message.id)}
                              className="rounded-pill"
                            >
                              <FaTrash />
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleSaveToNotes(message)}
                              className="rounded-pill"
                            >
                              Save to Notes
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-top p-3 bg-white">
            {error && <Alert variant="danger" className="mb-2">{error}</Alert>}
            <div className="d-flex gap-2 align-items-start">
              <FloatingLabel
                controlId="messageInput"
                label="Type or speak a note"
                className="flex-grow-1"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "100px", resize: "none" }}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-primary"
                  placeholder="Type your message here..."
                />
              </FloatingLabel>
              <div className="d-flex flex-column gap-2">
                <SpeechToText
                  setInputText={setInputText}
                  handleSend={handleSend}
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="btn btn-primary rounded-circle p-2 shadow-sm"
                  style={{ width: "45px", height: "45px" }}
                >
                  <FaPaperPlane />
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Save Note Modal */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Save to Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Note Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a title for your note"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <div className="mt-3">
            <strong>Note Content:</strong>
            <p className="mt-2">{messageToSave?.text}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveNote}>
            Save Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
