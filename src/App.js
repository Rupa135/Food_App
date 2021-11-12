import React , {Fragment , useState} from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Components/Context/CartProvider"

const App = () => {

  const [isCartShown , setIsCartShown] = useState(false)

  const showCartHandler = () => {
    setIsCartShown(true)
  }

  const hideCartHandler = () => {
    setIsCartShown(false)
  }

  return(
    <CartProvider>
      <Header onShowCart={showCartHandler}/>
      {isCartShown && <Cart onHideCart = {hideCartHandler}/>}
      <main>
        <Meals/>
      </main>
      
    </CartProvider>
  )

}

export default App;