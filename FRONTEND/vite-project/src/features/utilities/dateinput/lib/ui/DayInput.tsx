import { enforceRange } from "../../lib/utils/enforceRange"
import { intervalRange } from "../../lib/utils/intervalRange"
import { match } from "../../lib/utils/match"
import { Day, fromDay, toDay } from "../../lib/utils/Day"
import { monthNames, shortMonthsNames } from "../../lib/utils/Month"
import { useMemo } from 'react'
import styled from 'styled-components'

import { InputProps } from '../../lib/ui/props'
import { ExpandableSelector } from '../../lib/ui/ExpandableSelector'

import {
  dayInputParts,
  fromDayInputParts,
  toDayInputParts,
} from './DayInputParts'
import { getDayInputPartInterval } from "../ui/getDayInputPartInterval"

type DayInputProps = InputProps<Day> & {
  min: Day
  max: Day
}

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: 65px 78px 78px;
  grid-template-rows: 15px;
  gap: 3px;
  padding: 1px, 1px, 1px, 1px;
  
`

export const DayInput = ({ value, onChange, min, max }: DayInputProps) => {
  const parts = useMemo(() => toDayInputParts(fromDay(value)), [value])

  return (
    <Container>
      {dayInputParts.map((part) => {
        const interval = getDayInputPartInterval({
          min,
          max,
          part,
          value: parts,
        })

        return (
          <ExpandableSelector
            key={part}
            value={parts[part]}
            onChange={(value) => {
              const newParts = { ...parts, [part]: value }

              const lowerParts = dayInputParts.slice(
                0,
                dayInputParts.indexOf(part),
              )
              lowerParts.toReversed().forEach((part) => {
                const { start, end } = getDayInputPartInterval({
                  min,
                  max,
                  part,
                  value: newParts,
                })
                newParts[part] = enforceRange(newParts[part], start, end)
              })

              const newValue = toDay(fromDayInputParts(newParts))

              onChange(newValue)
            }}
            options={intervalRange(interval)}
            renderOption={(option) =>
              match(part, {
                day: () => option.toString(),
                month: () => shortMonthsNames[option - 1],
                year: () => option.toString(),
              })
            }
            getOptionKey={(option) => option.toString()}
            getOptionName={(option) => option.toString()}
          />
        )
      })}
    </Container>
  )
}
/* const Container = styled.div`
  display: grid;
  grid-template-columns: 80px 128px 88px;
  gap: 8px;
` */