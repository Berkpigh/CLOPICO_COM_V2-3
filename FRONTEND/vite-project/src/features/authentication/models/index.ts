export interface User {
    name: string;
    firstName: string;
    email: string;
    password: string;
    ok: boolean;
    roleName?: string;
    clientid?: number;
}
export interface AuthenticationUser extends User {
    token ?: string;
}
export interface LoginUser {
    login: string;
    password: string;
}
export interface CreationUser {
    name: string;
    firstName: string;
    email: string;
    password: string;
    ok: boolean;
    roleName?: string;
    clientid?: number;
}

export interface UserEmail {
    email: string;
}
export interface ApiReturnType {
    name: string;
    firstName: string;
    email: string;
    password: string;
    ok: boolean;
    roleName?: string;
    clientid?: number;
}
export type userInfo = {
    email?: string;
    clientid?: number;
}
