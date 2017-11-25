import React from 'react';
import ReactDOM from 'react-dom';
import App from './main';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import styledComponentTheme from './theme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { orange, indigo } from 'material-ui/colors';

const muiTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange
  },
});

const Root = props => (
    <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={styledComponentTheme}>
            <App></App>
        </ThemeProvider>
    </MuiThemeProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
