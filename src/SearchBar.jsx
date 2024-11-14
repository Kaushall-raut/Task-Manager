import{ useState } from "react";

export const SearchBar = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4 animate-slide-in">
      <input
        type="text"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={handleSearchChange}
        className="input input-bordered w-full md:w-2/3 transition-all focus:ring-2 focus:ring-primary"
      />
        <label htmlFor="sort" className="text-black text-lg text-1xl font-semibold">Sort by:</label>
      <select
        onChange={(e) => onSort(e.target.value)}
        className="select select-bordered w-full md:w-1/3"
      >
       
        <option value="priority">Priority</option>
        <option value="completed">Completed</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};

