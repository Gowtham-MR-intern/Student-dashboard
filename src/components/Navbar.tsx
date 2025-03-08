import React from 'react'
import Dropdown from '../components/Dropdown';
import { Button } from '@heroui/button';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../services/AuthContext'

const Navbar:React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () =>{
    await logout();
    navigate("/");
  }
  return (
    <div>
        <nav className="bg-purple-700 py-3 px-5 flex items-center">
            <h1 className="text-xl text-white font-bold cursor-pointer" onClick={() => navigate('/home')}>
                Steinnlabs-react-exercise
            </h1>
            <div className='flex ml-auto gap-4'>
              <Dropdown/>
              <Button color="default" onPress={handleLogout} className="p-3 rounded-lg text-white bg-gray-800 hover:bg-gray-600 transition">
                Logout
              </Button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar