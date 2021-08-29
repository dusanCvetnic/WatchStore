import { BrowserRouter,Link, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { signout } from './actions/userActions';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import { useEffect, useState } from 'react';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';

function App() {
  const cart = useSelector((state) => state.cart)
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart
  const userSignin = useSelector((state) => state.userSignin)
  const {userInfo} = userSignin
  const dispatch = useDispatch()
  const signOutHandler = () =>{
    dispatch(signout())
  }

  const productCategoryList = useSelector((state) => state.productCategoryList)
  const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList

  useEffect(() => {
    dispatch(listProductCategories()) 
  }, [dispatch])

  return (
    
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
                type="button"
                className="open-sidebar"
                onClick={() => setSidebarIsOpen(true)}
              >
                <i className="fa fa-chevron-right"></i>
            </button>
            <Link className="brand" to="/">Satovi</Link>
          </div>
          <div>
            <Link to="/cart">Korpa <span>{' '}</span>
            <i className="fa fa-shopping-bag" aria-hidden="true"></i> 
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {
              userInfo ? ( 
              <div className="dropdown">
              <Link to="#">{userInfo.name} {userInfo.surname} <i className="fa fa-caret-down"></i></Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">Profil</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Istorijat</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signOutHandler}>Odjavi se <i className="fa fa-sign-out" aria-hidden="true"></i></Link>
                </li>
              </ul>
              </div>
              ) : (
                <Link to="/signin">Prijava</Link>
              )
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist">Proizvodi</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Porudzbine</Link>
                  </li>
                </ul>
              </div>)}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>KATEGORIJE SATOVA</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-caret-left"></i>
              </button>
            </li>
            {loadingCategories ? (<LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link to={`/search/category/${c}`} onClick={() => setSidebarIsOpen(false)}><strong>{c.toUpperCase()} SATOVI</strong></Link>
                </li>
              ))
            )}
            <li>
              <Link to="/search" onClick={() => setSidebarIsOpen(false)}><strong>DETALJNA PRETRAGA</strong></Link>
            </li>
          </ul>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/search" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category" component={SearchScreen} exact></Route>
          <Route
            path="/search/category/:category/material/:material/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
          
        </main>
        <footer className="row center">Dusan Cvetnic 2017202297</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
