import { AuthenticationUser } from "../models";
import { userInfo } from "../models";

/**
 * save in userinfo and token local storage
 * @param user 
 */
export function saveUserInLocalDb(user: AuthenticationUser): void {
    const usinf: userInfo = {
        email: user.email,
        clientid: user.clientid
    }
    localStorage.setItem('userInfo', JSON.stringify(usinf))
    localStorage.setItem('authenticationToken', JSON.stringify(user.token))    
}

export function getUserInfoFromLocalDb(): userInfo | null {
    const userInfoLS = localStorage.getItem('userInfo')
    let result : userInfo | null = null
    if (userInfoLS){ 
        result = JSON.parse(userInfoLS) as userInfo
        return result
    }
    return null
}   
export function getUserTokenFromLocalDb(): string  {

    const tok: string | null = localStorage.getItem('authenticationToken')
    if(tok == null) {return ""}
    const gui: string = `"`
    const toka: string[] = tok.split(gui)
    if(toka.length == 3) { return toka[1]}
    return tok
}
export function clearLocalDb(): void {
    localStorage.removeItem('authenticationToken')    
    localStorage.removeItem('userInfo')    
}
