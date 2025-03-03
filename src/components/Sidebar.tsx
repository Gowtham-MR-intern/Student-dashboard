import { Button, Link } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../services/AuthContext'

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const  {logout} = useAuth();

  const handleLogout = async () =>{
    await logout();
    navigate("/");
  }
  return (
    <div className="w-[260px] bg-gray-800 px-6 py-10 flex flex-col justify-between">
      <div>
        <div className="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-[#33a5a0]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>

        <h1 className="text-2xl font-bold ml-2 mb-8 text-center text-white">Study Track</h1>
        </div>
        <nav className="space-y-4">
          <Button as = {Link} href='/dashboard' className="w-full flex items-center text-slate-200 px-4 py-3 rounded-lg bg-[#33a5a0] transition">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5V19.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-9M9 21V12h6v9"></path></svg>
            Dashboard
          </Button>
          <Button className="w-full flex items-center text-slate-200 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M4 9h16M4 15h16M10 21h4"></path></svg>
            Upcoming
          </Button>
          <Button as = {Link} href='/dashboard/settings'  className="w-full flex items-center text-slate-200 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>

            {/* <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9.172 14.828A4 4 0 0112 8a4 4 0 012.828 6.828M12 18v.01"/></svg> */}
            Settings
          </Button>
        </nav>
      </div>
      
      <Button color="default" onPress={handleLogout} className="w-full flex items-center px-4 py-3 rounded-lg text-white bg-gray-800 hover:bg-gray-600 transition">
        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H9M5 4h4M5 20h4"></path></svg>
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;