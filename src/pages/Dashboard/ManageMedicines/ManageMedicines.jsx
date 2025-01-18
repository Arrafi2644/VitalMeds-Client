import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { IoIosAddCircle } from "react-icons/io";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useMedicines from '../../../hooks/useMedicines';
import useMedicinesBySeller from '../../../hooks/useMedicinesBySeller';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const ManageMedicines = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [medicines] = useMedicinesBySeller()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        console.log(data);
        const imageFile = { image: data.photo[0] }
        console.log(imageFile);

        const res = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        console.log(res.data);
        const image = res.data.data.display_url
        console.log(image);

        const medicineInfo = {
            name: data.name,
            genericName: data.genericName,
            category: data.category,
            company: data.company,
            description: data.description,
            discount: parseFloat(data.discount),
            price: parseFloat(data.price),
            power: parseFloat(data.power),
            missUnit: data.massUnit,
            image: image,
            sellerEmail: user.email

        }

        axiosSecure.post('/medicines', medicineInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Medicine added successfully!")
                }
            })
            .catch(err => {
                toast.error("Something went wrong! Please try again.")

            })

        console.log(medicineInfo);

    }

    console.log(medicines);

    return (
        <div className='my-8'>
            <div className='flex gap-2 flex-col md:flex-row justify-between'>
                <h2 className='text-3xl font-bold '>Total Medicine: {medicines.length}</h2>
                <button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn bg-primary hover:bg-secondary"><span className='text-xl '><IoIosAddCircle></IoIosAddCircle></span>Add Medicine</button>
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
                                    <td>{medicine.discount}</td>
                                    <td>
                                        <div className='flex gap-3 items-center text-lg'>
                                            <button className='text-primary hover:text-secondary'><FaEdit></FaEdit></button>
                                            <button className='text-red-500 hover:text-red-400'><FaTrashAlt></FaTrashAlt></button>
                                        </div>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            {/* modal  */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button> */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-xl">Add Medicine</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body pt-0">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Medicine Name</span>
                            </label>
                            <input name='name' {...register("name", { required: true })} type="text" placeholder="Medicine name" className="input input-bordered" />
                            {errors.name && <span className='text-red-500 mt-1 text-sm'>Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Medicine Generic Name</span>
                            </label>
                            <input name='genericName' {...register("genericName", { required: true })} type="text" placeholder="Medicine generic name" className="input input-bordered" />
                            {errors.genericName && <span className='text-red-500 mt-1 text-sm'>Medicine generic name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description:</span>
                            </label>

                            <textarea name='description' {...register("description", { required: true })} type="text" placeholder="Medicine short description" className="textarea textarea-bordered"></textarea>
                            {errors.description && <span className='text-red-500 mt-1 text-sm'>Description is required</span>}
                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Pick Medicine Photo</span>
                            </label>
                            <input name="photo" {...register("photo", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                            {errors.photo && <span className='text-red-500 mt-1 text-sm'>Photo is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Medicine Category</span>
                            </label>
                            <select
                                name="category"
                                {...register("category", { required: true })}
                                className="select select-bordered w-full"
                            >

                                <option value="Tablet">Tablet</option>
                                <option value="Capsule">Capsule</option>
                                <option value="Syrup">Syrup</option>
                                <option value="Cream">Cream</option>
                                <option value="Powder">Powder</option>
                            </select>
                            {errors.category && <span className="text-red-500 mt-1 text-sm">Category is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Medicine Company</span>
                            </label>
                            <select
                                name="company"
                                {...register("company", { required: true })}
                                className="select select-bordered w-full"
                            >
                                {/* <option disabled defaultValue="">
                                        Select a company
                                    </option> */}
                                <option value="ACI">ACI</option>
                                <option value="Squre">Squre</option>
                                <option value="Beximco">Beximco</option>
                                <option value="Reneta">Reneta</option>
                                <option value="Health Care">Health Care</option>
                                <option value="Popular">Popular</option>
                                <option value="General">General</option>
                                <option value="Sun">Sun</option>
                            </select>
                            {errors.company && <span className="text-red-500 mt-1 text-sm">Company is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Power</span>
                            </label>
                            <input name='power' {...register("power", { required: true })} type="text" placeholder="Medicine power" className="input input-bordered" />
                            {errors.power && <span className='text-red-500 mt-1 text-sm'>Medicine power is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Mass Unit</span>
                            </label>
                            <select
                                name="massUnit"
                                {...register("massUnit", { required: true })}
                                className="select select-bordered w-full"
                            >
                                {/* <option disabled defaultValue="">
                                        Select a mass unit
                                    </option> */}
                                <option value="mg">Mg</option>
                                <option value="ml">Ml</option>
                            </select>
                            {errors.massUnit && <span className="text-red-500 mt-1 text-sm">Mass unit is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price per unit</span>
                            </label>
                            <input name='price' {...register("price", { required: true })} type="text" placeholder="Medicine price" className="input input-bordered" />
                            {errors.price && <span className='text-red-500 mt-1 text-sm'>Medicine price is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Discount</span>
                            </label>
                            <input name='discount' {...register("discount", { required: true })} type="text" defaultValue={0} placeholder="Discount" className="input input-bordered" />
                        </div>




                        <div className="form-control mt-6">
                            <button className="btn bg-primary hover:bg-secondary">Add Medicine</button>
                        </div>

                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>





            <Helmet>
                <title>VitalMeds | Dashboard | Manage Medicine</title>

            </Helmet>
        </div>
    );
};

export default ManageMedicines;