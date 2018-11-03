import React, {Component} from 'react';
import PropTypes from 'prop-types'
import MessageBox from "./MessageBox"
import {Route} from 'react-router-dom'
import AuthPage from '../routes/AuthPage/'
import {connect} from 'react-redux'
import ProtectedRoute from "./ProtectedRoute";

const UserContext = React.createContext(null)
class Root extends Component {
    render() {
        const {user} = this.props

        return (
            <UserContext.Provider>
                <div>{user && user.email}</div>
                <Route path='/auth' component={AuthPage}/>
                <ProtectedRoute exact path='/' component={MessageBox}/>
            </UserContext.Provider>
        );
    }
}

Root.propTypes = {};

export default connect(state => ({user: state.user.user}), null, null, {pure: false})(Root);
