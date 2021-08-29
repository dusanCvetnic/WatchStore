import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingAddressScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if(!userInfo){
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phone, setPhone] = useState(shippingAddress.phone)
    const dispatch = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(
            saveShippingAddress({fullName, address, city, postalCode, country, phone})
        )
        props.history.push('/payment')
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Podaci za posiljku</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Ime i prezime</label>
                    <input type="text" id="fullName" placeholder="Unesite ime i prezime" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address">Adresa</label>
                    <input type="text" id="address" placeholder="Unesite vasu adresu" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">Grad</label>
                    <input type="text" id="city" placeholder="Unesite ime grada" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postanski broj</label>
                    <input type="text" id="postalCode" placeholder="Unesite postanski broj" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country">Drzava</label>
                    <input type="text" id="country" placeholder="Unesite ime drzave" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="phone">Kontakt telefon</label>
                    <input type="text" id="phone" placeholder="Unesite vas telefon" value={phone} onChange={(e) => setPhone(e.target.value)} required></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Nastavi</button>
                </div>
            </form>
        </div>
    );
}
 
export default ShippingAddressScreen;