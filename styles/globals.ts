import { globalCss } from '@stitches/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
  },
  'html,body': {
    height: '100vh',
    padding: 0,
    margin: 0,
    color: '#FFF',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
  },
  'body,#__next': {
    height: '100%',
  },
  'a': {
    color: 'inherit',
    textDecoration: 'none',
  },
})
