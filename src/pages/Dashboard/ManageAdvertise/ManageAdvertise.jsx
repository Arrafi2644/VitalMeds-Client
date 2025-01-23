// import React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { IoIosAddCircle } from 'react-icons/io';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { FaCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
// import useAdvertisements from '../../../hooks/useAdvertisements';
// import toast from 'react-hot-toast';


// const ManageAdvertise = () => {
//     const axiosSecure = useAxiosSecure();
//     const [advertisements, refetch] = useAdvertisements();

//     const handleManageBanner = (advertise, e) => {
//       console.log(advertise);
//       console.log(e.target.value);
//       const advertiseStatus = e.target.value ;

//       const advertiseInfo = {
//          _id: advertise._id,
//           name: advertise.name,
//           description: advertise.description,
//           changeStatus: advertiseStatus,
//           image: advertise.image,
//           sellerEmail: advertise.email
//       }

//       if(advertiseStatus === "Active"){
//           axiosSecure.post('/postedAdvertisements', advertiseInfo)
//           .then(res => {
//             console.log(res);
//             if(res.data.insertedId){
                
//                 axiosSecure.patch('/advertisements', advertiseInfo)
//                 .then(res => {
//                     console.log( res.data);
//                     if(res.data.modifiedCount > 0){                       
//                         toast.success("Banner activated successfully!")
//                         refetch()
//                     }
//                 })
//                 .catch(error => {
//                     console.log(error);
//                     toast.error("Something went wrong! please try again.")
//                 })

//             }
//           })
//           .catch(err => {
//             console.log(err);
//             toast.error("Something went wrong! please try again.")
//           })
//       }

//       if(advertiseStatus === "Pending"){
//         axiosSecure.delete(`/postedAdvertisements/${advertise._id}`)
//         .then(res => {
//           console.log(res);
//           if(res.data.deletedCount > 0){
              
//               axiosSecure.patch('/advertisements', advertiseInfo)
//               .then(res => {
//                   console.log( res.data);
//                   if(res.data.modifiedCount > 0){                       
//                       toast.success("Banner deactivated successfully!")
//                       refetch()
//                   }
//               })
//               .catch(error => {
//                   console.log(error);
//                   toast.error("Something went wrong! please try again.")
//               })

//           }
//         })
//         .catch(err => {
//           console.log(err);
//           toast.error("Something went wrong! please try again.")
//         })
//     }

//     }

//     return (
//         <div>
//             <div className='flex gap-2 flex-col md:flex-row justify-between'>
//                 <h2 className='text-3xl font-bold '>Total Advertise: {advertisements.length}</h2>
//             </div>
//             <div className='mt-6'>
//                 <div className="overflow-x-auto">
//                     <table className="table">
//                         {/* head */}
//                         <thead>
//                             <tr>
//                                 <th>Sl.</th>
//                                 <th>Medicine Image</th>
//                                 <th>Medicine Name</th>
//                                 <th>Description</th>
//                                 <th>Seller Email</th>
//                                 <th>Status</th>
//                                 <th>Change Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>

//                             {
//                                 advertisements.map((advertise, index) => <tr key={advertise._id} className='justify-start'>
//                                     <td>{index + 1}</td>
//                                     <td><img className='w-8 h-8 object-cover' src={advertise.image} alt="medicine" /></td>
//                                     <td>
//                                         {advertise.name}
//                                     </td>

//                                     <td>{advertise.description}</td>
//                                     <td>{advertise.email}</td>
//                                     <td >
//                                         <div className='flex items-center gap-1'>
//                                         {advertise.status === "Active" && <span className=' text-sm text-green-500'><FaCircle></FaCircle></span>}{advertise.status}
//                                             </div> </td>
//                                     <td>
//                                         <select onChange={(e)=>handleManageBanner(advertise, e)} className="select select-ghost w-28">
//                                         <option>Select Status</option>
//                                             <option value="Active" >Active</option>
//                                             <option value="Pending">Pending</option>
                                            
//                                         </select>
//                                     </td>
//                                     <td>
//                                         <div className='flex gap-3 items-center text-lg'>
//                                             <button onClick={() => handleDelete(medicine)} className='text-red-500 hover:text-red-400'><FaTrashAlt></FaTrashAlt></button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                                 )
//                             }

//                         </tbody>
//                     </table>
//                 </div>
//             </div>


//             <Helmet>
//                 <title>VitalMeds | Dashboard | Manage Advertise</title>

//             </Helmet>
//         </div>
//     );
// };


// export default ManageAdvertise;


import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { IoIosAddCircle } from 'react-icons/io';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAdvertisements from '../../../hooks/useAdvertisements';
import toast from 'react-hot-toast';


const ManageAdvertise = () => {
    const axiosSecure = useAxiosSecure();
    const [advertisements, refetch] = useAdvertisements();
    const [slide, setSlide] = useState(false)

    const handleManageBanner = (advertise, e) => {
      console.log(advertise);
      
      let advertiseStatus = e.target.value ;
      setSlide(!slide)
      console.log(slide);

      if(slide){
        e.target.innerText = "Remove from slide"
        advertiseStatus = "Active"
    }else{
          e.target.innerText = "Add to slide"
          advertiseStatus = "Pending"
      }

      console.log(advertiseStatus);

      const advertiseInfo = {
        advertiseId: advertise._id,
          name: advertise.name,
          description: advertise.description,
          changeStatus: advertiseStatus,
          image: advertise.image,
          sellerEmail: advertise.email
      }

      if(advertiseStatus === "Active"){
          axiosSecure.post('/postedAdvertisements', advertiseInfo)
          .then(res => {
            console.log(res);
            if(res.data.insertedId){
                
                axiosSecure.patch('/advertisements', advertiseInfo)
                .then(res => {
                    console.log( res.data);
                    if(res.data.modifiedCount > 0){                       
                        toast.success("Banner activated successfully!")
                        refetch()
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast.error("Something went wrong! please try again.")
                })

            }
          })
          .catch(err => {
            console.log(err);
            toast.error("Something went wrong! please try again.")
          })
      }

      if(advertiseStatus === "Pending"){
        axiosSecure.delete(`/postedAdvertisements/${advertise._id}`)
        .then(res => {
          console.log(res);
          if(res.data.deletedCount > 0){
              
              axiosSecure.patch('/advertisements', advertiseInfo)
              .then(res => {
                  console.log( res.data);
                  if(res.data.modifiedCount > 0){                       
                      toast.success("Banner deactivated successfully!")
                      refetch()
                  }
              })
              .catch(error => {
                  console.log(error);
                  toast.error("Something went wrong! please try again.")
              })

          }
        })
        .catch(err => {
          console.log(err);
          toast.error("Something went wrong! please try again.")
        })
    }

    }

    return (
        <div>
            <div className='flex gap-2 flex-col md:flex-row justify-between'>
                <h2 className='text-3xl font-bold '>Total Advertise: {advertisements.length}</h2>
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
                                <th>Seller Email</th>
                                {/* <th>Status</th> */}
                                <th>Change Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                advertisements.map((advertise, index) => <tr key={advertise._id} className='justify-start'>
                                    <td>{index + 1}</td>
                                    <td><img className='w-8 h-8 object-cover' src={advertise.image} alt="medicine" /></td>
                                    <td>
                                        {advertise.name}
                                    </td>

                                    <td>{advertise.description}</td>
                                    <td>{advertise.email}</td>
                                    {/* <td >
                                        <div className='flex items-center gap-1'>
                                        {advertise.status === "Active" && <span className=' text-sm text-green-500'><FaCircle></FaCircle></span>}{advertise.status}
                                            </div> </td> */}
                                    <td>
                                      <button onClick={(e)=>handleManageBanner(advertise, e)} className="btn btn-sm w-40">{advertise.status === "Active" ? "Remove from slide" : "Add to slide"}</button>
                                    </td>
                                    <td>
                                        <div className='flex gap-3 items-center text-lg'>
                                            <button onClick={() => handleDelete(medicine)} className='text-red-500 hover:text-red-400'><FaTrashAlt></FaTrashAlt></button>
                                        </div>
                                    </td>
                                </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>


            <Helmet>
                <title>VitalMeds | Dashboard | Manage Advertise</title>

            </Helmet>
        </div>
    );
};


export default ManageAdvertise;