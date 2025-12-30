import { Navigate } from "react-router-dom";
import { PropswithChildren } from "../../../core/custom-type";
import { getUserInfoFromLocalDb, getUserTokenFromLocalDb } from "../services/localstorage.infrastructure";

export const PrivateRoute = (props: PropswithChildren) => {
    const user = getUserInfoFromLocalDb()
    const token = getUserTokenFromLocalDb()
    if (user === null || (token === null)) {
        return <Navigate to='/login' replace></Navigate>
    }
    return props.children
}