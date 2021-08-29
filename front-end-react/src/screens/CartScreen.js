import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import {Link} from 'react-router-dom';
import MessageBox from "../components/MessageBox";

const Cart = (props) => {

    const productId = props.match.params.id
    const quantity = props.location.search?Number(props.location.search.split('=')[1]):1
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    const dispatch = useDispatch()

    useEffect(() =>{
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    return ( 
        <div className="row top">
            <div className="col-2">
            <strong><h1>KORPA</h1></strong>
            <div className="row">
            <Link to="/"><h2>Nazad na kupovinu</h2></Link>
            </div>
            <hr></hr>
            {cartItems.length === 0 ? (
            <MessageBox>
                Vasa korpa je prazna <Link to="/">Idi na kupovinu</Link>
            </MessageBox>
            ) : (
            <ul>
                {cartItems.map((item) => (
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
                    <div>
                        <select
                        value={item.quantity}
                        onChange={(e) =>
                            dispatch(
                            addToCart(item.product, Number(e.target.value))
                            )
                        }
                        >
                        {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                            {x + 1}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div>€{item.price}</div>
                    <div>
                        <button
                        type="button"
                        className="danger"
                        onClick={() => removeFromCartHandler(item.product)}
                        >
                        Obrisi iz korpe
                        </button>
                    </div>
                    </div>
                    <hr></hr>
                </li>
                ))}
            </ul>
            )}
        </div>
        <div className="col-1">
            <div className="card card-body">
            <ul>
                <li>
                <h2>
                    Ukupno ({cartItems.reduce((a, c) => a + c.quantity, 0)} proizvoda) : €
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h2>
                </li>
                <li>
                <button
                    type="button"
                    onClick={checkoutHandler}
                    className="primary block"
                    disabled={cartItems.length === 0}
                >
                    Nastavi na porucivanje
                </button>
                </li>
            </ul>
            </div>
        </div>
    </div>
    );
}
 
export default Cart;