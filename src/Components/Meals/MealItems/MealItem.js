import Card from "../../UI/Card"
import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"
import { useContext } from "react"
import CartContext from "../../Context/CartContext"

const MealItem = (props) => {

    const cartCtx = useContext(CartContext)

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id : props.id,
            name : props.name,
            amount : amount,
            price : props.price
        })
    }

    const pricechanged = `$${props.price.toFixed(2)}`

    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>
                    <p>{props.description}</p>
                </div>
                <div className={classes.price}>${pricechanged}</div>
            </div>
            <div><MealItemForm onAddToCart = {addToCartHandler}/></div>
        </li>
    )
}

export default MealItem;