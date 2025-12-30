import { createSlice } from "@reduxjs/toolkit";

/* export interface BouteilleImages {
    value: {
         ImageList : [
            {
                bouteilleImageId: number,
                bouteilleId: number,   
                imageDesc: string,
                imageUrl: string
            }
        ]
    }
    loaded: boolean
}

const initialState: BouteilleImages = {
    value: {
        ImageList: [
            {
                bouteilleImageId: 0,
                bouteilleId: 0,   
                imageDesc: "",
                imageUrl: ""
            }
        ]
    },
    loaded: false
}
 */

export interface BouteilleImages {
    value: {
        bouteilleId: number,
        cuvéeId: number,
        libelléBouteille: string,
        capacité: number,
        dbouteilleImages: [
            {
                bouteilleImageId: number,
                bouteilleId: number,   
                imageDesc: string,
                imageUrl: string
            }
        ],
        dproduits: [
            {
                produitId: number,
                bouteilleId: number,
                libelléProduit: string,
                nombreBouteilles: number,
                prixTTC: number,
                fraisPoste: number,
                quantitéMinimum: number,
                datePeremption: string,
                dproduitActions: [
                    {
                        produitActionId: number,
                        produitId: number,
                        actionDesc: string,
                        actionPourcent: number,
                        débutAction: string,
                        finAction: string
                    }
                ]
            },
            {
                produitId: number,
                bouteilleId: number,
                libelléProduit: string,
                nombreBouteilles: number,
                prixTTC: number,
                fraisPoste: number,
                quantitéMinimum: number,
                datePeremption: string,
                dproduitActions: [
                    {
                        produitActionId: number,
                        produitId: number,
                        actionDesc: string,
                        actionPourcent: number,
                        débutAction: string,
                        finAction: string
                    }
                ]
            },
            {
                produitId: number,
                bouteilleId: number,
                libelléProduit: string,
                nombreBouteilles: number,
                prixTTC: number,
                fraisPoste: number,
                quantitéMinimum: number,
                datePeremption: string,
                dproduitActions: [
                    {
                        produitActionId: number,
                        produitId: number,
                        actionDesc: string,
                        actionPourcent: number,
                        débutAction: string,
                        finAction: string
                    }
                ]
            }
        ],
        dstocks: [
            {
                stockId: number,
                bouteilleId: number,
                quantitéEntrée: number,
                DateEntrée: string,
                valeurEntrée: number,
                valeurVendue: number,
                valeurSolde: number,
                quantitéRéserve: number,
                quantitéSolde: number
            }
        ]
    }
    loaded: boolean
}

const initialState: BouteilleImages = {
    value: {
        bouteilleId: 0,
        cuvéeId: 0,
        libelléBouteille: "",
        capacité: 0,
        dbouteilleImages: [
            {
                bouteilleImageId: 0,
                bouteilleId: 0,   
                imageDesc: "",
                imageUrl: ""
            }
        ],
        dproduits: [
            {
                produitId: 0,
                bouteilleId: 0,
                libelléProduit: "",
                nombreBouteilles: 0,
                prixTTC: 0,
                fraisPoste: 0,
                quantitéMinimum: 0,
                datePeremption: "",
                dproduitActions: [
                    {
                        produitActionId: 0,
                        produitId: 0,
                        actionDesc: "",
                        actionPourcent: 0,
                        débutAction: "",
                        finAction: ""
                    }
                ]
            },
            {
                produitId: 0,
                bouteilleId: 0,
                libelléProduit: "",
                nombreBouteilles: 0,
                prixTTC: 0,
                fraisPoste: 0,
                quantitéMinimum: 0,
                datePeremption: "",
                dproduitActions: [
                    {
                        produitActionId: 0,
                        produitId: 0,
                        actionDesc: "",
                        actionPourcent: 0,
                        débutAction: "",
                        finAction: ""
                    }
                ]
            },
            {
                produitId: 0,
                bouteilleId: 0,
                libelléProduit: "",
                nombreBouteilles: 0,
                prixTTC: 0,
                fraisPoste: 0,
                quantitéMinimum: 0,
                datePeremption: "",
                dproduitActions: [
                    {
                        produitActionId: 0,
                        produitId: 0,
                        actionDesc: "",
                        actionPourcent: 0,
                        débutAction: "",
                        finAction: ""
                    }
                ]
            }
        ],
        dstocks: [
            {
                stockId: 0,
                bouteilleId: 0,
                quantitéEntrée: 0,
                DateEntrée: "",
                valeurEntrée: 0,
                valeurVendue: 0,
                valeurSolde: 0,
                quantitéRéserve: 0,
                quantitéSolde: 0
            }
        ]
    },
    loaded: false
}


const imagetoupdateSlice = createSlice({
    name: "imagetoupdate",
    initialState,
    reducers: {
        storeimageinitial: (state) => {
            state.value = initialState.value
            state.loaded = initialState.loaded
        },
        storeimage: (state, action) => {
             state.value = action.payload
             state.loaded = true
        }
    }
})
export const { storeimageinitial, storeimage } = imagetoupdateSlice.actions;
export default imagetoupdateSlice.reducer;