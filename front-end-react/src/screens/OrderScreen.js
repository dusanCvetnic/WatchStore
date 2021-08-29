import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder } from "../actions/orderActions";
import CreditCardPayment from "../components/CreditCardPayment";
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = (props) => {
    const orderId = props.match.params.id
    const orderDetails = useSelector((state) => state.orderDetails)
    const {order, loading, error} = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, error: errorPay, success: successPay} = orderPay
    const dispatch = useDispatch()

    useEffect(() => {
        if(!order || successPay || (order && order._id !== orderId)){
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch(detailsOrder(orderId))
        } else {

        }
        
    }, [order, successPay, dispatch, orderId])

    const successPaymentHandler = () => {
        dispatch(payOrder(order))
    }
    return loading? (<LoadingBox></LoadingBox>) :
    error? (<MessageBox variant="danger">{error}</MessageBox>):
    (
        <div>
            <h1>Porudzbina {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Posiljka</h2>
                                <p>
                                    <strong>Ime i prezime: </strong> {order.shippingAddress.fullName} <br />
                                    <strong>Adresa: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city},
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered? (<MessageBox variant="success">Dostavljeno {order.deliveredAt.substring(0,10)}</MessageBox>) : (<MessageBox variant="danger">Nije dostavljena</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Placanje</h2>
                                <p>
                                    <strong>Nacin placanja: </strong> {order.paymentMethod}
                                </p>
                                {order.isPaid? (<MessageBox variant="success">Placeno  {order.paidAt.substring(0,10)}</MessageBox>) : (<MessageBox variant="danger">Nije placeno</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Status porudzbine</h2>
                                <p>
                                    <strong>Status: </strong> <strong>{order.status.toUpperCase()}</strong>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Sadrzaj porudzbine</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                    <li key={item.product}>
                                        <hr></hr>
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
                                    <div>€{order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Dostava</div>
                                    <div>€{order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>PDV</div>
                                    <div>€{order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Ukupna cena</strong></div>
                                    <div><strong>€{order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                !order.isPaid && order.status !== "otkazana" && (<li>
                                    <h2>Placanje</h2>
                                    <CreditCardPayment></CreditCardPayment>
                                </li> )
                            }
                            <li className="payment-form">
                                {errorPay && (
                                    <MessageBox variant="danger">{errorPay}</MessageBox>
                                )}
                                {loadingPay && <LoadingBox></LoadingBox>}
                                {!order.isPaid && order.status !== "otkazana" && (<button className="primary" onClick={successPaymentHandler}>Plati porudzbinu</button>)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default OrderScreen;