// import React from 'react'
// import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
// import { useLocation, useNavigate } from 'react-router'

// const MainContent = () => {

//   const navigate = useNavigate();
//   const location = useLocation();

//   const currentTab = location.pathname.split("/")[2] || "study";

  

//   return (
//     <div>
//       <Tabs
//         value={currentTab}
//         onValueChange={(val) => navigate(`/dashboard/${val}`)}
//         className="space-y-6"
//       >
//         <TabsList className="grid w-full grid-cols-3 mb-8">
//           <TabsTrigger value="study" className="cursor-pointer">Study</TabsTrigger>
//           <TabsTrigger value="create" className="cursor-pointer">Create Card</TabsTrigger>
//           <TabsTrigger value="decks" className="cursor-pointer">My Decks</TabsTrigger>
//         </TabsList>

//       </Tabs>
//     </div>
//   )
// }

// export default MainContent



import React from "react";
import { BookOpen, Plus, Layers3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useLocation, useNavigate } from "react-router";

const MainContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.split("/")[2] || "study";

  return (
    <div className="relative">

      {/* Section label */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
            Learning workspace
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            What would you like to do?
          </h2>
        </div>
      </div>


      <Tabs
        value={currentTab}
        onValueChange={(val) => navigate(`/dashboard/${val}`)}
        className="w-full"
      >

        <TabsList
          className="
            grid
            h-auto
            w-full
            grid-cols-3
            gap-1
            rounded-2xl
            border
            border-white/[0.07]
            bg-[#0b0b10]/80
            p-1.5
            shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            backdrop-blur-xl
            mb-8
          "
        >

          {/* Study */}
          <TabsTrigger
            value="study"
            className="
              group
              relative
              flex
              min-h-[58px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-transparent
              text-gray-500
              transition-all
              duration-300

              data-[state=active]:border-violet-500/20
              data-[state=active]:bg-violet-500/[0.10]
              data-[state=active]:text-white
              data-[state=active]:shadow-[0_0_25px_rgba(124,58,237,0.10)]

              hover:bg-white/[0.03]
              hover:text-gray-300
            "
          >
            <BookOpen
              className="
                h-4 w-4
                transition-all
                duration-300
                group-data-[state=active]:text-violet-400
              "
            />

            <span className="text-xs font-medium sm:text-sm">
              Study
            </span>
          </TabsTrigger>


          {/* Create */}
          <TabsTrigger
            value="create"
            className="
              group
              relative
              flex
              min-h-[58px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-transparent
              text-gray-500
              transition-all
              duration-300

              data-[state=active]:border-violet-500/20
              data-[state=active]:bg-violet-500/[0.10]
              data-[state=active]:text-white
              data-[state=active]:shadow-[0_0_25px_rgba(124,58,237,0.10)]

              hover:bg-white/[0.03]
              hover:text-gray-300
            "
          >
            <Plus
              className="
                h-4 w-4
                transition-all
                duration-300
                group-data-[state=active]:text-violet-400
              "
            />

            <span className="text-xs font-medium sm:text-sm">
              Create Card
            </span>
          </TabsTrigger>


          {/* Decks */}
          <TabsTrigger
            value="decks"
            className="
              group
              relative
              flex
              min-h-[58px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-transparent
              text-gray-500
              transition-all
              duration-300

              data-[state=active]:border-violet-500/20
              data-[state=active]:bg-violet-500/[0.10]
              data-[state=active]:text-white
              data-[state=active]:shadow-[0_0_25px_rgba(124,58,237,0.10)]

              hover:bg-white/[0.03]
              hover:text-gray-300
            "
          >
            <Layers3
              className="
                h-4 w-4
                transition-all
                duration-300
                group-data-[state=active]:text-violet-400
              "
            />

            <span className="text-xs font-medium sm:text-sm">
              My Decks
            </span>
          </TabsTrigger>

        </TabsList>

      </Tabs>
    </div>
  );
};

export default MainContent;