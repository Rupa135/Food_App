import React , {Fragment} from "react";
import imageItem from "../../assests/food.jpg"
import classes from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

    return (
        <Fragment>
            <header className={classes.header}>
              <h1>Desi Food App</h1>
              <HeaderCartButton onClick={props.onShowCart} />
            </header>
            
            <div className={classes["main-image"]}>
                <img src={imageItem} alt="Image with delicious Food"/>
            </div>
        </Fragment>
    )

}

export default Header;