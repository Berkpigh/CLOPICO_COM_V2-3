import { createContext, useContext } from "react"

// 1. création du type de l'état
// 1.a
export interface ContextState {
    value: string;
}

// 1.b
export interface ContextWithChangeState {
    item: ContextState,
    setItem: React.Dispatch<React.SetStateAction<ContextState>> | null
}

// 2. état initial
// export const initialContextState: ContextState = {
//     value: ''
// }
export const initialContextState: ContextWithChangeState = {
    item: {value: ''},
    setItem: null
}

// 3. création du gestionnaire d'état
export const MyContext = createContext<ContextWithChangeState>(initialContextState)

// 4. custom hooks
export const useMyContext = () => useContext(MyContext)