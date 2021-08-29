import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancleOrder, deliverOrder, listOrders } from '../actions/orderActions';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CANCEL_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";

const OrderListScreen = (props) => {
    const orderList = useSelector((state) => state.orderList)
    const {loading, error, orders} = orderList
    const orderCancel = useSelector((state) => state.orderCancel)
    const {loading: loadingCancel, error: errorCancel, success: successCancel} = orderCancel
    const orderDeliver = useSelector((state) => state.orderDeliver)
    const {loading: loadingDeliver, error: errorDeliver, success: successDeliver} = orderDeliver

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: ORDER_CANCEL_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        dispatch(listOrders())
    }, [dispatch, successCancel, successDeliver])

    const cancelHandler = (order) => {
        //TODO
        dispatch(cancleOrder(order._id))
    }

    const deliverHandler = (order) => {
        //TODO
        dispatch(deliverOrder(order._id))
        //window.location.reload(false);
    }
    return (
        <div>
            <h1>Porudzbine</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>KORISNIK</th>
                            <th>DATUM</th>
                            <th>UKUPNA CENA</th>
                            <th>STATUS PLACANJA</th>
                            <th>STATUS DOSTAVE</th>
                            <th>AKCIJE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}{' '}{order.user.surname}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : 'Nije placeno'}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'Nije dostavljeno'}</td>
                                <td>
                                    <button type="button" className="small" onClick={() => {props.history.push(`/order/${order._id}`)}}>Detalji</button>
                                    {order.status !== "otkazana" && !order.isDelivered && !order.isPaid && (<button type="button" className="small" onClick={() => {cancelHandler(order)}}>Otkazi</button>)}
                                    {order.status !== "otkazana" && !order.isDelivered && order.isPaid && (<button type="button" className="small" onClick={() => {deliverHandler(order)}}>Dostavi</button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
 
export default OrderListScreen;