import { createContext, useContext } from "react";

// 1. a création du type de l'état
export interface ContextState {
  value: boolean
}

// 1.b valeur + fonction
//export interface ContextWithChangeState {
//  item: ContextState,
//  setItem: React.Dispatch<React.SetStateAction<ContextState>> | null
//}

// 2. état initial
export const initialContextState: ContextState = {
  value: false
}

export const ClientInfoContext = createContext<ContextState>(initialContextState)

export const useClientInfoContext = () => useContext(ClientInfoContext)
