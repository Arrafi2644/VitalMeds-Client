import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";;
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useCartTotalPrice from "../../hooks/useCartTotalPrice";
import toast from "react-hot-toast";


const CheckoutForm = ({purchaseDetails}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const [totalPrice, totalPriceRefetch] = useCartTotalPrice()

    // console.log(user);
    // console.log(cart);

    console.log("Purchase details", purchaseDetails);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res);
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
            
        })

        if (confirmError) {
            // console.log('confirm error', confirmError)
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    status: 'pending',
                    sellersEmail:cart.map(item => item.sellerEmail),
                    medicineName: cart.map(item => item.name),
                    products: cart
                }

                // console.log(cart);


                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Thank you for payment.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    totalPriceRefetch()
                    refetch();
                    const orderInfo = {
                        cart,
                        status: "Processing"
                    } 
                    const orderResponse = await axiosSecure.post(`/orders`, orderInfo)
                    if(orderResponse?.data?.insertedId){
                        toast.success("Order successfully completed.")
                        navigate('/invoice', {state: payment})
                    }else{
                        toast.error("Order not completed.")

                    }
                }
                

                const salesProductsRes = await axiosSecure.post('/sales', cart)
                // console.log("sales products are ", salesProductsRes.data);
                if(salesProductsRes?.data?.insertedId){
                    toast.success("Sales products successfully add to sales collection.")
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            border: "1px solid black",
                            '::placeholder': {
                                color: '#aab7c4',
            
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {/* {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>} */}
        </form>
    );
};

export default CheckoutForm;