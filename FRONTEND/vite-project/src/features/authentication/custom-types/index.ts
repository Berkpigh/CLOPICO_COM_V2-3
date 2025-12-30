import { CreateOne, PostOne } from "../../../shared/models/custom.types"
import { ApiReturnType, AuthenticationUser, LoginUser } from "../models"

/**
 * Contract to provde function to post register info
 */
export type CreateOneUser = CreateOne<ApiReturnType>
/**
 * Contract to provde function to post login info
 */
export type PostOneUser = PostOne<LoginUser, AuthenticationUser>

