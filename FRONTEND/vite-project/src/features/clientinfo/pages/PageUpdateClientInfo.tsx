import { ClientInfoContext, ContextState } from "../cliinfcontext";
import { UpdateClientInfo } from "../components/UpdateClientInfo";

export const PageUpdateClientInfo = () => {
//    const [item, setItem] = useState<ContextState>({value: 'clientinfo'})

//    const contextToShare: ContextWithChangeState = {
//        item: item,
//        setItem: setItem
//    }

    const contextToShare: ContextState = {
        value: false
    }

    return (
        <>
            <ClientInfoContext.Provider value={contextToShare}>
                <UpdateClientInfo></UpdateClientInfo>
            </ClientInfoContext.Provider>
        </>
    )
}