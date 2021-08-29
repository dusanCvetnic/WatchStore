import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps"

const PayementMethodScreen = (props) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('Kartica')
    const dispatch = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }
    
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Nacin placanja</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="gotovina" value="Gotovina" name="paymentMethod" required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="gotovina">Gotovina</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="kartica" value="Kartica" name="paymentMethod" required checked onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="kartica">Kartica</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Nastavi</button>
                </div>
            </form>
        </div>
    );
}
 
export default PayementMethodScreen;