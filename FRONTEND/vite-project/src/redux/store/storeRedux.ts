import { configureStore } from "@reduxjs/toolkit"
import RootReducer from "../reducers/RootReducer"
import { PanierState } from "../slices/etatpanierSlice"
import { DescState } from "../slices/desctoupdateSlice"
import { BouteilleProduits } from "../slices/produittoupdateSlice"
import { BouteilleStock } from "../slices/stocktoupdateSlice"
import { BouteilleImages } from "../slices/imagetoupdateSlice"

const storeRedux = configureStore({
    reducer : RootReducer
})

export type RootState = ReturnType<typeof storeRedux.getState>
export interface IRootState {
  etatp: PanierState,
  loaded: DescState,
  value: DescState,
  produitloaded: BouteilleProduits,
  produitvalue: BouteilleProduits,
  stockloaded: BouteilleStock,
  stockvalued: BouteilleStock
  imageloaded: BouteilleImages,
  imagevalue: BouteilleImages,
}

export type AppDispatch = typeof storeRedux.dispatch
export default storeRedux