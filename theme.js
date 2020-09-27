import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    htmlFontSize: 14,
    fontSize: 14,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    h1: {
      fontSize: '2rem',
      fontWeight: '500',
      lineHeight:'4rem'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '500'
    },
    h3: {
      fontSize: '1.17rem',
      fontWeight: '600'
    },
    h4: {
      fontSize: '1.12rem',
      fontWeight: '500'
    },
    h5: {
      fontSize: '.83rem',
      fontWeight: '300'
    },
    h6: {
      fontSize: '.75rem',
      fontWeight: '300'
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
