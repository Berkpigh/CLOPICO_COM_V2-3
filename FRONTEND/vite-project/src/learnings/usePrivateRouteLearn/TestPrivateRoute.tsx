// import { ReactNode } from "react";
// import { LayoutComponent } from "../useChildrenLearn/LayoutComponent";
import { Navigate } from "react-router-dom";
import { PropswithChildren } from "../../core/custom-type"


export const TestPrivateRoute = (props: PropswithChildren) => {
    const value = 0
    // const children = props.children

    if (value === 0) {
        return <Navigate to='/login' replace></Navigate>
    }
    if (value === 1) {
        return props.children
    }
    
}