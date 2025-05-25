import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editForm, setEditForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      setError("Failed to fetch notes");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    try {
      await API.post("/notes", form);
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      setError("Could not create note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      setError("Could not delete note");
    }
  };

  const startEdit = (note) => {
    setEditId(note._id);
    setEditForm({ title: note.title, content: note.content });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ title: "", content: "" });
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/notes/${id}`, editForm);
      setEditId(null);
      setEditForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      setError("Could not update note");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Your Notes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create Note */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        /><br />
        <textarea
          placeholder="Content"
          name="content"
          value={form.content}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Add Note</button>
      </form>

      <hr />

      {/* Notes List */}
      {notes.length === 0 ? (
        <p>No notes yet</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            {editId === note._id ? (
              <>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                /><br />
                <textarea
                  name="content"
                  value={editForm.content}
                  onChange={handleEditChange}
                /><br />
                <button onClick={() => saveEdit(note._id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <button onClick={() => startEdit(note)}>Edit</button>{" "}
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;
