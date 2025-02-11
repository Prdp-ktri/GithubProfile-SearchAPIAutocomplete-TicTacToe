import { useEffect } from "react";
import { useState } from "react";
import Suggestions from "./suggestions";

export default function SearchAutocomplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [showDropdown, setShowdropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange() {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowdropdown(true);
    } else {
      setShowdropdown(false);
    }
  }

  function handleClick(event){
    setShowdropdown(false)
    setSearchParam(event.target.innerText);
    setFilteredUsers([])
  }

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      console.log(data);
      if (data && data.users && data.users.length) {
        setUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  console.log(users, filteredUsers);

  return (
    <div className="search-autocomplete-container">
      {loading ? (
        <h1>Loading Data! Please Wait!</h1>
      ) : (
        <input
          value={searchParam}
          name="search-users"
          placeholder="Search users here..."
          onChange={handleChange}
        />
      )}
      {showDropdown && <Suggestions handleClick={handleClick} data={filteredUsers} />}
    </div>
  );
}
