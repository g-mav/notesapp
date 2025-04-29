// NotesDisplay.jsx
import { useState, useEffect } from "react";
import { Card, ListGroup, Button, Modal, Form, Alert, Dropdown, Badge, InputGroup } from "react-bootstrap";
import { FaEdit, FaTrash, FaShare, FaStickyNote, FaFilter, FaSort, FaSearch, FaCalendarAlt, FaClock } from "react-icons/fa";

export default function NotesDisplay({ notes, deleteNote, updateNote }) {
  const [editNote, setEditNote] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const filteredAndSortedNotes = notes
    .filter((note) => {
      if (filter === "all") return true;
      if (filter === "today") {
        const today = new Date().toDateString();
        return new Date(note.timestamp).toDateString() === today;
      }
      if (filter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(note.timestamp) > weekAgo;
      }
      return true;
    })
    .filter((note) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return note.title?.toLowerCase().includes(query);
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.timestamp) - new Date(a.timestamp);
      if (sortBy === "oldest") return new Date(a.timestamp) - new Date(b.timestamp);
      return 0;
    });

  const handleShare = async (note) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Voice Note",
          text: note.content,
        });
      } else {
        await navigator.clipboard.writeText(note.content);
        alert("Note copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  const handleUpdate = () => {
    if (!editedContent.trim()) {
      alert("Note content cannot be empty");
      return;
    }
    if (!editNote?.title?.trim()) {
      alert("Note title cannot be empty");
      return;
    }
    updateNote(editNote.id, editNote.title.trim(), editedContent.trim());
    setEditNote(null);
    setEditedContent("");
  };

  const confirmDelete = (note) => {
    setNoteToDelete(note);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
      setShowDeleteConfirm(false);
      setNoteToDelete(null);
    }
  };

  return (
    <>
      <Card className="h-100 border-0 shadow-lg bg-dark text-white">
        <Card.Header className="bg-dark border-bottom border-secondary d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <FaStickyNote className="me-2 text-primary" />
            <h5 className="mb-0">Saved Notes</h5>
          </div>
          <Badge bg="secondary" text="white" className="px-3 py-2">
            {filteredAndSortedNotes.length} Notes
          </Badge>
        </Card.Header>
        <Card.Body className="overflow-auto p-3 bg-dark">
          <div className="d-flex gap-2 mb-3">
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary">
                <FaSearch className="text-white" />
              </span>
              <Form.Control
                type="text"
                placeholder="Search notes by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-start-0 bg-dark text-white border-secondary"
              />
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="dark" size="sm" className="d-flex align-items-center border-secondary">
                <FaFilter className="me-1" /> Filter
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark border-secondary">
                <Dropdown.Item onClick={() => setFilter("all")} className="text-white">
                  <FaStickyNote className="me-2" /> All Notes
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("today")} className="text-white">
                  <FaCalendarAlt className="me-2" /> Today
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("week")} className="text-white">
                  <FaCalendarAlt className="me-2" /> Last 7 Days
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="dark" size="sm" className="d-flex align-items-center border-secondary">
                <FaSort className="me-1" /> Sort
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark border-secondary">
                <Dropdown.Item onClick={() => setSortBy("newest")} className="text-white">
                  Newest First
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("oldest")} className="text-white">
                  Oldest First
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {filteredAndSortedNotes.length === 0 ? (
            <div className="text-center text-muted py-5">
              <h6>No notes found</h6>
              <small>Try adjusting your filters or search term</small>
            </div>
          ) : (
            <div className="row g-3">
              {filteredAndSortedNotes.map((note) => (
                <div key={note.id} className="col-md-6">
                  <div className="note-card bg-dark p-3 rounded shadow-sm h-100 border border-secondary">
                    <div className="d-flex align-items-center gap-2 mb-2 text-muted small">
                      <FaStickyNote />
                      <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                      <span className="ms-auto">
                        <FaClock className="me-1" />
                        {new Date(note.timestamp).toLocaleTimeString()}
                      </span>
                      <Dropdown>
                        <Dropdown.Toggle 
                          variant="link" 
                          className="text-white p-0 ms-2"
                          id={`dropdown-note-${note.id}`}
                          style={{ fontSize: '1.2rem' }}
                        />
                        <Dropdown.Menu className="bg-dark border-secondary">
                          <Dropdown.Item 
                            className="text-white"
                            onClick={() => {
                              setEditNote(note);
                              setEditedContent(note.content);
                            }}
                          >
                            <FaEdit className="me-2" /> Edit
                          </Dropdown.Item>
                          <Dropdown.Item 
                            className="text-white"
                            onClick={() => confirmDelete(note)}
                          >
                            <FaTrash className="me-2" /> Delete
                          </Dropdown.Item>
                          <Dropdown.Item 
                            className="text-white"
                            onClick={() => handleShare(note)}
                          >
                            <FaShare className="me-2" /> Share
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <h6 className="note-title mb-2 text-white">{note.title || "Untitled Note"}</h6>
                    <div className="mb-3 note-content text-white-50">{note.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={!!editNote} onHide={() => setEditNote(null)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter note title"
              value={editNote?.title || ""}
              onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
              className="bg-dark text-white border-secondary"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="bg-dark text-white border-secondary"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="secondary" onClick={() => setEditNote(null)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          Are you sure you want to delete this note? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
