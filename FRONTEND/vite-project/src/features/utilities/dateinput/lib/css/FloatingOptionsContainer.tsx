import styled from 'styled-components';

import { borderRadius } from "../../lib/ui/borderRadius"
//import { getColor } from "./getters"

export const FloatingOptionsContainer = styled.div`
  ${borderRadius.m};
  overflow-y: auto;
  outline: none;
  border: 1px solid gray;

  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 4px;
  background: white;
  z-index: 1;
`
// border: 1px solid ${getColor('foregroundExtra')};
//  background: ${getColor('foreground')};
