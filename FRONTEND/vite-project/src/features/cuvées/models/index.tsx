/*
// *--- *--- *--- *--- *--- Concerne Nouvelle Cuvée 
*/
interface Cuvée {
    CuvéeId: number,
    AnnéeCuvée: number,
    TypeCuvée: string,
    LibelléCuvée: string,
    Dbouteilles : Nouv_Bouteille[]
}
export interface Nouv_Bouteille {
        BouteilleId: number,
        Capacité: number,
        Dproduits: Nouv_Produit[]
}
export type nouvbout = Nouv_Bouteille[]
export interface Nouv_Produit {
        ProduitId: number,
        NombreBouteilles: number,
        QuantitéMinimum: number,
}
export type Nouv_Cuvée = Cuvée

export type OneCuvée =  {
    CuvéeId: number,
    AnnéeCuvée: number,
    TypeCuvée: string,
    LibelléCuvée: string
}
export type Bouteille1 = {
        BouteilleId: number,
        Capacité: number
}
export type Bouteille2 = {
        BouteilleId: number,
        Capacité: number
}

export type pbt1 = Nouv_Produit[]

export interface Mes_Error {
        MessageE: string
}
export type MesE = Mes_Error[]

interface TypedRes {
        Location: string,
        StatusCode: number,
        Result: boolean
}
export type Tres = TypedRes 
/*
// *--- *--- *--- *--- *--- Concerne Liste de cuvées
*/
export interface IDescCuv {
        descriptionCuvéeId: number,
        cuvéeId: number,
        langue: number,
        description: string | null,
        descriptionLongue: string | null,
        nomLangue: string
}
export interface IOneCuv {
        cuvéeId: number,
        annéeCuvée: number,
        typeCuvée: string,
        libelléCuvée: string,
        descCuvée: IDescCuv[]
}
export interface IOneDesc {
        descriptionCuvéeId: number,
        cuvéeId: number,
        langue: number,
        description: string,
        descriptionLongue: string,
        nomLangue: string
}
export interface IOneCuvWithDesc {
        cuvéeId: number,
        annéeCuvée: number,
        typeCuvée: string,
        libelléCuvée: string,
        descCuvées: IOneDesc[]
}
interface ITresL {
        lcuv: IOneCuv[],
        ok: boolean
}
export type LCuvée = IOneCuv[]
export type TresL = ITresL
export type OneCuvWithDesc = IOneCuvWithDesc
export type LDescs = IOneDesc[]

