import React from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { useLocation, useNavigate } from 'react-router'

const MainContent = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.split("/")[2] || "study";

  

  return (
    <div>
      <Tabs
        value={currentTab}
        onValueChange={(val) => navigate(`/dashboard/${val}`)}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="study" className="cursor-pointer">Study</TabsTrigger>
          <TabsTrigger value="create" className="cursor-pointer">Create Card</TabsTrigger>
          <TabsTrigger value="decks" className="cursor-pointer">My Decks</TabsTrigger>
        </TabsList>

      </Tabs>
    </div>
  )
}

export default MainContent
