import React from "react";
import Navbar from '../components/navbar'


const index:React.FC = () => {
  return (
    <>
    <Navbar />
    
    <div className="flex h-screen justify-center items-center">
     <h1 className="text-3xl text-green-500">Welcome to the homepage!</h1>
    </div>
    </>
  )
}

export default index