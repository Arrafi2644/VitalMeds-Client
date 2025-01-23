import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useMedicinesBySeller from '../../../hooks/useMedicinesBySeller';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useCategories from '../../../hooks/useCategories';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';


const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const ManageCategory = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()


    const [categories, refetch] = useCategories()
    const [updateCategory, setUpdateCategory] = useState({})

    console.log(categories);

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

        const categoryInfo = {
            categoryName: data.categoryName,
            image: image,
        }

        axiosSecure.post('/categories', categoryInfo)
            .then(res => {
                if (res.data.insertedId) {
                    console.log(res.data);
                    toast.success("New medicine category added successfully!")
                    refetch()
                }
            })
            .catch(err => {
                toast.error("Something went wrong! Please try again.")

            })

        // console.log(medicineInfo);

    }

    const handleUpdate =(category)=>{
        // axiosSecure.put(`/categories/${category._id}`)
        // .then(res => {
        //     console.log(res);
        //     if (res.data.deletedCount > 0) {
        //         refetch()
        //         Swal.fire({
        //             title: "Deleted!",
        //             text: "Category updated successfully!",
        //             icon: "success"
        //         });
        //     }

        // })
        // .catch(err => {
        //     console.log(err);
        //     Swal.fire({
        //         title: "Error!",
        //         text: "Something went wrong! Try again.",
        //         icon: "error"
        //     });
        // })
        
        setUpdateCategory(category)
        document.getElementById('my_modal_10').showModal()
         
        
    }
    
    console.log(updateCategory);
    const handleDelete = (category) => {
        console.log(category);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/categories/${category._id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Category has been deleted.",
                                icon: "success"
                            });
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong! Try again.",
                            icon: "error"
                        });
                    })
            }
        });
    }



    return (
        <div>
            <div className='flex gap-2 flex-col md:flex-row justify-between'>
                <h2 className='text-3xl font-bold '>Total Categories: {categories.length}</h2>
                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn bg-primary hover:bg-secondary"><span className='text-xl '><IoIosAddCircle></IoIosAddCircle></span>Add Category</button>
            </div>
            <div className='mt-6'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl.</th>
                                <th>Category Image</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                categories.map((category, index) => <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td><img className='w-8 h-8 object-cover' src={category.image} alt="medicine" /></td>
                                    <td>{category.categoryName}</td>
                                    <td>
                                        <div className='flex gap-3 items-center text-lg'>
                                            <button onClick={()=> handleUpdate(category)} className='text-primary hover:text-secondary'><FaEdit></FaEdit></button>
                                            <button onClick={() => handleDelete(category)} className='text-red-500 hover:text-red-400'><FaTrashAlt></FaTrashAlt></button>
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
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box ">
                    <h3 className="font-bold text-xl text-center">Add Category</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body pt-0">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category Name</span>
                            </label>
                            <input name='categoryName' {...register("categoryName", { required: true })} type="text" placeholder="Category name" className="input input-bordered" />
                            {errors.categoryName && <span className='text-red-500 mt-1 text-sm'>Category name is required</span>}
                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Pick A Category Photo</span>
                            </label>
                            <input name="photo" {...register("photo", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                            {errors.photo && <span className='text-red-500 mt-1 text-sm'>Photo is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-primary hover:bg-secondary">Add Category</button>
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

                {/* modal  */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            {/* <dialog id="my_modal_10" className="modal">
                <div className="modal-box ">
                    <h3 className="font-bold text-xl text-center">Update Category</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body pt-0">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category Name</span>
                            </label>
                            <input name='categoryName' {...register("categoryName", { required: true })} type="text" placeholder="Category name" className="input input-bordered" />
                            {errors.categoryName && <span className='text-red-500 mt-1 text-sm'>Category name is required</span>}
                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Pick A Category Photo</span>
                            </label>
                            <input name="photo" {...register("photo", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                            {errors.photo && <span className='text-red-500 mt-1 text-sm'>Photo is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-primary hover:bg-secondary">Add Category</button>
                        </div>

                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                        
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog> */}
        </div>
    );
};

export default ManageCategory;