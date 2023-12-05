import React, { useState } from 'react';
import CartComponent from './CartComponent';

const DataList = ({ filteredData, onDeleteUser, onEditUser }) => {
  const [searchName, setSearchName] = useState('');
  const [searchDomain, setSearchDomain] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [searchAvailability, setSearchAvailability] = useState('');
  const [creatingTeam, setCreatingTeam] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCart, setShowCart] = useState(false);


  const filteredItems = filteredData.filter((item) => {
    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
    const domain = `${item.domain}`.toLowerCase();
    const gender = `${item.gender}`.toLowerCase();
    const availability = `${item.available}`.toLowerCase();

    const nameMatch = fullName.includes(searchName.toLowerCase());
    const domainMatch = domain.includes(searchDomain.toLowerCase());
    const genderMatch = gender.startsWith(searchGender.toLowerCase());
    const availabilityMatch = availability.startsWith(searchAvailability.toLowerCase());

    return nameMatch && domainMatch && genderMatch && availabilityMatch;
  });

  const handleCreateTeamClick = () => {
    setCreatingTeam(true);
    setShowCart(false);
  };

  const handleSelectButtonClick = (item) => {
    const isUniqueDomain = selectedItems.every((selectedItem) => selectedItem.domain !== item.domain);

    if (isUniqueDomain) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleShowCartClick = () => {
    setShowCart(!showCart);
  };

  const handleDeleteButtonClick = async (index) => {
    try {
      const userIdToDelete = filteredItems[index]._id;

      await onDeleteUser(userIdToDelete);

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditButtonClick = async (index) => {
    const userToEdit = filteredItems[index];
    await onEditUser(userToEdit);
  };


  return (
    <div>
      <div className='create-team'>
        {creatingTeam ? (
          <div className='team-name'>
            <button onClick={() => setCreatingTeam(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleCreateTeamClick}>Create a Team</button>
        )}
        <button className='cart-handle' onClick={handleShowCartClick}>{showCart ? 'Hide Cart' : 'Show Cart'}</button>
        {showCart && (
          <div className="cart-modal">
            <CartComponent selectedItems={selectedItems} />
          </div>
        )}
      </div>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search by Name...'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Search by Domain...'
          value={searchDomain}
          onChange={(e) => setSearchDomain(e.target.value)}
        />
        <input
          type='text'
          placeholder='Search by Gender...'
          value={searchGender}
          onChange={(e) => setSearchGender(e.target.value)}
        />
        <input
          type='text'
          placeholder='Search by Availability...'
          value={searchAvailability}
          onChange={(e) => setSearchAvailability(e.target.value)}
        />
      </div>
      <div className='data-container'>
        {filteredItems.map((item, index) => (
          <div key={index} className={`data-item ${selectedItems.some(selectedItem => selectedItem.domain === item.domain) ? 'selected' : ''}`}>
            <img
              src={item.avatar}
              alt={`Item ${index}`}
              style={{ width: '50%', height: '50%' }}
            />
            <p className='name'>Name: {item.first_name} {item.last_name}</p>
            <p className='email'>Email: {item.email}</p>
            <p className='gender'>Gender: {item.gender}</p>
            <p className='domain'>Domain: {item.domain}</p>
            <button className='delete' onClick={() => handleDeleteButtonClick(index)}>Delete</button>
            <button className='edit' onClick={() => handleEditButtonClick(index)}>Edit</button>
            {creatingTeam && (
              <button className='select' onClick={() => handleSelectButtonClick(item)}>Select for Team</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataList;
