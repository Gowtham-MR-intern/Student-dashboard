import React from 'react'
import Navbar from '../components/Navbar'

const Home:React.FC = () => {
  return (
    <div>
        <Navbar />
        <div className="w-full h-screen bg-cover bg-no-repeat" 
            style={{ backgroundImage: `url('src/assets/bg.png')`} }>

            <div className="flex items-center justify-center h-full">
                <h1 className="text-6xl font-bold text-white text-center">
                SteinnLabs React Exercise
                </h1>
            </div>
        </div>
    </div>
  )
}

export default Home