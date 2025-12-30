import { getUserTokenFromLocalDb } from "../../../authentication/services/localstorage.infrastructure";
import { ClientInfo, FLKeys, NumPostList, NumPost } from "../../models";
/*
  * Return one client info from api
*/

let resultL: ClientInfo = {
    clientId: 0,
    ownerId: "",
    nom: "",
    prénom: "",
    dateContact: new(Date),
    f_ContactId: 0,
    f_DTypeContact: 0,
    f_Cnom: "",
    f_Cprénom: "",
    f_AdresseMail: "",
    f_TélPortable: "",
    f_TélFixe: "",
    f_Adresse1: "",
    f_Adresse2: "",
    f_Ville: "",
    f_Pays: "",
    f_NuméroPostal: 0,

    l_ContactId: 0,
    l_DTypeContact: 0,
    l_Cnom: "",
    l_Cprénom: "",
    l_AdresseMail: "",
    l_TélPortable: "",
    l_TélFixe: "",
    l_Adresse1: "",
    l_Adresse2: "",
    l_Ville: "",
    l_Pays: "",
    l_NuméroPostal: 0,
    ok: false
}
let resFL: FLKeys = {
  f_contactId: 0,
  l_contactId: 0,
  ok: false
}
let resNP: NumPost = {
  numéroPostal: 0,
  localité: "",
  canton: "",
  statutLivraison: 0
}
let resNPL: NumPostList = [resNP]
  /*
// *** === *** === *** ===  Get One ClientInfo
*/
export const FetchGetOneClientInfo = async (url: string) => {
    const token: string = getUserTokenFromLocalDb()
    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) {
            throw new Error(response.status.toString())
        }
        const data = await response.json() as ClientInfo
        data.ok = true
        return data
    }
    catch(error){
        console.error(error)
    }

    return resultL
}

/*
// *** === *** === *** ===  Post One ClientInfo
*/
export const FetchPostOneClientInfo = async (clientInfo: ClientInfo, url: string) => {
  const token: string = getUserTokenFromLocalDb()
  try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(clientInfo),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })
      if (!response.ok) {
          throw new Error(response.status.toString())
      }
      const data = await response.json() as FLKeys
      data.ok = true
      return data
  }
  catch(error){
      console.error(error)
  }

  return resFL
}

/*
// *** === *** === *** ===  Post All Numero Postal
*/
export const FetchGetAllNumeroPostal = async (url: string) => {
  try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
          throw new Error(response.status.toString())
      }
      const data = await response.json() as NumPostList
      return data
  }
  catch(error){
      console.error(error)
  }

  return resNPL
}