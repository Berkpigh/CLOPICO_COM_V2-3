import { createContext, useContext } from "react";
import { AuthenticationUser } from "../models";

export interface AuthenticationState {
    user: AuthenticationUser | null;
    status: 'draft' | 'request' | 'loggedIn' | 'failed' | 'loggedOut' | 'registered';
}

export const initialUserState: AuthenticationState = {
    user: null,
    status: 'draft',
}
export interface RoleState {
    role: string;
    status: 'unknown' | 'ok';
}

export const initialRoleState: RoleState = {
    role: '',
    status: 'unknown'
}
export interface AuthenticationStateWithLogin {
    user: AuthenticationState,
    role: RoleState,
    register: ((name: string, firstName: string,  email: string, password: string, ok: boolean, roleName?: string, clientid?: number ) => void) | null,
    createUser: ((name: string, firstName: string,  email: string, password: string, ok: boolean, roleName?: string, clientid?: number ) => void) | null,
    logIn: ((login: string, password: string) => void) | null,
    logOut: (() => void) | null
}

export const initialUserStateWithLogin: AuthenticationStateWithLogin = {
    user: initialUserState,
    role: initialRoleState,
    register: null,
    createUser: null,
    logIn: null,
    logOut: null    
};

export const AuthenticationContext = createContext<AuthenticationStateWithLogin>(initialUserStateWithLogin)

export const useAuthenticationContext = () => useContext<AuthenticationStateWithLogin>(AuthenticationContext)