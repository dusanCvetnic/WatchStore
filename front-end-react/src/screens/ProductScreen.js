import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [quantity, setQuantity] = useState(1)
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate} = productReviewCreate

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {
        if(successReviewCreate){
            window.alert('Komentar je uspesno poslat')
            setRating('')
            setComment('')
            dispatch({
                type: PRODUCT_REVIEW_CREATE_RESET
            })
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);

    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?quantity=${quantity}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(comment && rating){
            dispatch(createReview(productId, {rating, comment, name: userInfo.name}))
        }else{
            alert('Molimo unesite ocenu i komentar!')
        }
    }

    return ( 
        <div>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
            {/* <Link to="/">Nazad u prodavnicu</Link> */}
            <div className="row top">
                <div className="col-1 slika">
                <img
                    className="large"
                    src={product.image}
                    alt={product.name}
                ></img>
                </div>
                <div className="col-2">
                    <ul>
                        <li>
                        <h1>{product.name}</h1>
                        </li>
                        <li>
                        <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}
                        ></Rating>
                        </li>
                        <li>Cena : €{product.price}</li>
                        <li>
                        Opis:
                        <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                <div className="card card-body">
                    <ul>
                    <li>
                        <div className="row">
                        <div></div>
                        <div className="price">Cena: €{product.price * quantity}</div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                        <div>Status:</div>
                        <div>
                            {product.countInStock > 0 ? (
                            <span className="success">Na stanju</span>
                            ) : (
                            <span className="danger">Nedostupno</span>
                            )}
                        </div>
                        </div>
                    </li>
                    {
                        product.countInStock > 0 && (
                            <>
                                <li>
                                    <div className="row">
                                        <div>Kolicina:</div>
                                        <div>
                                            <select className="custom-select" value={quantity} onChange={e => setQuantity(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map( x => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button onClick={addToCartHandler} className="primary block">Dodaj u korpu</button>
                                </li>
                            </>
                        )
                    }
                    </ul>
                </div>
                </div>
            </div>
            <div>
                <h2 id="reviews">Komentari:</h2>
                {product.reviews.length === 0 && (<MessageBox>Ne postoje komentari za ovaj proizvod</MessageBox>)}
                <ul>
                    {product.reviews.map((review) => (
                        <li className="card" key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating rating={review.rating} numReviews={product.numReviews} caption=" "></Rating>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                        </li>
                    ))}
                    <li>
                        {userInfo ? (
                            <form className="form" onSubmit={submitHandler}>
                                <div>
                                    <h2>Napravite komentar za proizvod</h2>
                                </div>
                                <div>
                                    <label htmlFor="rating">Ocena</label>
                                    <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Izaberite</option>
                                        <option value="1">Veoma los</option>
                                        <option value="2">Los</option>
                                        <option value="3">Dobar</option>
                                        <option value="4">Veoma dobar</option>
                                        <option value="5">Odlican</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="comment">Komentar</label>
                                    <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                </div>
                                <div>
                                    <label />
                                    <button className="primary" type="submit">Posalji komentar</button>
                                </div>
                                <div>
                                    {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                    {errorReviewCreate && (<MessageBox variant="danger">{errorReviewCreate}</MessageBox>)}
                                </div>
                            </form>
                        ) : (
                            <MessageBox>
                                Molimo <Link to="/signin"><strong>prijavite se</strong></Link> da posaljete ocenu i komentar
                            </MessageBox>
                        )}
                    </li>
                </ul>
            </div>
            </div>
            )}
        </div>  
     );
}
 
export default ProductScreen;