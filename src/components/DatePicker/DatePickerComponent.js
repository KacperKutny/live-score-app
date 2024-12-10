import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import './DatePickerComponent.css'; 
import { FaCalendarAlt } from 'react-icons/fa'; 

const DatePickerComponent = ({ selectedDate, onDateChange }) => {

  
  return (
    <div className="date-picker-container">
      <FaCalendarAlt className="calendar-icon" /> 
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="yyyy/MM/dd"
        className="date-picker-input"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default DatePickerComponent;