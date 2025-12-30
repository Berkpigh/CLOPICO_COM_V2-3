import { combineReducers } from "redux";
import paniervisibilityReducer from "../slices/etatpanierSlice"
import desccuvéetoupdateReducer from "../slices/desctoupdateSlice"
import produittoupdateReducer from "../slices/produittoupdateSlice"
import stocktoupdateReducer from "../slices/stocktoupdateSlice"
import imagetoupdateReducer from "../slices/imagetoupdateSlice"

    const RootReducer = combineReducers({ etatpanier : paniervisibilityReducer,
                                             etatdesc : desccuvéetoupdateReducer,
                                             etatproduit : produittoupdateReducer,
                                             etatstock : stocktoupdateReducer,
                                             etatimage : imagetoupdateReducer})

export default RootReducer