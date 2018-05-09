import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store'
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal'
import purple from 'material-ui/colors/purple'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: teal,
    secondary: purple,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </CssBaseline>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
