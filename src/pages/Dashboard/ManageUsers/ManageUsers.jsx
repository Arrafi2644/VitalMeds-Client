import React from 'react';
import useUsers from '../../../hooks/useUsers';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const [users, refetch] = useUsers()
    const axiosSecure = useAxiosSecure();

    const handleDelete = (user) => {
        console.log(user);
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

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "This user has been deleted.",
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

    const handleMakeUser = (user, e) => {
        console.log("Make user ", user);
        console.log("to role ", e.target.innerText.toLowerCase());
        if(user.role === 'admin'){
            return toast.error("Cannot change admin role")
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#50B498",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const userInfo = {
                    name: user.name,
                    _id: user._id,
                    role: user.role,
                    toRole: e.target.innerText.toLowerCase()
                }
                axiosSecure.patch(`/users`, userInfo)
                .then(res => {
                    console.log(res.data);
                    if(res.data.modifiedCount > 0){

                        Swal.fire({
                            title: "Role Changed!",
                            text: "This users role has been changed.",
                            icon: "success"
                        });
                        refetch()
                    }
                })
                .catch(err => {
                    console.log(err);
                })


            }
        });


    }
    const handleMakeAdmin = (user, e) => {
        console.log("Make admin ", user);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#50B498",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const userInfo = {
                    name: user.name,
                    _id: user._id,
                    role: user.role,
                    toRole: e.target.innerText.toLowerCase()
                }
                axiosSecure.patch(`/users`, userInfo)
                .then(res => {
                    console.log(res.data);
                    if(res.data.modifiedCount > 0){

                        Swal.fire({
                            title: "Role Changed!",
                            text: "This users role has been changed.",
                            icon: "success"
                        });
                        refetch()
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        });
    }
    const handleMakeSeller = (user, e) => {
        console.log("Make seller ", user);
        console.log("to role ", e.target.innerText.toLowerCase());
        if(user.role === 'admin'){
            return toast.error("Cannot change admin role")
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#50B498",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const userInfo = {
                    name: user.name,
                    _id: user._id,
                    role: user.role,
                    toRole: e.target.innerText.toLowerCase()
                }
                axiosSecure.patch(`/users`, userInfo)
                .then(res => {
                    console.log(res.data);
                    if(res.data.modifiedCount > 0){

                        Swal.fire({
                            title: "Role Changed!",
                            text: "This users role has been changed.",
                            icon: "success"
                        });
                        refetch()
                    }
                })
                .catch(err => {
                    console.log(err);
                })


            }
        });


    }

    console.log(users);
    return (
        <div>
         
            <div>
                <h2 className='text-3xl font-bold'>Total Users: {users.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Name & Image</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <td className='font-medium'>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="">
                                                <img className='w-8 h-8 object-cover rounded-full'
                                                    src={user.photo}
                                                    alt="user" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{user.name}</h3>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>{user.role}</td>
                                    <td>
                                        <div className='flex items-center gap-1 font-medium'>
                                            {user.role !== 'user' && <button onClick={(e)=>handleMakeUser(user, e)} className="btn btn-xs font-medium">User</button>}
                                            {user.role !== 'admin' && <button onClick={(e)=>handleMakeAdmin(user, e)} className="btn btn-xs font-medium">Admin</button>}
                                            {user.role !== 'seller' && <button onClick={(e)=>handleMakeSeller(user, e)} className="btn btn-xs font-medium">Seller</button>}
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user)} className='text-red-500 '><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <Helmet>
                <title>VitalMeds | Dashboard | Manage User</title>
            </Helmet>
        </div>
    );
};

export default ManageUsers;