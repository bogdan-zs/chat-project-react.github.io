import React, {Component} from 'react'
import {Provider} from 'react-redux'
import './config'
import Root from "./components/Root"
import {ConnectedRouter} from 'react-router-redux'
import history from './history'
import store from './store'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Root/>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
