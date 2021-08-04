import { createContext, useContext } from "react"

const AppContext = createContext()

export function AppWrapper({ children, works, safariMobile, safariDesktop }) {
  let sharedState = {
    works,
    safariMobile,
    safariDesktop,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}
