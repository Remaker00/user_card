import React from 'react'

const ItemList = ({ items, addToCart }) => {
    return (
        <div>
            <h2>Items:</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {item.medName},{' '}
                        <strong>Description:</strong> {item.description},{' '}
                        <strong>Price:</strong> {item.price},{' '}
                        <strong>Quantity:</strong> {item.quantity}{' '}
                        {item.quantity > 0 && (
                            <button onClick={() => addToCart(item)}>Add To Cart</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ItemList
