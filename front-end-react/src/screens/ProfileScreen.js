import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile

    const dispatch = useDispatch()
    useEffect(()=>{
        if(!user){
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            })
            dispatch(detailsUser(userInfo._id))
        }else{
            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
            setAddress(user.address)
            setPhone(user.phone)
        }
        
    }, [dispatch, userInfo._id, user])
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            alert('Lozinka i potvrdjena lozinka nisu iste, molimo unesite ponovo')
        }else{
            dispatch(updateUserProfile({userId: user._id, 
                name, surname, email, password, address, phone
            }))
        }
    }
    return (
        <div className="card card-body profile">
            <div className="row">
                <h1>Profil korisnika</h1>
            </div>
            <div className="row">
                <label>Ime: </label>
                <strong>{name}</strong>
            </div>
            <div className="row">
                <label>Prezime: </label>
                <strong>{surname}</strong>
            </div>
            <div className="row">
                <label>Email: </label>
                <strong>{email}</strong>
            </div>
            <div className="row">
                <label>Adresa: </label>
                <strong>{address}</strong>
            </div>
            <div className="row">
                <label>Telefon: </label>
                <strong>{phone}</strong>
            </div>
            <div>
                <Popup classname="popup" trigger={<button className="primary block popup-button"> Azuriraj podatke profila</button>} position="left center">
                    <div>
                        <form className="popup-form" onSubmit={submitHandler}>
                            {
                                loading ? (<LoadingBox></LoadingBox>) : error? (<MessageBox variant="danger">{error}</MessageBox>) : (
                                    <>
                                    {loadingUpdate && (<LoadingBox></LoadingBox>)}
                                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                                    {successUpdate && (<MessageBox variant="success">Profil je uspesno azuriran!</MessageBox>)}
                                        <div>
                                            <label htmlFor="name">Ime</label>
                                            <input id="name" type="text" placeholder="Unesite ime" value={name} onChange={(e) => setName(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <label htmlFor="surname">Prezime</label>
                                            <input id="surname" type="text" placeholder="Unesite prezime" value={surname} onChange={(e) => setSurname(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input id="email" type="email" placeholder="Unesite email adresu" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <label htmlFor="password">Lozinka</label>
                                            <input id="password" type="password" placeholder="Unesite lozinku" onChange={(e) => setPassword(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword">Potvrdi lozinku</label>
                                            <input id="confirmPassword" type="password" placeholder="Potvrdite lozinku" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <label htmlFor="address">Adresa</label>
                                            <input id="address" type="text" placeholder="Unesite adresu" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <label htmlFor="phone">Telefon</label>
                                            <input id="phone" type="text" placeholder="Unesite broj telefona" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <label />
                                            <button className="primary" type="submit">Azuriraj</button>
                                        </div>
                                    </>
                                )
                            }
                        </form>
                    </div>
                </Popup>
            </div>
        </div>
    );
}
 
export default ProfileScreen;