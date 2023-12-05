import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ editedUserData }) => {
  const [imageLink, setImageLink] = useState(editedUserData ? editedUserData.avatar : '');
  const [first_name, setFirst_Name] = useState(editedUserData ? editedUserData.first_name : '');
  const [last_name, setLast_Name] = useState(editedUserData ? editedUserData.last_name : '');
  const [email, setEmail] = useState(editedUserData ? editedUserData.email : '');
  const [domain, setDomain] = useState(editedUserData ? editedUserData.domain : '');
  const [gender, setGender] = useState(editedUserData ? editedUserData.gender : '');
  const [availability, setAvailability] = useState(editedUserData ? editedUserData.available : '');

  const handleAddUser = async () => {
    const newUser = {
      avatar: imageLink,
      first_name: first_name,
      last_name: last_name,
      email: email,
      domain: domain,
      gender: gender,
      available: availability,
    };

    try {
      if (editedUserData) {
        await axios.put(`http://localhost:4000/api/users/${editedUserData._id}`, newUser);
        alert("User Updated Successfully");
        window.location.reload();
      } else {
        await axios.post('http://localhost:4000/api/users', newUser);
        alert("User Added Successfully");

      }

      setImageLink('');
      setFirst_Name('');
      setLast_Name('');
      setEmail('');
      setDomain('');
      setGender('');
      setAvailability('');
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
  };

  useEffect(() => {
    if (editedUserData) {
      setImageLink(editedUserData.avatar);
      setFirst_Name(editedUserData.first_name);
      setLast_Name(editedUserData.last_name);
      setEmail(editedUserData.email);
      setDomain(editedUserData.domain);
      setGender(editedUserData.gender);
      setAvailability(editedUserData.available);
    }
  }, [editedUserData]);

  const handlereload = () => {
    setImageLink('');
    setFirst_Name('');
    setLast_Name('');
    setEmail('');
    setDomain('');
    setGender('');
    setAvailability('');
  }

  return (
    <div className="user-form">
      <h2>{editedUserData ? 'Edit User' : 'Add User'}</h2>
      <div className="form-group">
        <label>Image Link:</label>
        <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" value={first_name} onChange={(e) => setFirst_Name(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" value={last_name} onChange={(e) => setLast_Name(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Domain:</label>
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Availability:</label>
        <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} />
      </div>
      <button onClick={handleAddUser}>{editedUserData ? 'Update User' : 'Add User'}</button>
      <button onClick={handlereload}>ReFresh</button>
    </div>
  );
};

export default UserForm;
