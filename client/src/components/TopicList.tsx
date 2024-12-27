import React, { useState } from 'react';
import axios from 'axios';
import { Topic } from '../types';
import { API_URL } from '../constans/uri.constans.ts';

interface TopicListProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  selectedTopic: Topic | null;
  setSelectedTopic: React.Dispatch<React.SetStateAction<Topic | null>>;
}

const TopicList: React.FC<TopicListProps> = ({ topics, setTopics, selectedTopic, setSelectedTopic }) => {
  const [newTopicName, setNewTopicName] = useState('');

  const createTopic = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/topics`,
        { name: newTopicName },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTopics([...topics, response.data]);
      setNewTopicName('');
    } catch (error) {
      console.error('Failed to create topic:', error);
    }
  };

  const deleteTopic = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/topics?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTopics(topics.filter((topic) => topic.id !== id));
      if (selectedTopic && selectedTopic.id === id) {
        setSelectedTopic(null);
      }
    } catch (error) {
      console.error('Failed to delete topic:', error);
    }
  };

  const moveNote = async (noteId: number, newTopicId: number) => {
    try {
      await axios.put(
        `${API_URL}/notes/move?id=${noteId}`,
        { newTopicId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
    } catch (error) {
      console.error('Failed to move note:', error);
    }
  };

  const renderTopics = (topicList: Topic[], level = 0) => {
    return topicList.map((topic) => (
      <div key={topic.id} style={{ marginLeft: `${level * 20}px` }}>
        <span onClick={() => setSelectedTopic(topic)}>{topic.name}</span>
        <button onClick={() => deleteTopic(topic.id)}>Delete</button>
        {topic.children && renderTopics(topic.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="topic-list">
      <h2>Topics</h2>
      {renderTopics(topics)}
      <div>
        <input
          type="text"
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          placeholder="New topic name"
        />
        <button onClick={createTopic}>Add Topic</button>
      </div>
    </div>
  );
};

export default TopicList;

