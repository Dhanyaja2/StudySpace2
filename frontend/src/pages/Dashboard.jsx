import React from 'react'
import DashboardHeader from '../components/DashboardHeader'
import QuickStats from '../components/QuickStats'
import MainContent from '../components/MainContent'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div className='min-h-screen w-full text-white'>
        {/* Header */}
        <DashboardHeader />
        <hr className='border-gray-500' />
        <div className='max-w-7xl bg-transparent mx-auto px-4 lg:px-8 py-8'>
          <QuickStats />
          <MainContent />
          <Outlet />
        </div>
    </div>
  )
}

export default Dashboard
