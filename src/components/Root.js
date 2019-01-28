import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import AuthPage from '../routes/AuthPage/';
import ProtectedRoute from './ProtectedRoute';
import { signOut, online, offline } from '../ducks/user';
import TopBar from './TopBar';
import MainPage from '../routes/MainPage';

const UserContext = React.createContext(null);
class Root extends Component {
    componentDidMount = () => {
        window.addEventListener('blur', this.props.offline);
        window.addEventListener('focus', this.props.online);
    };

    render() {
        const { user } = this.props;

        return (
            <UserContext.Provider>
                <TopBar />
                <Route path="/auth" component={AuthPage} />
                <ProtectedRoute exact path="/" component={MainPage} />
            </UserContext.Provider>
        );
    }
}

Root.propTypes = {};

export default connect(
    state => ({ user: state.user.user }),
    { signOut, online, offline },
    null,
    { pure: false }
)(Root);
