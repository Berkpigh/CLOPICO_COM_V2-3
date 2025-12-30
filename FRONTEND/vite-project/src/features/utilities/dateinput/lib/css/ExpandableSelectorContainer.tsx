import styled, { css } from 'styled-components';

import { interactive } from "../ui/interactive"
import { IsActiveProp, IsDisabledProp } from "../ui/props"
//import { getHoverVariant } from "../ui/getHoverVariant"
//import { getColor } from "./getters"

import { ExpandableSelectorToggle } from './ExpandableSelectorToggle'
import { SelectContainer } from "./SelectContainer"

type ExpandableSelectorContainerProps = IsActiveProp & IsDisabledProp

export const ExpandableSelectorContainer = styled(
  SelectContainer,
)<ExpandableSelectorContainerProps>`
  ${({ isDisabled }) =>
    isDisabled
      ? css`
          pointer-events: none;
          opacity: 0.4;
        `
      : css`
          ${interactive};

          &:hover {
            background: white;
            ${ExpandableSelectorToggle} {
              color: green;
            }
          }

          `}

  outline: 1px solid transparent;

  flex-shrink: 0;

  ${({ isActive }) =>
    isActive &&
/*  
  css`
      background: ${getHoverVariant('foreground')};
      ${ExpandableSelectorToggle} {
        color: ${getColor('contrast')};
      }
      outline: 1px solid ${getColor('text')};
    `}
 */

  css`
      background: white;
      ${ExpandableSelectorToggle} {
        color: green;
      }
      outline: 1px solid blue;
    `}

  &:active, &:focus {
    outline: 1px solid red;
  }
`

/* 
          &:hover {
            background: ${getHoverVariant('foreground')};
            ${ExpandableSelectorToggle} {
              color: ${getColor('contrast')};
            }
          }
 */
/* 
export const ExpandableSelectorContainer = styled(
  SelectContainer,
)<ExpandableSelectorContainerProps>`
  ${({ isDisabled }) =>
    isDisabled
      ? css`
          pointer-events: none;
          opacity: 0.4;
        `
      : css`
          ${interactive};

          &:hover {
            background: ${getHoverVariant('foreground')};
            ${ExpandableSelectorToggle} {
              color: green;
            }
          }

          `}

  outline: 1px solid transparent;

  flex-shrink: 0;

  ${({ isActive }) =>
    isActive &&
/*  
  css`
      background: ${getHoverVariant('foreground')};
      ${ExpandableSelectorToggle} {
        color: ${getColor('contrast')};
      }
      outline: 1px solid ${getColor('text')};
    `}
 */
