import React, { useState } from 'react';
import axios from 'axios';

const CartComponent = ({ selectedItems }) => {
  const [teamName, setTeamName] = useState('');


  const handleSubmission = async () => {
    try {
      const dataToSend = {
        teamName: teamName,
        selectedItems: selectedItems,
      };

      const response = await axios.post('http://localhost:4000/api/storeData', dataToSend);
      console.log(response.data);
      alert("Submitted Successful");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='main-cart-container'>
      <div>
        <h2>Team Name:</h2>
        <input
          type='text'
          placeholder='Enter the team name'
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <h2>Selected Users:</h2>
      <div className='cart-container'>
        {selectedItems.map((item, index) => (
          <div key={index} className='cart-item'>
            <div className='cart-item-img'>
              <img
                src={item.avatar}
                alt={`Item ${index}`}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className='cart-item-content'>
              <p className='name'>
                Name: {item.first_name} {item.last_name}
              </p>
              <p className='email'>Email: {item.email}</p>
              <p className='gender'>Gender: {item.gender}</p>
              <p className='domain'>Domain: {item.domain}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='cart-submit-button' onClick={handleSubmission}>
        Submit
      </button>
    </div>
  );
};

export default CartComponent;
