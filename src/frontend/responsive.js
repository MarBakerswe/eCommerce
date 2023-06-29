import { css } from "styled-components"

// This function returns a css block which will apply the passed styles
// if the device's screen width is 300px or less.
export const mobileSmall = (props) => {
  return css`
    @media only screen and (max-width: 300px) {
      ${props}
    }
  `
}

// Function to apply styles for mobile devices with screen width of 420px or less.
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 420px) {
      ${props}
    }
  `
}

// Function to apply styles for larger mobile devices with screen width of 550px or less.
export const mobileLarge = (props) => {
  return css`
    @media only screen and (max-width: 550px) {
      ${props}
    }
  `
}

// Function to apply styles for small tablets with screen width of 820px or less.
export const tabletSmall = (props) => {
  return css`
    @media only screen and (max-width: 820px) {
      ${props}
    }
  `
}

// Function to apply styles for regular tablet devices with screen width of 1300px or less.
export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 1300px) {
      ${props}
    }
  `
}

// Function to apply styles for large screen devices with screen width of 1540px or more.
// These could include desktops and large tablets in landscape mode.
export const screenLarge = (props) => {
  return css`
    @media only screen and (min-width: 1540px) {
      ${props}
    }
  `
}
