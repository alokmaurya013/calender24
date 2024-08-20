
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { EventContext } from '../context/EventContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 15px;
  background-color: #fff;
  min-height: 100vh;
  justify-content: center;
`;
const FormTitle = styled.h1`
  font-size: 2rem;
  color: #3174ad;
  margin-bottom: 20px;
  text-align: center;
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 1rem;
    color: #333;
  }

  input, select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #3174ad;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #255b88;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AddEventForm = () => {
  const { addEvent } = useContext(EventContext);

  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Math.floor(Math.random() * 10000),
      title,
      start: new Date(start),
      end: new Date(end),
      category,
    };

    addEvent(newEvent);

    setTitle('');
    setStart('');
    setEnd('');
    setCategory('');
  };

  return (
    <Container>
    <FormTitle>Add Events</FormTitle>
    <FormWrapper onSubmit={handleSubmit}>
    <FormGroup>
    <label>Title:</label>
    <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
      <label>Start Date:</label>
      <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
      <label>End Date:</label>
      <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
      <label>Category:</label>
      <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
          </select>
          </FormGroup>
          <SubmitButton type="submit">Add Event</SubmitButton>
          </FormWrapper>
          </Container>
  );
};

export default AddEventForm;
