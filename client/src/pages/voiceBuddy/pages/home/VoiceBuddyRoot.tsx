import React from 'react'
import HomeBottomNavigation from '../../components/HomeBottomNavigation'
import { Route, Routes } from 'react-router-dom'
import ChatMain from '../chat/ChatMain'

interface VoiceBuddyRootProps {}

const VoiceBuddyRoot: React.FC<VoiceBuddyRootProps> = ({}) => {
  return (
    <div>
      <Routes>
        <Route path="/chat" element={<ChatMain />} />
      </Routes>
      <HomeBottomNavigation />
    </div>
  )
}

export default VoiceBuddyRoot
