import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps"
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"

const PlaceOrderScreen = (props) => {
    const cart = useSelector(state => state.cart)
    if(!cart.paymentMethod){
        props.history.push('/payment')
    }
    const orderCreate = useSelector(state => state.orderCreate)
    const {loading, success, error, order} = orderCreate
    const toPrice = (num) => Number(num.toFixed(2))
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a+c.quantity*c.price, 0))
    cart.shippingPrice = cart.itemsPrice > 30000 ? toPrice(0) : toPrice(1000)
    cart.taxPrice = toPrice(0.2*cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice
    const dispatch = useDispatch()
    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }
    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`)
            dispatch({
                type: ORDER_CREATE_RESET
            })
        }
    }, [dispatch, order, props.history, success])
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Posiljka</h2>
                                <p>
                                    <strong>Ime i prezime: </strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Adresa: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city},
                                    {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Placanje</h2>
                                <p>
                                    <strong>Nacin placanja: </strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Sadrzaj porudzbine</h2>
                                <hr />
                                <ul>
                                    {cart.cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                        <div>
                                            <img
                                            src={item.image}
                                            alt={item.name}
                                            className="small"
                                            ></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>{item.quantity} x ${item.price} = ${item.quantity * item.price}</div>
                                        </div>
                                        <hr />
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Porudzbina</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Cena</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Dostava</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>PDV</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Ukupna cena</strong></div>
                                    <div><strong>€{cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}>
                                    Potvrdi porudzbinu
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PlaceOrderScreen;