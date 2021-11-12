import { Fragment } from "react"
import ReactDom from "react-dom"

import classes from "./Modal.module.css"

const BackDrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onHideCart}/>
}

const ModalOverlay = (props) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
        
    )
}

const portalElement = document.getElementById("overlays")

const Modal = (props) => {
    return(
        <Fragment>
            {ReactDom.createPortal(<BackDrop onHideCart={props.onHideCart}/> , portalElement)}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </Fragment>
    )

}

export default Modal;