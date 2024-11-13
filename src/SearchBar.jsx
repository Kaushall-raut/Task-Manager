import React, { useState } from 'react';

const SearchBar = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select
        className="form-select"
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="priority">Priority</option>
        <option value="completed">Completed</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};

export default SearchBar;
