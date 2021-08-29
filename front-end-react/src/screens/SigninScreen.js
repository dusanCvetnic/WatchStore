import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SigninScreen = (props) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = props.location.search? props.location.search.split('=')[1]: '/'

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo, loading, error } = userSignin

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(signin(email, password))

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
                    <h1>Prijava</h1>
                </div>
                {/* {!userInfo && !error && !loading && <MessageBox variant="success">Prijavite se</MessageBox>} */}
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email adresa</label>
                    <input type="email" id="email" placeholder="Unesite email adresu" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Lozinka</label>
                    <input type="password" id="password" placeholder="Unesite lozinku" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Prijavi se</button>
                </div>
                <div>
                    <label />
                    <div>
                        Nemate nalog?  <Link to={`/register?redirect=${redirect}`}><strong> Registruj se</strong></Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default SigninScreen;