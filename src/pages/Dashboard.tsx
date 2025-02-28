import React from "react";
import Table from '../components/Table'
import Sidebar from '../components/Sidebar'

const Dashboard:React.FC = () => {
  return (
    <>
      <div className="w-full flex h-screen">
        <Sidebar />
        <div className="w-full px-10 py-6">
          <h1 className="text-2xl font-bold">Good Morning...</h1>
          <p className="text-xs text-gray-500 font-sans mt-1 mb-6">Welcome to Study Track Dashboard</p>
          <Table/>
        </div>
      </div>
    </>
  )
}

export default Dashboard;