import React, { createContext } from "react"
// create context
export const LocationContext = createContext([undefined, undefined])
// create context provider
export function LocationProvider({ children, value }) {
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}