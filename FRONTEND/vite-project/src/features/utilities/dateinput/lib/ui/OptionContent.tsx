import { HStack } from "../../lib/ui/stack"
import styled from 'styled-components'

import { cropText } from "../../lib/text/cropText"

export const OptionContent = styled(HStack)`
  overflow: hidden;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  > * {
    ${cropText};
  }
`
