import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const RegisterScreen = (props) => {
    
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const redirect = props.location.search? props.location.search.split('=')[1]: '/'

    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo, loading, error } = userRegister

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            alert('Lozinka i ponovljena lozinka nisu iste, molimo unesite ponovo')
        }else{
            dispatch(register(name, surname, email, password, address, phone))
        }
    }

    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return ( 
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Registracija</h1>
                </div>
                {/* {!userInfo && !error && !loading && <MessageBox variant="success">Prijavite se</MessageBox>} */}
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Ime</label>
                    <input type="text" id="name" placeholder="Unesite Vase ime" required onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="surname">Prezime</label>
                    <input type="text" id="surname" placeholder="Unesite Vase prezime" required onChange={(e) => setSurname(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email adresa</label>
                    <input type="email" id="email" placeholder="Unesite email adresu" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Lozinka</label>
                    <input type="password" id="password" placeholder="Unesite lozinku" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Potvrdite lozinku</label>
                    <input type="password" id="confirmPassword" placeholder="Ponovo unesite lozinku" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="address">Adresa</label>
                    <input type="text" id="address" placeholder="Unesite Vasu adresu" required onChange={(e) => setAddress(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="phone">Telefon</label>
                    <input type="text" id="phone" placeholder="Unesite Vas broj telefona" required onChange={(e) => setPhone(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Registruj se</button>
                </div>
                <div>
                    <label />
                    <div>
                        Vec imate nalog?  <Link to={`/signin?redirect=${redirect}`}><strong>Prijavi se</strong></Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default RegisterScreen;