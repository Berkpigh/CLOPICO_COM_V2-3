import styled, { css } from 'styled-components'

import { borderRadius } from "../ui/borderRadius"
import { interactive } from "../ui/interactive"
import { IsActiveProp } from "../ui/props"
//import { getColor } from "./getters"

export const OptionItem = styled.div<IsActiveProp>`
  outline: none;
  ${interactive};
  color: braun;
  position: relative;
  padding: 8px;
  ${borderRadius.s}

  ${({ isActive }) =>
    isActive &&
    css`
      background: white;
      color: black;
    `}
`
/* 
export const OptionItem = styled.div<IsActiveProp>`
  outline: none;
  ${interactive};
  color: ${getColor('textSupporting')};
  position: relative;
  padding: 8px;
  ${borderRadius.s}

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
      color: ${getColor('contrast')};
    `}
`
 */