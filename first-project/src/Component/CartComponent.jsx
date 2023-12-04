import React from 'react';

const CartComponent = ({ selectedItems, onSubmit }) => {
  return (
    <div>
      <h2>Selected Users:</h2>
      <div className='cart-container'>
        {selectedItems.map((item, index) => (
          <div key={index} className='cart-item'>
            <img
              src={item.avatar}
              alt={`Item ${index}`}
              style={{ width: '50%', height: '50%' }}
            />
            <p className='name'>Name: {item.first_name} {item.last_name}</p>
            <p className='email'>Email: {item.email}</p>
            <p className='gender'>Gender: {item.gender}</p>
            <p className='domain'>Domain: {item.domain}</p>
          </div>
        ))}
      </div>
      <button onClick={onSubmit}>Submit Selected Items</button>
    </div>
  );
};

export default CartComponent;
