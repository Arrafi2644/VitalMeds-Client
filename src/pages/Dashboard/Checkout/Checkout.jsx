import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/CheckoutForm/CheckoutForm";
import { useLocation } from "react-router-dom";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Checkout = () => {
    const location = useLocation()
    console.log("state", location.state.totalPrice);
    const purchaseDetails = location?.state;
    return (
        <div className="px-4 container mx-auto my-8 lg:my-8">
            <h3 className="text-lg font-semibold mb-4">Total Amount: {location?.state?.totalPrice}tk</h3>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm purchaseDetails={purchaseDetails} ></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;