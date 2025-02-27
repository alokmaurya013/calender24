import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';
import EventDetails from './components/EventDetails';
import { EventProvider } from './context/EventContext';

import AddEventForm from './components/AddEventForm';

const App = () => {

  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/event/:id" element={<EventDetails />} />
           <Route path="/addEvent" element={<AddEventForm/>}/>
        </Routes>
      </Router>
    </EventProvider>
  );
};

export default App;
