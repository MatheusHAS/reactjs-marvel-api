import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme()

const styles = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  progress: {
    margin: defaultTheme.spacing.unit * 2,
  },
})

export default function Loading() {
  return (
    <MuiThemeProvider theme={styles}>
      <CircularProgress className={styles.progress} />
    </MuiThemeProvider>
  )
}
