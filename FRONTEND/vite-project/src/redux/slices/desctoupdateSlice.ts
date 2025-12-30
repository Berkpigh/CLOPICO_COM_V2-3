import { createSlice } from "@reduxjs/toolkit"

export interface DescState {
    value: {
        cuvéeId: number,
        annéeCuvée: number,
        typeCuvée: string,
        libelléCuvée: string,
        descCuvées: [
            {
                descriptionCuvéeId: number,
                cuvéeId: number,
                langue: number,
                description: string,
                descriptionLongue: string,
                nomLangue: string
            },
            {
                descriptionCuvéeId: number,
                cuvéeId: number,
                langue: number,
                description: string,
                descriptionLongue: string,
                nomLangue: string
            },
            {
                descriptionCuvéeId: number,
                cuvéeId: number,
                langue: number,
                description: string,
                descriptionLongue: string,
                nomLangue: string
            },
            {
                descriptionCuvéeId: number,
                cuvéeId: number,
                langue: number,
                description: string,
                descriptionLongue: string,
                nomLangue: string
            },
            {
                descriptionCuvéeId: number,
                cuvéeId: number,
                langue: number,
                description: string,
                descriptionLongue: string,
                nomLangue: string
            }
        ]
    }
    loaded: boolean
}

const initialState: DescState = {
    value: {
        cuvéeId: 0,
        annéeCuvée: 0,
        typeCuvée: "",
        libelléCuvée: "",
        descCuvées: [
            {
                descriptionCuvéeId: 0,
                cuvéeId: 0,
                langue: 0,
                description: "",
                descriptionLongue: "",
                nomLangue: ""
            },
            {
                descriptionCuvéeId: 0,
                cuvéeId: 0,
                langue: 0,
                description: "",
                descriptionLongue: "",
                nomLangue: ""
            },
            {
                descriptionCuvéeId: 0,
                cuvéeId: 0,
                langue: 0,
                description: "",
                descriptionLongue: "",
                nomLangue: ""
            },
            {
                descriptionCuvéeId: 0,
                cuvéeId: 0,
                langue: 0,
                description: "",
                descriptionLongue: "",
                nomLangue: ""
            },
            {
                descriptionCuvéeId: 0,
                cuvéeId: 0,
                langue: 0,
                description: "",
                descriptionLongue: "",
                nomLangue: ""
            }
        ]
    },
    loaded: false
}

const desctoupdateSlice = createSlice({
    name: "desccuvéetoupdate",
    initialState,
    reducers: {
        storedescinitial: (state) => {
            state.value = initialState.value
            state.loaded = initialState.loaded
        },
        storedesc: (state, action) => {
             state.value = action.payload
             state.loaded = true
        }
    }
})
export const { storedescinitial, storedesc } = desctoupdateSlice.actions;
export default desctoupdateSlice.reducer;