import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductListScreen = (props) => {
    const {
        material = 'sve',
        category = 'sve',
        min = 0,
        max = 0,
        rating = 0,
        order = 'toprated',
    } = useParams()
    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts({
            category: category !== 'sve' ? category : '',
            material: material !== 'sve' ? material : '',
            min,
            max,
            rating,
            order
        }))
    }, [dispatch, category, material, min, max, rating, order])

    /* const deleteHandler = () => {
        /// TODO: dispatch delete action
    } */
    return (
        <div>
            <h1>Proizvodi</h1>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAZIV PROIZVODA</th>
                            <th>CENA PROIZVODA</th>
                            <th>KATEGORIJA</th>
                            <th>PROIZVODJAC</th>
                            <th>AKCIJE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>Izmeni</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
 
export default ProductListScreen;