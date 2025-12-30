//import { InputLabel } from "../../lib/inputs/InputLabel";
import { DayInput } from "../../lib/ui/DayInput";
import { Day, toDay } from "../../lib/utils/Day";
//import { makeDemoPage } from "../../lib/ui/makeDemoPage"
import { subYears } from 'date-fns';
import { useMemo, useState } from 'react';


export const getDefaultDob = () => toDay(subYears(Date.now(), 20).getTime())

const useDobBoundaries = () => {
  const maxDob = useMemo(() => toDay(subYears(Date.now(), -3).getTime()), [])
  const minDob = useMemo(() => toDay(subYears(Date.now(), 80).getTime()), [])

  return [minDob, maxDob]
}

const MakeDemoPage = (() => {
  console.log("getDefaultDob : ", getDefaultDob())
  const [value, setValue] = useState<Day>(getDefaultDob)

  const [min, max] = useDobBoundaries()
  console.log("min, max : ", min, " , ", max)
  return (
      <div>
        <DayInput min={min} max={max} value={value} onChange={setValue} />{value.year}
{/*         <div></div>
        <div>{value.year}</div>
        <div>{value.dayIndex}</div>
 */}      </div>

  )
})
export default MakeDemoPage