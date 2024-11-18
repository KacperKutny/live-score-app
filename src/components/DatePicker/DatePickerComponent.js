import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import default styling
import './DatePickerComponent.css'; // Custom styling for the component
import { FaCalendarAlt } from 'react-icons/fa'; // Calendar icon from react-icons

const DatePickerComponent = ({ selectedDate, onDateChange }) => {

  
  return (
    <div className="date-picker-container">
      <FaCalendarAlt className="calendar-icon" /> {/* Calendar Icon */}
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