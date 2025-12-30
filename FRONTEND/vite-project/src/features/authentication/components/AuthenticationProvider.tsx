import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PropswithChildren } from "../../../core/custom-type";
import { clearLocalDb } from "../services/localstorage.infrastructure";
import business, { businessRegisterUser, businessCreateUser } from "../services/authentication.application";
import {
  AuthenticationContext,
  AuthenticationState,
  initialUserState,
  RoleState,
  initialRoleState,
  AuthenticationStateWithLogin,
} from "../store";
import { saveUserInLocalDb } from "../services/localstorage.infrastructure"

// (props: PropswithChildren) devient ({children}) en utilisant la déconstruction

export const AuthenticationContextProvider = (props: PropswithChildren) => {
  const navigate = useNavigate()
  const [userState, setUserState] = useState<AuthenticationState>(initialUserState);
  const [roleState, setRoleState] = useState<RoleState>(initialRoleState);

  const register = ( name: string, firstName: string, email: string, password: string, ok: boolean,  roleName?: string, clientid?: number) => {
    businessRegisterUser.register({ name, firstName, email, password, ok, roleName, clientid})
    .then(user => {
      if (!user.ok) {
        setUserState({
          user: null,
          status: 'failed',
        })
      }
      else
      {
        setUserState({
            user: {name:user.name,
                  firstName:user.firstName,
                  email:user.email,
                  password: "",
                  ok: user.ok,
                  clientid:user.clientid
                },
            status: 'registered',
        })
        navigate('/connexion')
      }
    })
  }

  const createUser = ( name: string, firstName: string, email: string, password: string, ok: boolean,  roleName?: string, clientid?: number) => {
      businessCreateUser.createUser({ name, firstName, email, password, ok, roleName, clientid})
      .then(user => { if(user.ok){ navigate("/") }})
  }

  const logIn = (login: string, password: string) => {
    business.logIn({ login, password})   // ou bien   business.logIn({ login: login, password: password})
            .then(user => {
              if (!user.ok) {
                setUserState({
                  user: null,
                  status: 'failed',
                })
              } else {
              setUserState({
                  user: {name:user.name,
                          firstName:user.firstName,
                          email:user.email,
                          password: "",
                          ok: true,
                          token: user.token,
                          roleName:user.roleName,
                          clientid:user.clientid
                        },
                  status: 'loggedIn',
                })
                if (!(user.roleName == null))
                  { setRoleState({
                    role: user.roleName,
                    status: 'ok',
                  })
                  }
                  else 
                  { setRoleState({
                      role: "unknown",
                      status: "unknown",
                    })
                  }

                  // TODO: save in localStorage
                  saveUserInLocalDb(user)
                  
                  navigate('/')
              }
            })
          }

  const logOut = () => {
    setUserState({
        user: null,
        status: 'loggedOut',
    })
    clearLocalDb()
    navigate('/')
  };

  const newContext: AuthenticationStateWithLogin = {
    user: userState,
    role: roleState,
    register,
    createUser,
    logIn,
    logOut,
  };

  return (
    <AuthenticationContext.Provider value={newContext}>
        {props.children}
    </AuthenticationContext.Provider>
  );
};