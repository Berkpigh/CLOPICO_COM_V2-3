/*
// *--- *--- *--- Interfaces
*/
export interface bouteille {
    bouteilleId: number,
    cuvéeId: number,
    libelléBouteille: string,
    capacité: number,
    dbouteilleImages: oneBouteilleImage[],
    dproduits: oneProduit[],
    dstocks: stock[]
}
export interface oneBouteilleImage {
        bouteilleImageId: number,
        bouteilleId: number,   
        imageDesc: string,
        imageUrl: string
}
export interface oneProduit {
        produitId: number,
        bouteilleId: number,
        libelléProduit: string,
        nombreBouteilles: number,
        prixTTC: number,
        fraisPoste: number,
        quantitéMinimum: number,
        datePeremption: string,
        dproduitActions: oneProduitAction[]
}
export interface oneProduitAction {
        produitActionId: number,
        produitId: number,
        actionDesc: string,
        actionPourcent: number,
        débutAction: string,
        finAction: string
}
export interface stock {
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
export interface IOneBotWithStock {
    bouteilleId: number,
    cuvéeId: number,
    libelléBouteille: string,
    capacité: number,
    dproduits: oneProduit[]
}
/*
// *--- *--- *--- Types
*/
export type stocks = stock[]
/*
// *--- *--- *--- Erreurs
*/
export interface Mes_Error {
        MessageE: string
}
export type MesE = Mes_Error[]