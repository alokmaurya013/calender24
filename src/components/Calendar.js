import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { EventContext } from '../context/EventContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

const localizer = momentLocalizer(moment);
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  select {
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 150px;

    @media (max-width: 768px) {
      width: 100%;
      margin-top: 10px;
    }
  }
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  margin-left:20px;
  background-color: #3174ad;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #255b88;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const CalendarWrapper = styled.div`
height: 500px;
@media (max-width: 768px) {
  height: 400px;
}
`;

const Calendar = () => {
  const { events } = useContext(EventContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.category === selectedCategory);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    if (event.category === 'Personal') backgroundColor = '#f28b82';
    if (event.category === 'Work') backgroundColor = '#a7ffeb';
    if (event.category === 'Other') backgroundColor = '#ffadad';

    return {
      style: {
        backgroundColor,
        color: 'white',
      },
    };
  };
  const handleAddEvent=()=>{
    navigate('/addEvent');
  }
  return (
    <Container>
      <Header>Calendar</Header>
      <FilterWrapper>
        <label>Filter by Category: </label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
        <Button type='button' onClick={handleAddEvent}>Add Event</Button>
      </FilterWrapper>
     <CalendarWrapper>
      <BigCalendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
      />
      </CalendarWrapper>
    </Container>
  );
};

export default Calendar;
