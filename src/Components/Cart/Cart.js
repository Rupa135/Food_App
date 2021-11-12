import React, { createContext, useContext, useState } from "react";
import CartContext from "../Context/CartContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css"
import MealItem from "../Meals/MealItems/MealItem";
import CartItem from "./CartItem"
import CartOrderForm from "./CartOrderForm";

const Cart = (props) => {
    
    const [issubmitted , setIsSubmitted] = useState(false)
    const [didSubmit , setDidSubmit] = useState(false)
    const [isCheckout , setIsCheckout] = useState(false)
    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const addToCartHandler = (item) => {
        cartCtx.addItem({...item , amount : 1})
    }

    const removeFromCartHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const isItemsInCart = cartCtx.items.length > 0

    const cartItems = 
        <ul>
            {cartCtx.items.map((item) => 
                <CartItem
                id = {item.id}
                key = {item.id}
                name = {item.name}
                price = {item.price}
                amount = {item.amount}
                onRemove = {removeFromCartHandler.bind(null,item.id)}
                onAdd = {addToCartHandler.bind(null,item)}
            />     
            )}
        </ul>

        const checkOutHandler = () => {
            setIsCheckout(true)
        }

        const confirmOrderHandler = async (userdata) => {
            setIsSubmitted(true)
            await fetch("https://foodapp-5f315-default-rtdb.firebaseio.com/meals.json", {
                method : "POST",
                body : JSON.stringify({
                    user : userdata,
                    orderedItems : cartCtx.items
                })
            })

            setIsSubmitted(false)
            setDidSubmit(true)
            cartCtx.clearCart()
        }

        const cartModal =(
            <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <CartOrderForm onConfirm = {confirmOrderHandler} OnCancel = {props.onHideCart}/>}
            {!isCheckout && <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick = {props.onHideCart}>Close</button>
                {isItemsInCart && <button className={classes.button} onClick={checkOutHandler}>Order</button>}
            </div>}
            </React.Fragment>
        )

        const didSubmitModalContent = (
            <React.Fragment>
              <p>Successfully sent the order!</p>
              <div className={classes.actions}>
              <button className={classes.button} onClick={props.onHideCart}>
                Close
              </button>
            </div>
            </React.Fragment>
          );

    return(
        <Modal onHideCart={props.onHideCart}>
            {!issubmitted && !didSubmit && cartModal}
            {issubmitted && <p>Data is Submitting........</p>}
            {!issubmitted && didSubmit && didSubmitModalContent}
        </Modal>
    )

}

export default Cart;