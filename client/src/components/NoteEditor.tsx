import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { API_URL } from '../constans/uri.constans.ts';

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteEditorProps {
  selectedTopic: { id: number; name: string } | null;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ selectedTopic, notes, setNotes }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNote]);

  const saveNote = async () => {
    if (!selectedTopic) return;

    try {
      if (selectedNote) {
        const response = await axios.put(
          `${API_URL}/notes?id=${selectedNote.id}`,
          { title, content },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setNotes(notes.map((note) => (note.id === selectedNote.id ? response.data : note)));
      } else {
        const response = await axios.post(
          `${API_URL}/notes`,
          { title, content, topicId: selectedTopic.id },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setNotes([...notes, response.data]);
      }
      setSelectedNote(null);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/notes?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="note-editor">
      <h2>{selectedTopic ? `Notes for ${selectedTopic.name}` : 'Select a topic'}</h2>
      {selectedTopic && (
        <>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
          </div>
          <ReactQuill value={content} onChange={setContent} />
          <button onClick={saveNote}>{selectedNote ? 'Update Note' : 'Create Note'}</button>
          {selectedNote && <button onClick={() => setSelectedNote(null)}>New Note</button>}
        </>
      )}
      <div className="note-list">
        <h3>Notes</h3>
        {notes.map((note) => (
          <div key={note.id}>
            <span onClick={() => setSelectedNote(note)}>{note.title}</span>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteEditor;

