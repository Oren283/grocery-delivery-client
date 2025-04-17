import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'


const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([]);
    const { currency , user, axios} = useAppContext();

    const fetchMyOrders = async () => {
       try {
         const {data} = await axios.get('/api/order/user');
          if (data.success){
            setMyOrders(data.orders);
          }
       } catch (error){
         console.log(error);
       }
    }

    useEffect(() => {
        if (user){
            fetchMyOrders();
        }
       
    }, [user])

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-center w-full mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full mt-2'></div>
            </div>
            {myOrders.map((order, index) => (
                <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl mx-auto'>
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col gap-4'>
                        <span className='truncate'>OrderId : {order._id}</span>
                        <span className=''>Payment : {order.paymentType}</span>
                        <span className=''>Total Amount : {currency}{order.amount}</span>
                    </p>
                    {order.items.map((item, index) => (
    <div key={index} className={`relative bg-white text-gray-500/70 ${
      order.items.length !== index + 1 && "border-b"
  } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
        <div className='flex items-center mb-4 md:mb-0'>
            <div className='bg-primary/10 p-4 rounded-lg'>
                {item.product?.image?.[0] ? (
                    <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                ) : (
                    <div className='w-16 h-16 bg-gray-200 flex items-center justify-center'>
                        <span>No Image</span>
                    </div>
                )}
            </div>
            <div className='ml-4'>
                <h2 className='text-xl font-medium text-gray-800'>{item.product?.name || "Unknown Product"}</h2>
                <p>Category: {item.product?.category || "N/A"}</p>
            </div>
        </div>
        <div  flex flex-col justify-center md:ml-8 mb-4 md:mb-0>
        <div className='text-primary text-lg font-medium'>
            <p>Quantity: {item.quantity || "1"}</p>
            <p>Status: {order.status}</p>
            <p>Date: {new Date(order.createAt).toLocaleDateString()}</p>
        </div>
        </div>
       
        <p className='text-primary text-lg font-medium'>
            Amount: {currency}{(item.product?.offerPrice || 0) * (item.quantity || 1)}
        </p>
    </div>
))}
                </div>
            ))}
        </div>
    )
}

export default MyOrders;