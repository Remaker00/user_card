import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataList from './DataList';
import UserForm from './UserForm';

const Dashboard = () => {
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const perPage = 20;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users?page=${currentPage}`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddUser = (newUser) => {
    setData((prevData) => [...prevData, newUser]);
    try {
      console.log(newUser);
      const response = axios.post('http://localhost:4000/api/users', newUser);
      console.log('User added successfully:', response.data);

      setData((prevData) => [...prevData, newUser]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setShowForm(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${userId}`);
      alert("User Successfully Deleted");
      const updatedData = data.filter(user => user._id !== userId);
      setData(updatedData);

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/users/${userId}`, updatedUserData);
      const updatedUser = response.data;
      const updatedData = data.map(user => (user._id === userId ? updatedUser : user));
      setData(updatedData);

    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleEditButtonClick = (userData) => {
    setShowForm(true);
    setSelectedUserData(userData);
  };

  return (
    <div className='dashboard-container'>
      <div className='mongo'>
        <button onClick={handleToggleForm}>{showForm ? 'Close Form' : 'Add User'}</button>
        {showForm && (
          <>
            <div className="backdrop" onClick={handleToggleForm}></div>
            <div className="form-container">
              <UserForm onAddUser={handleAddUser} editedUserData={selectedUserData} />
            </div>
          </>
        )}
        <DataList filteredData={data} onDeleteUser={handleDeleteUser} onEditUser={handleEditButtonClick} />
        <div className='pagination'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={data.length < perPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
