import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { IoIosAddCircle } from 'react-icons/io';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAdvertisementsBySeller from '../../../hooks/useAdvertisementsBySeller';
import { FaCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AskForAdvertisement = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [advertisements, refetch] = useAdvertisementsBySeller();
    const { user } = useAuth();
    const navigate = useNavigate()

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

        const advertiseInfo = {
            name: data.name,
            description: data.description,
            image: image,
            status: "Pending",
            email: user?.email
        }

        axiosSecure.post('/advertisements', advertiseInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Requested successfully for advertisement!")
                    refetch();
                    navigate('/dashboard/advertisement')
                }
                
            })
            .catch(err => {
                toast.error("Something went wrong! Please try again.")

            })

        console.log(advertiseInfo);

    }

    return (
        <div>
            <div className='flex gap-2 flex-col md:flex-row justify-between'>
                <h2 className='text-3xl font-bold '>Total Advertise: {advertisements.length}</h2>
                <button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn bg-primary hover:bg-secondary"><span className='text-xl '><IoIosAddCircle></IoIosAddCircle></span>Add Advertise</button>
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
                                <th>Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                advertisements.map((advertise, index) => <tr key={advertise._id}>
                                    <td>{index + 1}</td>
                                    <td><img className='w-8 h-8 object-cover' src={advertise.image} alt="medicine" /></td>
                                    <td>
                                        {advertise.name} <br /> <span className='text-xs'>{advertise.name}</span>
                                    </td>
                                  
                                    <td>{advertise.description}</td>
                                    <td >
                                                                            <div className='flex items-center gap-1'>
                                                                            {advertise.status === "Active" && <span className=' text-sm text-green-500'><FaCircle></FaCircle></span>}{advertise.status}
                                                                                </div> </td>
                                    <td>
                                        <div className='flex gap-3 items-center text-lg'>
                                            <button className='btn btn-sm text-primary hover:text-secondary'><FaEdit></FaEdit></button>
                                            <button onClick={() => handleDelete(medicine)} className='btn btn-sm text-red-500 hover:text-red-400'><FaTrashAlt></FaTrashAlt></button>
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
                    <h3 className="font-bold text-xl text-center">Add Advertisement Banner</h3>
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
                                <span className="label-text">Description:</span>
                            </label>

                            <textarea name='description' {...register("description", { required: true })} type="text" placeholder="Medicine short description" className="textarea textarea-bordered"></textarea>
                            {errors.description && <span className='text-red-500 mt-1 text-sm'>Description is required</span>}
                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Pick medicine image</span>
                            </label>
                            <input name="photo" {...register("photo", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                            {errors.photo && <span className='text-red-500 mt-1 text-sm'>Medicine image is required</span>}
                        </div>


                        <div className="form-control mt-6">
                            <button className="btn bg-primary hover:bg-secondary">Add Advertisement</button>
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
                <title>VitalMeds | Dashboard | Ask For Advertisement</title>

            </Helmet>
        </div>
    );
};

export default AskForAdvertisement;