/**
 * Contract to provide function to get all
 */
export type GetAll<T> = () => Promise<T>
/**
  * Contract to provide function to get one
 */
export type GetOne<U, T> = (item: U) => Promise<T>
/**
 * Contract to provide function to create one item of T
 */
export type CreateOne<T> = PostOne<T, T>

/**
 * Contract to provide function to post item
 */
export type PostOne<U, T> = (item: U) => Promise<T>
