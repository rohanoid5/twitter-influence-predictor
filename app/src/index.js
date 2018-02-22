import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import { hashHistory  } from 'react-router';
import App from './containers/App';
import Home from './containers/home';
import configureStore from './store/configureStore';
import allReducers from './reducers'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

injectTapEventPlugin();
const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise,logger)
);

function routeHomePages(s, cb) {
	System.import('./containers/home').then(component => {
		cb(null, component.default || component);
	});
}

//const history = useRouterHistory(createHashHistory)();
render(
	(<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
				  <IndexRoute component={Home}/>
					<Route path="home" getComponent={routeHomePages}/>
	      </Route>
			</Router>
		</Provider>), document.getElementById('app')
);
