import { useState } from "react";
import { ContextState, ContextWithChangeState, MyContext } from "./my-context"
import { TestDeux, TestTrois, TestUn } from "./TestUn"

export const UseMyContext = () => {
    const [item, setItem] = useState<ContextState>({value: 'Ah que johny'})

    const contextToShare: ContextWithChangeState = {
        item,
        setItem
    }
    // Equivalent à :
    // const contextToShare = {
    //     item: item,
    //     setItem: setItem
    // }


    return (
        <>
            <MyContext.Provider value={contextToShare}>
                <TestUn></TestUn>o
                <TestDeux></TestDeux>
                <TestTrois></TestTrois>
            </MyContext.Provider>

        </>
    )
}