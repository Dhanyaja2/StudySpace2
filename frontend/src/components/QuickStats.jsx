import React, { useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { BookOpen, Brain } from 'lucide-react'
import { StoreContext } from './context/StoreContext'

const QuickStats = () => {

  const {dueCardsLength, cardsCount, deckCount} = useContext(StoreContext);

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Due Today</CardTitle>
          <BookOpen className='h-4 w-4 text-indigo-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{dueCardsLength}</div>
          <p className='text-xs text-gray-500'>Cards to review</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
          <Brain className='h-4 w-4 text-indigo-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{cardsCount}</div>
          <p className='text-xs text-gray-500'>Across {deckCount} decks</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuickStats