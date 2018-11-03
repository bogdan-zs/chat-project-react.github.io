import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Loader from '../Loader'
import AuthPage from "../../routes/AuthPage";

class ProtectedRoute extends Component {
    renderProtected = (routeProps) => {
        const {component: ProtectedComponent, isAuth, push} = this.props
        return isAuth ? <ProtectedComponent {...routeProps}/> : <AuthPage/>
    }
    render() {
        const {component, loading, ...rest} = this.props
        if (loading) return <Loader/>
        return (
            <Route {...rest} render={this.renderProtected}/>
        );
    }
}

ProtectedRoute.propTypes = {};

export default connect(state => ({isAuth: !!state.user.user, loading: state.user.loading}), { push }, null, {pure: false})(ProtectedRoute)
