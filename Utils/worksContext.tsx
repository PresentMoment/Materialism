import React, { createContext } from "react"
// create context
export const WorksContext = createContext([undefined])
// create context provider
export function WorksProvider({ children, value }) {
  return <WorksContext.Provider value={value}>{children}</WorksContext.Provider>
}