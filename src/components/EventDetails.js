import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';
import EventFormModal from './EventFormModal';

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const EventInfo = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 10px;
  strong {
    color: #333;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    button {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  color: white;
  background-color: #3174ad;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #255b88;
  }

  &.delete {
    background-color: #ff4b4b;

    &:hover {
      background-color: #d94444;
    }
  }
`;

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events,editEvent, deleteEvent } = useContext(EventContext);
  const[modalOpen,setModalOpen]=useState(false);

  const event = events.find(event => event.id === parseInt(id));

  if (!event) {
    return<p>Event not found!</p>;
  }
  
  const handleDelete = (eventId) => {
    deleteEvent(eventId);
    navigate('/');
  };

  const handleSaveEvent=(updatedEvent)=>{
       editEvent(updatedEvent);
       setModalOpen(false);
  }

  const handleOpenModal=()=>{
    setModalOpen(true);
  }

  const handleCloseModal=()=>{
    setModalOpen(false);
  }

  return (
    <Container>
    <Title>{event.title}</Title>
    <Button onClick={() => navigate(-1)}>Back</Button>
    <EventInfo><strong>Start:</strong> {new Date(event.start).toLocaleString()}</EventInfo>
    <EventInfo><strong>End:</strong> {new Date(event.end).toLocaleString()}</EventInfo>
    <EventInfo><strong>Category:</strong> {event.category}</EventInfo>
    <ButtonGroup>
    <Button onClick={handleOpenModal}>Edit</Button>
    <Button className="delete" onClick={handleDelete}>Delete</Button>
    </ButtonGroup>
    {modalOpen&&(
        <EventFormModal event={event} onSave={handleSaveEvent} onClose={handleCloseModal} onDelete={handleDelete}/>
    )}
    </Container>
  );
};

export default EventDetails;
