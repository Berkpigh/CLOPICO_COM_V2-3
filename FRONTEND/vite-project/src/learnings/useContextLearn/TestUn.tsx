import { useMyContext } from "./my-context"

export const TestUn = () => {
    const context = useMyContext()
    
    return (
        <div>
            <h1>Test 1</h1>
            <div>
                {context.item.value}
            </div>
        </div>
    )
}

export const TestDeux = () => {
    const context = useMyContext()
    
    return (
        <div>
            <h1>Test 2</h1>
            <div>
                {context.item.value}
            </div>
        </div>
    )
}

export const TestTrois = () => {
    const context = useMyContext()
    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (context.setItem !== null) {
            context.setItem({value: e.target.value})
        }
    }
    
    return (
        <div>
            <h1>Test 3</h1>
            <div>
                <input type="text" value={context.item.value} onChange={changeValue}></input>
            </div>
        </div>
    )
}