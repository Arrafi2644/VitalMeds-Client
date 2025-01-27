import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const {logoutUser} = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token')
    console.log(token);
    config.headers.authorization = `Bearer ${token}`
    // console.log(config);
    return config;
  }, function(error){
    return Promise.reject(error);
  })

  axiosSecure.interceptors.response.use(function(response){
    return response
  
}, async(error)=>{
    console.log(error);
  const status = error?.response?.status;
  // console.log(status);
  if(status === 401 || status === 403){
    await logoutUser();
    navigate('/login')
  }
})


    return axiosSecure;
};

export default useAxiosSecure;