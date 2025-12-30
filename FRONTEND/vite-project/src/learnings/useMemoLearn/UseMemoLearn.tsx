import { useMemo, useState } from "react"

const SquareList = () => {
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6])
    const [increment, setIncrement] = useState(0)

    const squares = useMemo(() => numbers.map(number => {
        console.log(`Calcul du carré de ${number}`)
        return number * number
    }), [numbers])

    return (
        <>
            <div>
                <div>
                    <label>{increment}</label>
                    <button onClick={() => setIncrement(increment + 1)}>Increment</button>
                    <button onClick={() => setNumbers([...numbers, numbers.length + 1])}>Add number</button>
                </div>
                <ul>
                    {
                        squares.map((square, index) => (
                                <li key ={index}>{square}</li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
export default SquareList