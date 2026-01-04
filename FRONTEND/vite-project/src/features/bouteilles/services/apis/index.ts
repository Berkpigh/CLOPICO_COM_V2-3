import { getUserTokenFromLocalDb } from "../../../authentication/services/localstorage.infrastructure"
import { lBouteilles, IOneBotWithProd, LBouteilleImages, IOneBotWithImag,
        resultGetListeBouteille,
        resultGetListeImagesBouteille} from "../../models"
//import { bouteille } from '../../models/index';

/*
// *** === *** === *** ===  Get liste produits et actions produits
*/
export const FetchGetListeBouteille = async (url: string) => {
  const token: string = getUserTokenFromLocalDb()
  let result: resultGetListeBouteille = {
    lBout: [],
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
    } else {
      const data = await response.json() as lBouteilles
      result = {
        lBout: data,
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
// *** === *** === *** ===  Post one Bouteille/Produits et Bouteille/Actions Produits
*/
export const FetchPostOneBotProd = async (bot: IOneBotWithProd,url: string) => {
  const token: string = getUserTokenFromLocalDb()
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(bot),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response.ok
  }
  catch(error){
    console.error(error)
  }
  return false
}
/* === *** === *** === // *** === *** === *** === // *** === *** === *** === // *** === *** === *** === 
/*
// *** === *** === *** ===  Get liste images de bouteille
*/
//FetchGetOneBotImages
export const FetchGetOneBotImages = async (url: string) => {
  const token: string = getUserTokenFromLocalDb()
  let result: resultGetListeImagesBouteille = {
    lImag: [],
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
    } else {
      const data = await response.json() as LBouteilleImages
      result = {
        lImag: data,
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
/* === *** === *** === // *** === *** === *** === // *** === *** === *** === // *** === *** === *** === 
/* === *** === *** === // *** === *** === *** === // *** === *** === *** === // *** === *** === *** === 
/*
// *** === *** === *** ===  Put MAJ liste images de bouteille
*/
export const FetchPutOneBotImages = async (images: LBouteilleImages, url: string) => {
  const token: string = getUserTokenFromLocalDb()
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify(images),
        'Authorization': `Bearer ${token}`
      }
    })
    return response.ok
  }
  catch(error){
    console.error(error)
  }
  return false
}
