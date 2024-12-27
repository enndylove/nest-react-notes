import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopicList from './TopicList.tsx';
import NoteEditor from './NoteEditor.tsx';
import { Topic, Note } from '../types';
import { API_URL } from '../constans/uri.constans.ts';

const Dashboard: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      fetchNotes(selectedTopic.id);
    }
  }, [selectedTopic]);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(`${API_URL}/topics`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTopics(response.data);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    }
  };

  const fetchNotes = async (topicId: number) => {
    try {
      const response = await axios.get(`${API_URL}/notes?topicId=${topicId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Notes Manager</h1>
      <div className="dashboard-content">
        <TopicList
          topics={topics}
          setTopics={setTopics}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        <NoteEditor
          selectedTopic={selectedTopic}
          notes={notes}
          setNotes={setNotes}
        />
      </div>
    </div>
  );
};

export default Dashboard;

