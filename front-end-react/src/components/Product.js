import Rating from './Rating';
import {Link} from 'react-router-dom';

const Product = (props) => {
    const {product} = props

    return ( 
        <div key={product._id} className="card-product">
            <Link to={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt="product" />
            </Link>
            <div className="card-body-product">
            <Link to="product.html">
                <h2>{product.name}</h2>
            </Link>
            <div className="price">Cena: € {product.price}</div>
            </div>
            <Rating  
                rating={product.rating}
                numReviews={product.numReviews}
            />
        </div>
    );
}
 
export default Product;