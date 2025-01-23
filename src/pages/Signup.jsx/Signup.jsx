import Lottie from 'lottie-react';
import loginAnimation from '../../assets/animations/registration-animation.json'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const Signup = () => {
    const { createUser, updateUserProfile, signinWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

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

                        const user = {
                            name: name,
                            email: email,
                            role: role,
                            photo: photo
                        }
                        axiosPublic.post('/users', user)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.insertedId) {
                                    toast.success("User created successfully!")
                                    navigate('/')
                                }
                            })

                            .catch(err => {
                                toast.error("Something went wrong! Try again.")
                            })

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

    // social login 
    const handleGoogleLogin = () => {

        signinWithGoogle()
            .then(result => {
                console.log(result.user);
                const user = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    role: "user"
                }

                axiosPublic.post('/users', user)
                    .then(res => {
                        console.log(res);
                        if (res.data.insertedId) {
                            toast.success("User created successfully!")
                            navigate('/')
                        }
                        else {
                            toast.success("Login successful!")
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
            .catch(error => {
                toast.error("Something went wrong! Try again.")
                console.log(error);
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
                        <button onClick={handleGoogleLogin} className="btn bg-primary hover:bg-secondary mx-8 mt-8 flex items-center"><span className=''><FaGoogle></FaGoogle></span> Sign up with Google</button>
                        <div className="flex flex-col border-opacity-50 mx-8">
                            <div className="divider">OR</div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body pt-0">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name='name' {...register("categoryName", { required: true })} type="text" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className='text-red-500 mt-1 text-sm'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-500 mt-1 text-sm'>Email is required</span>}
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
                                {errors.role && <span className="text-red-500 mt-1 text-sm">Role is required</span>}
                            </div>

                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text">Pick A Photo</span>
                                </label>
                                <input name="photo" {...register("photo", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                                {errors.photo && <span className='text-red-500 mt-1 text-sm'>Photo is required</span>}
                            </div>


                            <div className='form-control relative'>
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/
                                })} type={showPassword ? 'text' : 'password'} placeholder="password" className="relative input input-bordered" />
                                {errors?.password?.type === "required" && <span className='text-red-500 mt-1 text-sm'>Password is required</span>}
                                {errors?.password?.type === "minLength" && <span className='text-red-500 mt-1 text-sm'>Password must be minimum 6 character or more</span>}
                                {errors?.password?.type === "maxLength" && <span className='text-red-500 mt-1 text-sm'>Password must be less or equal 20 character</span>}
                                {errors?.password?.type === "pattern" && <span className='text-red-500 mt-1 text-sm'>Password must be at least one uppercase letter, one lowercase letter, one number and one special character</span>}
                                <div className='absolute top-[52px] right-6'>
                                    <span className='text-lg cursor-pointer' onClick={() => setShowPassword(!showPassword)}> {!showPassword ? <FaEye></FaEye> :
                                        <FaEyeSlash></FaEyeSlash>}</span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-primary hover:bg-secondary">Sign Up</button>
                            </div>
                            <p>Already have an account? <Link to='/login' className='text-primary'>Login</Link> </p>
                        </form>
                    </div>
                </div>
            </div >
            <Helmet>
                <title>VitalMeds | Signup</title>

            </Helmet>
        </div >
    );
};

export default Signup;