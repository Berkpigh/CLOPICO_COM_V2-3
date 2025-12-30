import {
  ApiReturnType,
  AuthenticationUser,
  CreationUser,
  LoginUser,
} from "../models";

// TODO : ALERT, delete from code !!!
const loginUrl: string = "https://localhost:7216/api/Login/";
const registerUrl: string = "https://localhost:7216/api/Register/";
/**
 * Return list of characters from api
 */
let resultL: ApiReturnType;


async function postRawApi<T>(user: T, url: string): Promise<AuthenticationUser> {
  try {
    const response = await fetch(url, {
      method: "POST", // ou 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    var r = await response;
    //console.info("res: ", r, "res.ok: ", r.ok);
    if (!r.ok) {
      const resL: AuthenticationUser = {
        name: "",
        firstName: "",
        email: "",
        password: "",
        ok: false,
        roleName: "",
        clientid: 0,
      }

      
      return resL;
    }
    //   result = await response.json() as ApiReturnType
    resultL = await response.json();
    resultL.ok = true;
  } catch (e) {
    //console.error("error: ", e);
  }

  return resultL;
}

export async function postCreateUserByApi(
  user: CreationUser
): Promise<AuthenticationUser> {
  return postRawApi<CreationUser>(user, registerUrl);
}
export async function postLogInByApi(
  user: LoginUser
): Promise<AuthenticationUser> {
  return postRawApi<LoginUser>(user, loginUrl);
}
/* 
export async function fakePostLogInByApi(user: LoginUser): Promise<ApiReturnType> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                userName: 'Legolas',
                email: user.login,
                token: '123456789',
                ok: true
            })
        }, 1000)
    })
*/
