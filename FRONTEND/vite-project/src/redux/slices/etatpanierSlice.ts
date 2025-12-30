import { createSlice } from "@reduxjs/toolkit"

export interface PanierState {
    etatp: boolean;
}
const initialState: PanierState = {
    etatp: false
}
const etatpanierSlice = createSlice({
    name: "paniervisibility",
    initialState,
    reducers: {
        makevisible: (state) => {
            state.etatp = true;
        },
        makeinvisible: (state) => {
            state.etatp = false;
        }
    }
})
export const { makevisible, makeinvisible } = etatpanierSlice.actions;
export default etatpanierSlice.reducer;