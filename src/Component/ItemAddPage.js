import React, { useState } from 'react'
import classes from './Item.module.css';

const ItemAddPage = ({addItem}) => {

    const [medName, setmedName] = useState();
    const [description, setdescription] = useState();
    const [price, setprice] = useState();
    const [quantity, setquantity] = useState();


    const handlesubmit=()=>{
        if(medName && description && price && quantity) {
            const newItem = {
                medName, description,price,quantity
            }

            addItem(newItem);

            setmedName('');
            setdescription('');
            setprice('');
            setquantity('');
        }
    }

  return (
    <div className={classes['container']}>
        <label>Medicine Name:</label>
        <input type='text' value={medName} onChange={(e) => setmedName(e.target.value)}></input>
        <label>Description:</label>
        <input type='text' value={description} onChange={(e) => setdescription(e.target.value)}></input>
        <label>Price:</label>
        <input type='number' value={price} onChange={(e) => setprice(e.target.value)}></input>
        <label>Quantity:</label>
        <input type='number' value={quantity} onChange={(e) => setquantity(e.target.value)}></input>
        <div>
            <button onClick={handlesubmit}>Add Item</button>
        </div>
      
    </div>
  )
}

export default ItemAddPage
