import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import styledComponentTheme from './theme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { orange, indigo } from 'material-ui/colors';

const muiTheme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: indigo
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
