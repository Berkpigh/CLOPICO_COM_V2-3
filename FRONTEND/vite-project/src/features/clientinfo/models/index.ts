export interface ClientInfo {
    clientId: number;
    ownerId: string;
    nom: string;
    prénom: string;
    dateContact: any;
    f_ContactId: number;
    f_DTypeContact: number;
    f_Cnom: string;
    f_Cprénom: string;
    f_AdresseMail: string;
    f_TélPortable: string;
    f_TélFixe: string;
    f_Adresse1: string;
    f_Adresse2: string;
    f_Ville: string;
    f_Pays: string;
    f_NuméroPostal: number;

    l_ContactId: number;
    l_DTypeContact: number;
    l_Cnom: string;
    l_Cprénom: string;
    l_AdresseMail: string;
    l_TélPortable: string;
    l_TélFixe: string;
    l_Adresse1: string;
    l_Adresse2: string;
    l_Ville: string;
    l_Pays: string;
    l_NuméroPostal: number;
    ok: boolean;
}

export interface ClientData {
    clientId: number;
    ownerId: string;
    nom: string;
    prénom: string;
    dateContact: any;
}

export interface F_ContactData {
    f_ContactId: number;
    f_DTypeContact: number;
    f_Cnom: string;
    f_Cprénom: string;
    f_AdresseMail: string;
    f_TélPortable: string;
    f_TélFixe: string;
    f_Adresse1: string;
    f_Adresse2: string;
    f_Ville: string;
    f_Pays: string;
    f_NuméroPostal: number;
}

export interface L_ContactData {
    l_ContactId: number;
    l_DTypeContact: number;
    l_Cnom: string;
    l_Cprénom: string;
    l_AdresseMail: string;
    l_TélPortable: string;
    l_TélFixe: string;
    l_Adresse1: string;
    l_Adresse2: string;
    l_Ville: string;
    l_Pays: string;
    l_NuméroPostal: number;
}
export interface ClientInfoKey {
    clientKey: number;
}
export interface FLKeys {
    f_contactId: number;
    l_contactId: number;
    ok: boolean;
}
export interface NumPost {
	numéroPostal: number,
	localité: string,
	canton: string,
	statutLivraison: number
}
export type NumPostList = NumPost[]
