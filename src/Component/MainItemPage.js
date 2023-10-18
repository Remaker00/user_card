import React, { useState } from 'react'
import ItemAddPage from './ItemAddPage';
import ItemList from './ItemList';
import Cart from './Cart';
import classes from './Item.module.css';

const MainItemPage = () => {

    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [IsCartOpen, setIsCartOpen] = useState(false);

    const handleaddItem = (newItem) => {
        setItems((prevItems) => {
            const itemIndex = prevItems.findIndex((item) => item.medicineName === newItem.medicineName);
            if (itemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = { ...newItem, quantity: newItem.quantity - 1 };
                if (updatedItems[itemIndex].quantity <= 0) {
                    updatedItems[itemIndex].quantity = 'Out of Stock';
                }
                return updatedItems;
            } else {
                return prevItems.concat(newItem);
            }
        });
    }

    const addToCartHandler = (item) => {
        // Check if the item is already in the cart
        const existingItemIndex = cart.findIndex((i) => i.medicineName === item.medicineName);

        // Create a copy of the cart array
        const updatedCart = [...cart];

        if (existingItemIndex !== -1) {
            // Item already exists in the cart, increment its quantity by 1
            updatedCart[existingItemIndex].quantity += 1;

            if (updatedCart[existingItemIndex].quantity === 0) {
                // Remove the item from the cart if quantity becomes zero
                updatedCart.splice(existingItemIndex, 1);
            }
        } else {
            // Item is not in the cart, add it with quantity 1
            const newItem = { ...item, quantity: 1 };
            updatedCart.push(newItem);
        }

        // Create a copy of the items array
        const updatedItems = [...items];
        const itemIndex = updatedItems.findIndex((i) => i.medicineName === item.medicineName);

        if (itemIndex !== -1) {
            updatedItems[itemIndex].quantity -= 1;

            if (updatedItems[itemIndex].quantity <= 0) {
                updatedItems[itemIndex].quantity = 'Out of Stock';
            }
        }

        // Update both items and cart
        setItems(updatedItems);
        setCart(updatedCart);
    };

    const toggleCart=()=>{
        setIsCartOpen(!IsCartOpen);
    }

    return (
        <div>
            <div className={classes['contain']} onClick={toggleCart}>
                CART
            </div>
            {IsCartOpen && <Cart cart={cart} />}
            <ItemAddPage addItem={handleaddItem} />
            <ItemList items={items} cartItems={cart} addToCart={addToCartHandler}  />
        </div>
    )
}

export default MainItemPage
