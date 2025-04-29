
import SectionHeading from '../SectionHeading/SectionHeading';
import { TbCurrencyTaka } from 'react-icons/tb';
import DiscountCard from '../DiscountCard/DiscountCard';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import useMedicines from '../../hooks/useMedicines';
import { FaCartPlus } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useCart from '../../hooks/useCart';

const LatestMedicines = () => {
  const axiosSecure = useAxiosSecure()
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [medicines] = useMedicines(category, search, sort)
  const [showDetails, setShowDetails] = useState({})
  const [showLatestDetails, setShowLatestDetails] = useState({})
  const {user} = useAuth()
  const [, refetch] = useCart()

  const LatestMedicines = medicines.slice(-6)
  // console.log("Discount ", discountMedicines);

const handleShowDetails = (id) => {
  // console.log("Show details ", id)
  document.getElementById('my_modal_4').showModal()
  const showMedicine = medicines.find(medicine => medicine._id === id)
  setShowLatestDetails(showMedicine)
}

const handleAddToCart = (medicine) => {
  console.log("To cart ", medicine);
  console.log(user.email);

  const medicineInfo = {
      name: medicine.name,
      genericName: medicine.genericName,
      category: medicine.category,
      company: medicine.company,
      description: medicine.description,
      discount: parseFloat(medicine.discount),
      price: parseFloat(medicine.price),
      power: parseFloat(medicine.power),
      massUnit: medicine.massUnit,
      image: medicine.image,
      userEmail: user.email,
      sellerEmail: medicine.sellerEmail,
      quantity: 1
  }

  axiosSecure.post('/carts', medicineInfo)
      .then(res => {
          if (res.data.insertedId) {
              toast.success("Medicine add to your cart successfully!")
              refetch()
          }
      })
      .catch(err => {
          console.log(err);
          toast.error("Something went wrong! Please try again.")
      })

}

  return (
    <div className='my-8 '>
      <SectionHeading title='Latest Products'
        subtitle='Shop this latest products'
      ></SectionHeading>
      {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6'> */}

      {/* </div> */}

      {/* slider  */}

      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={false}

        navigation={true}

        modules={[Pagination, Navigation]}
        className="mySwiper bottom-0"

        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}

      >


        {
          LatestMedicines.map(medicine => <SwiperSlide key={medicine._id} ><Link onClick={()=>handleShowDetails(medicine._id)} ><DiscountCard medicine={medicine}></DiscountCard></Link></SwiperSlide>)
        }

      </Swiper>



            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">

                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className=''>
                            <img className='w-40 h-40 p-4 border object-cover rounded-md' src={showLatestDetails.image} alt="" />
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold'>{showLatestDetails.name}</h3>
                            <div className='flex justify-between gap-6'>
                                <p className='text-sm'>{showLatestDetails.power} {showLatestDetails.massUnit}</p>
                                <p className='flex items-center text-lg'><TbCurrencyTaka></TbCurrencyTaka> {showLatestDetails.price}/unit</p>
                            </div>
                            <p>{showLatestDetails.category}</p>
                            <p>Company: {showLatestDetails.company}</p>
                           
                            <p>{showLatestDetails.description}</p>
                        </div>
                    </div>

                    <div className="modal-action">
                    <button onClick={() => handleAddToCart(showLatestDetails)} className="btn bg-primary hover:bg-secondary text-lg"><FaCartPlus></FaCartPlus></button>
                        <form method="dialog">

                       <div className='flex gap-2 items-center'>
                       
                        <button className="btn bg-primary hover:bg-secondary">Close</button>
                       </div>
                        </form>
                    </div>
                </div>
            </dialog>

    </div>
  );
};

export default LatestMedicines;