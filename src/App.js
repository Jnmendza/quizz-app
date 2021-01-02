import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import history from './history'
import StartPage from './StartPage'
import Quiz from './Quiz';
import { AnimatePresence } from 'framer-motion'

export default function App() {
	return (
		<Router history={history}>
			<AnimatePresence>
				<Switch>
					<Route exact path="/" component={StartPage} />
					<Route exact path="/quiz" component={Quiz} />
				</Switch>
			</AnimatePresence>
		</Router>
	);
}
