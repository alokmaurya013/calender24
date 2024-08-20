import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    font-size: 1rem;
    color: #333;
  }

  input, select {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .save {
    background-color: #3174ad;

    &:hover {
      background-color: #255b88;
    }
  }

  .delete {
    background-color: #ff4b4b;

    &:hover {
      background-color: #d94444;
    }
  }

  .cancel {
    background-color: #aaa;

    &:hover {
      background-color: #888;
    }
  }
`;

const EventFormModal = ({ event, onSave, onDelete, onClose }) => {
    const [title, setTitle] = useState(event?.title || '');
    const [start, setStart] = useState(event?.start || '');
    const [end, setEnd] = useState(event?.end || '');
    const [category, setCategory] = useState(event?.category || 'Work');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...event, title, start, end, category });
    };

    return (
        <Modal>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <label>Event Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label>Start Date:
                        <input type="datetime-local" value={moment(start).format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </label>
                    <label>End Date:
                        <input type="datetime-local" value={moment(end).format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </label>
                    <label>Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <ButtonGroup>
                        <button type="submit" className="save">Save</button>
                        {event && event.id && (
                            <button type="button" className="delete" onClick={() => onDelete(event.id)}>Delete</button>
                        )}
                        <button type="button" className="cancel" onClick={onClose}>Cancel</button>
                    </ButtonGroup>
                </Form>
            </ModalContent>
        </Modal>
    );
};

export default EventFormModal;
