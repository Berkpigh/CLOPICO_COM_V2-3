import { borderRadius } from '../ui/borderRadius'
import { hStack } from '../ui/stack'
//import { getColor } from './getters'
import styled from 'styled-components'

import { UnstyledButton } from '../ui/UnstyledButton'
import { horizontalPadding } from '../ui/horizontalPadding'
import { toSizeUnit } from '../ui/toSizeUnit'

export const selectContainerMinHeight = 40

export const SelectContainer = styled(UnstyledButton)`
  ${hStack({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  })}

  ${borderRadius.s};
  border: 1px solid gray;
  ${horizontalPadding(12)};
  background: white;

  min-height: ${toSizeUnit(selectContainerMinHeight)};

  font-size: 14px;

  outline: 1px solid transparent;
  &:focus,
  &:active {
    outline: 1px solid black;
  }
`

/* 
export const SelectContainer = styled(UnstyledButton)`
  ${hStack({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  })}

  ${borderRadius.s};
  border: 1px solid ${getColor('foregroundExtra')};
  ${horizontalPadding(12)};
  background: ${getColor('foreground')};

  min-height: ${toSizeUnit(selectContainerMinHeight)};

  font-size: 14px;

  outline: 1px solid transparent;
  &:focus,
  &:active {
    outline: 1px solid ${getColor('contrast')};
  }
`
 */