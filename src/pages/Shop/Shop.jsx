import React, { useState } from 'react';
import useMedicines from '../../hooks/useMedicines';
import { FaCartPlus, FaEye } from 'react-icons/fa';
import { TbCurrencyTaka } from 'react-icons/tb';

const Shop = () => {
    const [medicines] = useMedicines();
    const [showDetails, setShowDetails] = useState({})


    const handleDetails = (medicine) => {
        setShowDetails(medicine);
        document.getElementById('my_modal_3').showModal()
    }

    console.log(showDetails);


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
                                            <button className='text-primary hover:text-secondary'><FaCartPlus></FaCartPlus></button>
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
                    <div>
                        <img className='w-40 h-40 border object-cover rounded-md' src={showDetails.image} alt="" />

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