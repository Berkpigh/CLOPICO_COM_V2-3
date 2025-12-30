import { getUserTokenFromLocalDb } from "../../../authentication/services/localstorage.infrastructure"
import { Nouv_Cuvée, Tres, LCuvée, TresL, IOneCuvWithDesc } from "../../models";

/*
// *** === *** === *** ===  Post One Nouvelle cuvée
*/
export const FetchPostNouvCuv = async (cuv: Nouv_Cuvée, url: string) => {
  const token: string = getUserTokenFromLocalDb()
  let result: Tres = {
    Location: "",
    StatusCode: 201,
    Result: false
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(cuv),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
        // throw new Error(response.status.toString())
        result = {
          Location: response.status.toString(),
          StatusCode: response.status,
          Result: false
        }
    } else {
      const data = await response.json() as Tres
      result = {
        Location: data.Location,
        StatusCode: data.StatusCode,
        Result: true
      }
    }
    return result
  }
  catch(error){
    console.error(error)
  }
  return result
}
/*
// *** === *** === *** ===  Get liste cuvées
*/
export const FetchGetListeCuvéeBD = async (url: string) => {
  const token: string = getUserTokenFromLocalDb()
  let result: TresL = {
        lcuv: [
          {
          cuvéeId: 0,
          annéeCuvée: 0,
          typeCuvée: "",
          libelléCuvée: "string",
          descCuvée: 
            [
              {
                descriptionCuvéeId: 0,
                cuvéeId: 0,
                langue: 0,
                description: "",
                descriptionLongue: "",
                nomLangue: ""
              }
            ]
          }
        ],
        ok: false
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
        // throw new Error(response.status.toString())
        result = {
          lcuv: [],
          ok: false
        }
    } else {
      const data = await response.json() as LCuvée
      result = {
        lcuv: data,
        ok: true
      }
    }
    return result
  }
  catch(error){
    console.error(error)
  }
  return result
}
/*
// *** === *** === *** ===  Post One Nouvelles Descriptions Cuvée
*/
export const FetchPostOneCuvDesc = async (cuv: IOneCuvWithDesc, url: string) => {
  try {
    const token: string = getUserTokenFromLocalDb()
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(cuv),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response.ok
  } catch(error) {
    console.log(error)
  }
  return false
}
