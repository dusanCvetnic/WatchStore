import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updatedProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = (props) => {
    const productId = props.match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDesciption] = useState('')

    const productDetails = useSelector((state) => state.productDetails)
    const {error, product} = productDetails
    const productUpdate = useSelector((state) => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    const dispatch = useDispatch()
    useEffect(() => {
        if(successUpdate){
            props.history.push('/productlist')
        }if(!product || product._id !== productId || successUpdate){
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailsProduct(productId))
        }else {
            setName(product.name)
            setPrice(product.price)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDesciption(product.description)
        }
    }, [product, dispatch, productId, successUpdate, props.history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatedProduct({
            _id: productId,
            name: name,
            price: price,
            category: category,
            brand: brand,
            countInStock: countInStock,
            description: description,
        }))
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Izmeni proizvod {productId}</h1>
                </div>
                {loadingUpdate ? (
                    <LoadingBox></LoadingBox>
                ) : errorUpdate ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Naziv</label>
                            <input id="name" type="text" placeholder="Unesite naziv" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="price">Cena</label>
                            <input id="price" type="text" placeholder="Unesite cenu" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="category">Kategorija</label>
                            <input id="category" type="text" placeholder="Unesite kategoriju" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="brand">Proizvodjac</label>
                            <input id="brand" type="text" placeholder="Unesite proizvodjaca" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="countInStock">Kolicina na lageru</label>
                            <input id="countInStock" type="text" placeholder="Unesite kolicinu proizvoda na lageru" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="description">Opis</label>
                            <textarea id="description" rows="3" type="text" placeholder="Unesite opis proizvoda" value={description} onChange={(e) => setDesciption(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label />
                            <button className="primary" type="submit">Azuriraj proizvod</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
 
export default ProductEditScreen;