// import React from 'react'
// import DashboardHeader from '../components/DashboardHeader'
// import QuickStats from '../components/QuickStats'
// import MainContent from '../components/MainContent'
// import { Outlet } from 'react-router'

// const Dashboard = () => {
//   return (
//     <div className='min-h-screen w-full text-white'>
//         {/* Header */}
//         <DashboardHeader />
//         <hr className='border-gray-500' />
//         <div className='max-w-7xl bg-transparent mx-auto px-4 lg:px-8 py-8'>
//           <QuickStats />
//           <MainContent />
//           <Outlet />
//         </div>
//     </div>
//   )
// }

// export default Dashboard


import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import QuickStats from "../components/QuickStats";
import MainContent from "../components/MainContent";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050507] text-white">

      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Top violet glow */}
        <div
          className="
            absolute
            left-1/2
            top-[-300px]
            h-[600px]
            w-[800px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.08]
            blur-[150px]
          "
        />

        {/* Left glow */}
        <div
          className="
            absolute
            left-[-250px]
            top-[400px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-indigo-600/[0.045]
            blur-[130px]
          "
        />

        {/* Right glow */}
        <div
          className="
            absolute
            right-[-250px]
            top-[500px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-violet-600/[0.04]
            blur-[130px]
          "
        />

      </div>


      {/* =====================================================
          DASHBOARD HEADER
      ====================================================== */}

      <div
        className="
          relative
          z-20
          border-b
          border-white/[0.07]
          bg-[#0B0B12]/75
          backdrop-blur-xl
        "
      >
        <DashboardHeader />

        {/* subtle violet accent line */}
        <div
          className="
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-violet-500/30
            to-transparent
          "
        />
      </div>


      {/* =====================================================
          DASHBOARD CONTENT
      ====================================================== */}

      <main className="relative z-10">

        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            py-8
            sm:px-6
            sm:py-10
            lg:px-8
          "
        >

          {/* Dashboard content glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-[350px]
              w-[700px]
              -translate-x-1/2
              rounded-full
              bg-violet-600/[0.035]
              blur-[120px]
            "
          />

          {/* Actual dashboard */}
          <div className="relative">

            <QuickStats />

            <div className="mt-8">
              <MainContent />
            </div>

            <Outlet />

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;