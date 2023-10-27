import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const HeaderContext = createContext()

function HeaderProvider({ children }) {
  const [accountSet, setAccountSet] = useState(false)


  const contextData = {
    accountSet : accountSet,
    setAccountSet : setAccountSet,
  }

  return (
    <HeaderContext.Provider value={contextData}>
      { children }
    </HeaderContext.Provider> 
  )
}

export default HeaderProvider