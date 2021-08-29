import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { prices } from "../utils.js";

const SearchScreen = (props) => {
    const {
        material = 'sve',
        category = 'sve',
        min = 0,
        max = 0,
        rating = 0,
        order = 'toprated',
    } = useParams()
    const [price, setPrice] = useState('Bilo koji opseg')
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories} = productCategoryList

    useEffect(() => {
        dispatch(listProducts({
            category: category !== 'sve' ? category : '',
            material: material !== 'sve' ? material : '',
            min,
            max,
            rating,
            order
        }))
    }, [category, material, dispatch, max, min, order, rating,])
    
    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category
        const filterMaterial = filter.material || material
        const filterRating = filter.rating || rating
        const sortOrder = filter.order || order
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max
        return `/search/category/${filterCategory}/material/${filterMaterial}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`
    }

    return (
        <div>
            <div className="row">
                
            </div>
            <div className="row top">
                <div className="col-1">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <div>
                            <h3>Sortiraj</h3> {' '}
                            <select
                            value={order}
                            onChange={(e) => {
                                props.history.push(getFilterUrl({ order: e.target.value }));
                            }}
                            >
                            <option value="lowest">Cena: rastuce</option>
                            <option value="highest">Cena: opadajuce</option>
                            <option value="toprated">Prosecna ocena</option>
                            </select>
                        </div>
                    )}
                    <div>
                        <h3>Kategorije</h3> {' '}
                        <select
                        value={category}
                        onChange={(e) => {
                            props.history.push(getFilterUrl({ category: e.target.value }));
                        }}
                        >
                        <option value="muski">Muski satovi</option>
                        <option value="zenski">Zenski satovi</option>
                        <option value="sve">Svi satovi</option>
                        </select>
                    </div>
                    <div>
                        <h3>Materijal</h3> {' '}
                        <select
                        value={material}
                        onChange={(e) => {
                            props.history.push(getFilterUrl({ material: e.target.value }));
                        }}
                        >
                        <option value="oystersteel">Oystersteel</option>
                        <option value="gold">Zlato</option>
                        <option value="sve">Svi</option>
                        </select>
                    </div>
                    <div>
                        <h3>Prosecna ocena kupaca</h3> {' '}
                        <select
                        value={rating}
                        onChange={(e) => {
                            props.history.push(getFilterUrl({ rating: e.target.value }));
                        }}
                        >
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        </select>
                    </div>
                    <div>
                        <h3>Cena</h3>
                        <select
                        value={price}
                        onChange={(e) => {
                            switch(e.target.value){
                                case prices[0].name:
                                    setPrice(e.target.value)
                                    return props.history.push(getFilterUrl({ min: prices[0].min, max: prices[0].max}))
                                case prices[1].name:
                                    setPrice(e.target.value)
                                    return props.history.push(getFilterUrl({ min: prices[1].min, max: prices[1].max}))
                                case prices[2].name:
                                    setPrice(e.target.value)
                                    return props.history.push(getFilterUrl({ min: prices[2].min, max: prices[2].max}))
                                case prices[3].name:
                                    setPrice(e.target.value)
                                    return props.history.push(getFilterUrl({ min: prices[3].min, max: prices[3].max}))
                                default: return setPrice('Bilo koji opseg')
                            }
                        }}
                        >
                        <option value={prices[0].name}>{prices[0].name}</option>
                        <option value={prices[1].name}>{prices[1].name}</option>
                        <option value={prices[2].name}>{prices[2].name}</option>
                        <option value={prices[3].name}>{prices[3].name}</option>
                        </select>
                    </div>
                </div>
                <div className="col-3">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            {products.length === 0 && (
                                <MessageBox>Ne postoje takvi proizvodi</MessageBox>
                            )}
                            <div className="row center">
                                {products.map((product) => (
                                    <Product key={product._id} product={product}></Product>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            
        </div>
    );
}
 
export default SearchScreen;