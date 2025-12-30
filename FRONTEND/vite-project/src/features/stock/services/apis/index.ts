import { getUserTokenFromLocalDb } from "../../../authentication/services/localstorage.infrastructure"
import { stock } from "../../models"
//import { bouteille } from '../../models/index';
/*
// *** === *** === *** ===  Post one Bouteille/Stock
*/
export const FetchPostOneBotStock = async (sto: stock, url: string) => {
  const token: string = getUserTokenFromLocalDb()
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(sto),
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
