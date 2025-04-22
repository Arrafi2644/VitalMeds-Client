import React, { useEffect, useState } from 'react';
import useMedicines from '../../hooks/useMedicines';
import { FaCartPlus, FaEye } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useCart from '../../hooks/useCart';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Shop = () => {
    const [medicines] = useMedicines();
    const [showDetails, setShowDetails] = useState({})
    const [, refetch] = useCart()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [allMedicines, setAllMedicines] = useState([])

    
useEffect(() => {
    setAllMedicines(medicines);
}, [medicines]);

    const handleDetails = (medicine) => {
        setShowDetails(medicine);
        document.getElementById('my_modal_3').showModal()
    }

    const location = useLocation()
    console.log(location);

    const medicinesByCategory = allMedicines.filter(medicine => medicine.category === location.state)

    console.log(medicinesByCategory);
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
            userEmail: user.email,
            sellerEmail: medicine.sellerEmail,
            quantity: 1
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

    const handleSort = (e) => {
        const sortOrder = e.target.value;
        console.log(sortOrder);
    
        let sortedMedicines = [...allMedicines]; // Create a new array to avoid mutating the original
    
        if (sortOrder === "ascending") {
            sortedMedicines.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "descending") {
            sortedMedicines.sort((a, b) => b.price - a.price);
        } 
    
        setAllMedicines(sortedMedicines); // Update state with sorted medicines
    };
    


    return (
        <div className='mx-4 my-8 lg:my-8'>
            <div className='flex flex-col md:flex-row gap-6 justify-between items-center'>
                <h2 className='text-3xl font-bold'>Total Medicine({location.state ? medicinesByCategory.length : medicines.length})</h2>

                <div className='flex items-center border rounded-md'>
                    <button className="btn btn-sm bg-primary rounded-r-none text-white">Sort by</button>
                    <select onChange={(e) => handleSort(e)} className="select select-sm">
                        <option className='' value='select'>Select</option>
                        <option className='' value='ascending'>Ascending</option>
                        <option className='' value='descending'>Descending</option>
                    </select>
                </div>

            </div>
            <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {/* <div className="overflow-x-auto">
                    <table className="table">
                       
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
                                location.state ? medicinesByCategory.map((medicine, index) =>
                                    <tr key={medicine._id}>
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
                                    </tr>
                                ) : medicines.map((medicine, index) => <tr key={medicine._id}>
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

                </div> */}
                {
                    location.state ? medicinesByCategory.map(medicine => <div onClick={() => handleDetails(medicine)} className='border p-4 rounded-md cursor-pointer relative' key={medicine._id}>
                        <img className='h-52 object-cover w-full' src={medicine?.image} alt="" />
                        <p className='font-semibold'>{medicine.name}</p>
                        <p className='font-semibold flex items-center'><span><TbCurrencyTaka></TbCurrencyTaka></span> {medicine.price}</p>
                        <button onClick={() => handleAddToCart(medicine)} className='text-primary hover:text-secondary text-xl absolute top-4 right-4'><FaCartPlus></FaCartPlus></button>
                    </div>) : allMedicines.map(medicine => <div onClick={() => handleDetails(medicine)} className='border p-4 rounded-md cursor-pointer relative' key={medicine._id}>
                        <img className='h-52 object-cover w-full' src={medicine?.image} alt="" />
                        <p className='font-semibold'>{medicine.name}</p>
                        <p className='font-semibold flex items-center'><span><TbCurrencyTaka></TbCurrencyTaka></span> {medicine.price}</p>
                        <button onClick={(e) => {
                            e.stopPropagation(); handleAddToCart(medicine)
                        }} className='text-primary hover:text-secondary text-xl absolute top-4 right-4 z-10'><FaCartPlus></FaCartPlus></button>
                    </div>
                    )
                }

            </div>

            {/* Modal  */}

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box ">

                    <div className='flex flex-col md:flex-row gap-6 overflow-x-scroll'>
                        <div className='w-40 h-40'>
                            <img className='w-full h-full p-4 border object-cover rounded-md' src={showDetails.image} alt="" />
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

            <Helmet>
                <title>VitalMeds | Shop</title>

            </Helmet>
        </div>
    );
};

export default Shop;