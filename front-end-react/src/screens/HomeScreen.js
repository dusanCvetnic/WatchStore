import Product from '../components/Product';
import { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
 
const HomeScreen = (props) => {
  const {
    material = 'sve',
    category = 'sve',
    min = 0,
    max = 0,
    rating = 0,
    order = 'toprated',
} = useParams()
  const dispatch = useDispatch()
  const productList = useSelector( state => state.productList)
  const { loading, error, products } = productList

  useEffect(() =>{
    dispatch(listProducts({
      category: category !== 'sve' ? category : '',
      material: material !== 'sve' ? material : '',
      min,
      max,
      rating,
      order
    })) 
  }, [dispatch, category, material, min, max, rating, order])
    return ( 
      <div>
        <div className="col-2">
          {loading ? (<LoadingBox></LoadingBox>
          ):
          error?(<MessageBox variant="danger">{error}</MessageBox>
          ):(<div className="row center">
            {
              products.map(product =>(
                <Product key={product._id} product={product}/>
              ))
            }
          </div>
          )}
        </div>
      </div>
     );
}
 
export default HomeScreen;