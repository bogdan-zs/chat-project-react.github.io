import React, {Component} from 'react';
import PropTypes from 'prop-types'
import MessageBox from "./MessageBox"
import {Route} from 'react-router-dom'
import AuthPage from '../routes/AuthPage/'
import {connect} from 'react-redux'
import ProtectedRoute from "./ProtectedRoute";
import {signOut} from '../ducks/user'
import TopBar from "./TopBar";
import MainPage from "../routes/MainPage";

const UserContext = React.createContext(null)
class Root extends Component {

    render() {
        const {user} = this.props

        return (
            <UserContext.Provider>
                <TopBar/>
                <Route path='/auth' component={AuthPage}/>
                <ProtectedRoute exact path='/' component={MainPage}/>
            </UserContext.Provider>
        );
    }
}

Root.propTypes = {};

export default connect(state => ({user: state.user.user}), {signOut}, null, {pure: false})(Root);
