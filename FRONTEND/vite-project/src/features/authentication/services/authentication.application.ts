import { CreateOneUser, PostOneUser } from "../custom-types"
import { ApiReturnType, AuthenticationUser, CreationUser, LoginUser } from "../models"
import { postCreateUserByApi, postLogInByApi } from "./authentication.infrastructure"

/**
 * Login user to database (api)
 * * @param api Api to get raw use
*/
async function CreateUser(user: CreationUser, api: CreateOneUser): Promise<ApiReturnType> {
    let result = await api(user)
    //.info('createoneuser result: ',result)

    return result
}
/**
 * Login user to database (api)
 * * @param api Api to get raw user
*/
async function loginUser(user: LoginUser, api: PostOneUser): Promise<ApiReturnType> {
    let result = await api(user)
    //console.info('postoneuser result: ',result)

    return result
}


export function factoryCreationUserBusiness(user: CreationUser): Promise<AuthenticationUser> {
    return CreateUser(user, postCreateUserByApi)
}

export const businessRegisterUser = {
    register: factoryCreationUserBusiness
}

export const businessCreateUser = {
    createUser: factoryCreationUserBusiness
}
// === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === *

export function factoryLoginUserBusiness(user: LoginUser): Promise<AuthenticationUser> {
    return loginUser(user, postLogInByApi)
}
const business = {
    logIn: factoryLoginUserBusiness
}
// === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === *

export default business