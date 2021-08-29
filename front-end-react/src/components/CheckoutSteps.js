const CheckoutSteps = (props) => {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Prijava</div>
            <div className={props.step2 ? 'active' : ''}>Detalji posiljke</div>
            <div className={props.step3 ? 'active' : ''}>Placanje</div>
            <div className={props.step4 ? 'active' : ''}>Potvrdi porudzbinu</div>
        </div>
    );
}
 
export default CheckoutSteps;