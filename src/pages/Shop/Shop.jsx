import React, { useState } from 'react';
import useMedicines from '../../hooks/useMedicines';
import { FaCartPlus, FaEye } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useCart from '../../hooks/useCart';

const Shop = () => {
    const [medicines] = useMedicines();
    const [showDetails, setShowDetails] = useState({})
    const [, refetch] = useCart()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const handleDetails = (medicine) => {
        setShowDetails(medicine);
        document.getElementById('my_modal_3').showModal()
    }

    // console.log(showDetails);

    const handleAddToCart = (medicine) => {
        console.log("To cart ", medicine);
        console.log(user.email);

        const medicineInfo = {
            name: medicine.name,
            genericName: medicine.genericName,
            category: medicine.category,
            company: medicine.company,
            description: medicine.description,
            discount: parseFloat(medicine.discount),
            price: parseFloat(medicine.price),
            power: parseFloat(medicine.power),
            massUnit: medicine.massUnit,
            image: medicine.image,
            userEmail: user.email
        }

        axiosSecure.post('/carts', medicineInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Medicine add to your cart successfully!")
                    refetch()
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Something went wrong! Please try again.")
            })

    }




    return (
        <div className='mx-4 my-12 lg:my-16'>
            <div>
                <h2 className='text-3xl font-bold'>Total Medicine({medicines.length})</h2>
            </div>
            <div className='mt-6'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl.</th>
                                <th>Medicine Image</th>
                                <th>Medicine Name</th>
                                <th>Medicine Category</th>
                                <th>Mass Unit</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                medicines.map((medicine, index) => <tr key={medicine._id}>
                                    <td>{index + 1}</td>
                                    <td><img className='w-8 h-8 object-cover' src={medicine.image} alt="medicine" /></td>
                                    <td>
                                        {medicine.name} <br /> <span className='text-xs'>{medicine.genericName}</span>
                                    </td>
                                    <td>{medicine.category}</td>
                                    <td>
                                        {medicine.power}{medicine.massUnit}
                                    </td>
                                    <td>{medicine.company}</td>
                                    <td>{medicine.price}</td>
                                    <td>{medicine.discount}</td>
                                    <td>
                                        <div className='flex gap-3 items-center text-lg'>
                                            <button onClick={() => handleDetails(medicine)} className='text-primary hover:text-secondary'><FaEye></FaEye></button>
                                            <button onClick={() => handleAddToCart(medicine)} className='text-primary hover:text-secondary'><FaCartPlus></FaCartPlus></button>
                                        </div>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal  */}

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className=''>
                            <img className='w-40 h-40 p-4 border object-cover rounded-md' src={showDetails.image} alt="" />
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold'>{showDetails.name}</h3>
                            <div className='flex justify-between gap-6'>
                                <p className='text-sm'>{showDetails.power} {showDetails.massUnit}</p>
                                <p className='flex items-center text-lg'><TbCurrencyTaka></TbCurrencyTaka> {showDetails.price}/unit</p>
                            </div>
                            <p>{showDetails.category}</p>
                            <p>Company: {showDetails.company}</p>
                            <p className='flex items-center gap-1'>Discount:{showDetails.discount > 0 ? <p> {showDetails.discount}%</p> : <p>None</p>}</p>
                            <p>{showDetails.description}</p>
                        </div>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn bg-primary hover:bg-secondary">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Shop;