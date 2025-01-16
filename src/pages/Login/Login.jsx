import React from 'react';
import loginAnimation from '../../assets/animations/registration-animation.json'
// import loginAnimation from '../../assets/animations/login-animation.json'
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
 const {loginUser, signinWithGoogle} = useAuth()
const axiosPublic = useAxiosPublic()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {

    const email = data.email;
    const password = data.password;

    // email and password login 

    loginUser(email, password)
    .then(result => {
      console.log(result);
      toast.success("Login successful!")
    })
    .catch(error =>{
      console.log(error);
      toast.error("Something went wrong! Try again.")
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
                }
                else{
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
          <h1 className="text-4xl text-center md:text-left font-bold">Login now!</h1>

          <div className='w-60 h-auto'>
            <Lottie animationData={loginAnimation} loop={true}> </Lottie>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-2xl">
          <button onClick={handleGoogleLogin} className="btn bg-primary hover:bg-secondary mx-8 mt-8 flex items-center"><span className=''><FaGoogle></FaGoogle></span> Signin with Google</button>
          <div className="divider mx-8"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input name='email' {...register("email")} type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input name='password' {...register("password")} type="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary hover:bg-secondary">Login</button>
            </div>
            <p>Don't have an account? <Link to='/signup' className='text-primary'>Signup</Link> </p>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;