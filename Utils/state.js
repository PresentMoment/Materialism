import { createContext, useContext } from "react"

const AppContext = createContext()

export function AppWrapper({ children, works, safariMobile }) {
  let sharedState = {
    works,
    safariMobile,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
