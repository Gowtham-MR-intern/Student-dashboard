import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar';
import { Spinner } from '@heroui/react';
import home from '../assets/home.jpg';
import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch('https://0261cadc-a144-4755-8dda-dc4b44fcef31.eu-west-1.cloud.genez.io/api/categories')
  if(!response.ok){
    throw new Error(`API returns error, Status: ${response.status}`);
  }
  return response.json();
}

const Ecommerce: React.FC = () => {
  const navigate = useNavigate();
  const {data , isLoading, isError, error } = useQuery({queryKey: ['categories'], queryFn : fetchData})
  
    // console.log(error);

    if (isLoading){
      return <div className="text-center text-xl p-4"><Spinner label="Loading..." /></div>;
    }
    if (isError){
        return <div className="text-center text-xl text-red-500 p-4">Error fetching Categories: {error.message}</div>;
    }
  return (
    <div>
      <Navbar />
     
      <div className='flex justify-center'>
        <img src={home} className="w-full h-[500px] m-8 object-cover rounded-lg"/>
      </div>

      <h1 className='text-center text-5xl mt-4 font-bold'>All Categories</h1>
      
      <div className='flex gap-8 mx-auto my-8 p-8 w-[1200px] h-50 overflow-x-scroll bg-gray-100 border border-gray-500 rounded-lg shadow-lg '>
        {data?.data.map((category:string)=>(
          <div
            key={category}
            className="bg-white shadow-md rounded-xl p-4 text-center min-w-[200px] 
            h-[100px] cursor-pointer"
            onClick={() => navigate(`/ecommerce/${category}`)}
          >
            <h2 className="text-lg font-semibold">{category}</h2>
            <p className="text-blue-500 font-semibold">Buy Now</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Ecommerce