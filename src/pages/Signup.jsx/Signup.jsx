import Lottie from 'lottie-react';
import loginAnimation from '../../assets/animations/registration-animation.json'
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const Signup = () => {
    const { createUser, updateUserProfile } = useAuth()
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = data;
        console.log(userInfo)

        const imageFile = { image: data.photo[0] }
        console.log(imageFile);

        const res = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        console.log(res.data);

        const name = await data.name;
        const email = await data.email;
        const role = await data.role;
        const photo = res.data.data.display_url;
        const password = await data.password
        console.log({ name, email, role, photo, password });

        createUser(email, password)
            .then(res => {
                console.log(res);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(result => {

                        toast.success("User created successfully!")

                    })
                    .catch(error => {
                        console.log(error);
                        toast.error("Something went wrong! Please try again.")
                    })
            })
            .catch(error => {
                console.log(error);
                toast.error("Already used this email!")
            })



    }


    return (
        <div className='my-10 container mx-auto'>
            <div className="hero bg-background min-h-screen">

                <div className="hero-content flex flex-col md:flex-row gap-4">
                    <div className="text-left w-full md:w-[400px] lg:w-[500px]">
                        <h1 className="text-4xl text-center md:text-left font-bold">Signup now!</h1>

                        <div className='w-60 h-auto'>
                            <Lottie animationData={loginAnimation} loop={true}> </Lottie>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name='name' {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Role</span>
                                </label>
                                <select
                                    name="role"
                                    {...register("role", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    {/* <option disabled defaultValue="">
                                        Select a role
                                    </option> */}
                                    <option value="user">User</option>
                                    <option value="seller">Seller</option>
                                </select>
                                {errors.role && <span className="text-red-600">Role is required</span>}
                            </div>

                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text">Pick A Photo</span>
                                </label>
                                <input name="photo" {...register("photo", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                                {errors.photo && <span className='text-red-600'>Photo is required</span>}
                            </div>



                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Pick A Photo</span>
                                </label>
                                <input name="photo" {...register("photo", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                                {errors.photo && <span className="text-red-600">Photo is required</span>}
                            </div> */}


                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' {...register("password", { required: true })} type="password" placeholder="password" className="input input-bordered" />
                                {errors.password && <span className='text-red-600'>Password is required</span>}

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-primary hover:bg-secondary">Sign Up</button>
                            </div>
                            <p>Already have an account? <Link to='/login' className='text-primary'>Login</Link> </p>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Signup;