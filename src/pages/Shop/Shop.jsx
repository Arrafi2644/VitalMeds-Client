import React, { useEffect, useState } from 'react';
import useMedicines from '../../hooks/useMedicines';
import { FaCartPlus, FaEye } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useCart from '../../hooks/useCart';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Shop = () => {
    const location = useLocation()
    const [category, setCategory] = useState(location?.state || "")
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [medicines, , isLoading] = useMedicines(category, search, sort);
    const [showDetails, setShowDetails] = useState({})
    const [, refetch] = useCart()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [allMedicines, setAllMedicines] = useState([])
    const navigate = useNavigate()



    // console.log("category is ", category);
    // console.log("search is ", search)
    // console.log("sort is ", sort)
    // 
    console.log("all medicines are ", medicines)

    useEffect(() => {
        setAllMedicines(medicines);
    }, [medicines]);

    const handleDetails = (medicine) => {
        setShowDetails(medicine);
        document.getElementById('my_modal_3').showModal()
    }


    // const medicinesByCategory = allMedicines.filter(medicine => medicine.category === location.state)

    // console.log(medicinesByCategory);
    // console.log(showDetails);

    const handleAddToCart = (medicine) => {
        console.log("To cart ", medicine);

        if (!user) {
            navigate('/login')
        }

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
        <div className='container mx-auto my-8 lg:my-8'>
            <div className='flex flex-col md:flex-row gap-6 justify-between items-center'>
                <h2 className='text-3xl font-bold'>Total Medicine  ({medicines.length})</h2>


                <div className='flex items-center justify-between gap-4 flex-wrap'>
                    {/* search  */}
                    <label className="input border flex items-center gap-2 border-gray-400">
                        <svg className="h-[1em]  opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className="grow" placeholder="Search" />

                    </label>

                    {/* sort  */}
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="select border border-gray-400">
                        <option disabled value="">Sort by price</option>
                        <option value="asc">Price (Lowest to highest)</option>
                        <option value="desc">Price (Highest to lowest)</option>
                    </select>

                    {/* reset */}
                    <button onClick={() => { setCategory(""), setSort(""); setSearch("") }} className="btn">Reset</button>
                </div>
            </div>
            {
                isLoading ?
                    <div className='flex items-center justify-center'>
                        <span className="loading loading-spinner loading-xl mt-8"></span>
                    </div>
                    :
                    <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>

                        {
                            medicines.length > 0 ? medicines.map(medicine => <div onClick={() => handleDetails(medicine)} className='border p-4 rounded-md cursor-pointer relative' key={medicine._id}>
                                <img className='h-52 object-cover w-full' src={medicine?.image} alt="" />
                                <p className='font-semibold'>{medicine.name}</p>
                                <p className='font-semibold flex items-center'><span><TbCurrencyTaka></TbCurrencyTaka></span> {medicine.price}</p>
                                <button onClick={(e) => {
                                    e.stopPropagation(); handleAddToCart(medicine)
                                }} className='text-primary hover:text-secondary text-xl absolute top-4 right-4 z-10'><FaCartPlus></FaCartPlus></button>
                            </div>
                            ) : <div className='col-span-12 mt-6'>
                                <h3 className='text-xl font-bold text-center'>Medicine not found</h3>
                            </div>
                        }

                    </div>
            }

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