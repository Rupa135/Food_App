import React , {useRef , useState} from "react";
import classes from "./CartOrderForm.module.css"

const CartOrderForm = (props) => {

    const [issubmitted , setIsSubmitted] = useState(false)
    const [didSubmit , setDidSubmit] = useState(false)
    const nameRef = useRef()
    const streetRef = useRef()
    const postalRef = useRef()
    const cityRef = useRef()

    const [formInputValidity , setFormInputValidity] = useState({
        name : true,
        street : true,
        postal : true,
        city : true
    })

    const isEmpty = value => value.trim() ==="";
    const isFivestar = value => value.length!==5


    const submitHandler = (event)  => {
        event.preventDefault()

        const enteredName = nameRef.current.value
        const enteredStreet = streetRef.current.value
        const enteredPostalCode = postalRef.current.value
        const enteredCity = cityRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalIsValid = !isFivestar(enteredPostalCode)
        const enteredCityIsValid = !isEmpty(enteredCity)

        setFormInputValidity({
            name : enteredNameIsValid,
            street : enteredStreetIsValid,
            postal : enteredPostalIsValid,
            city : enteredCityIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name : enteredName,
            street : enteredStreet,
            postal : enteredPostalCode,
            city : enteredCity
        })
        
    }

    const nameClasses = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`
    const streetClasses = `${classes.control} ${formInputValidity.street ? "" : classes.invalid}`
    const postalClasses = `${classes.control} ${formInputValidity.postal ? "" : classes.invalid}`
    const cityClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`

  
    return(
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef}/>
                {!formInputValidity.name && <p>Enter valid name</p> }
            </div>
            <div className={streetClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street"ref={streetRef}/>
                {!formInputValidity.street && <p>Enter valid street</p> }
            </div>
            <div className={postalClasses}>
                <label htmlFor="postal">Postal Address</label>
                <input type="text" id="postal" ref={postalRef}/>
                {!formInputValidity.postal && <p>Enter valid PostalCode</p> }
            </div>
            <div className={cityClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityRef}/>
                {!formInputValidity.city && <p>Enter valid city</p> }
            </div>
            <div className={classes.actions}>
                <button onClick={props.OnCancel} type="button">Cancel</button>
                <button type="submit">Confirm</button>
            </div>
                
            
        </form>
    )

}

export default CartOrderForm;