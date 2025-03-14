import React from 'react'
import { AuthRouter } from './router/AuthRouter'
import { UserProviderWrapper } from './context/user.context'

const App = () => {
  return (
    <UserProviderWrapper>
      <AuthRouter/>     
    </UserProviderWrapper>
  )
}

export default App