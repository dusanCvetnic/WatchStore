import {useState} from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

const CreditCardPayment = () => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [focus, setFocus] = useState('')
    return (
        <div>
            <Cards 
            number={number}
            name={name}
            xpiry={expiry}
            cvc={cvc}
            focused={focus}
            />
            <form className="payment-form">
                <input type='tel' name='number' required placeholder='Card Number' value={number} onChange={e => setNumber(e.target.value)} onFocus={e => setFocus(e.target.name)}></input>
                <input type='text' name='name' required placeholder='Name' value={name} onChange={e => setName(e.target.value)} onFocus={e => setFocus(e.target.name)}></input>
                <input type='text' name='expiry' required placeholder='MM/YY Expiry' value={expiry} onChange={e => setExpiry(e.target.value)} onFocus={e => setFocus(e.target.name)}></input>
                <input type='tel' name='cvc' required placeholder='CVC' value={cvc} onChange={e => setCvc(e.target.value)} onFocus={e => setFocus(e.target.name)}></input>
                
                <label />
                
            </form>
        </div>
    );
}
 
export default CreditCardPayment;