import React from 'react';
import AppShell from './AppShell';
import Theme from '../components/Theme';
import JssProvider from 'react-jss/lib/JssProvider';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createContext from '../styles/createContext';

const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
});

let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);

const context = createContext();

class App extends React.Component {

	componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

	render() {
		return (
			<JssProvider registry={context.sheetsRegistry} jss={context.jss}>
        <MuiThemeProvider theme={context.theme} sheetsManager={context.sheetsManager}>
					<AppShell>
						{this.props.children}
					</AppShell>
        </MuiThemeProvider>
      </JssProvider>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.node
};

export default App;
