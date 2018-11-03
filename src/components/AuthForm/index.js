import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SingUpForm from './SingUpForm'
import SingInForm from './SingInForm'
import Loader from '../Loader'
import {NavLink, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import './style.css'

class AuthForm extends Component {
    render() {
        if (this.props.loading) return <Loader/>
        return (
            <div className='AuthForm'>
                <div className='AuthForm-NavLink-group'>
                    <NavLink to='/auth' exact className='AuthForm-NavLink' activeClassName={'AuthForm-NavLink_active'}>
                        Sign in
                    </NavLink>
                    <NavLink to='/auth/singUp' className='AuthForm-NavLink' activeClassName={'AuthForm-NavLink_active'}>
                        Sign up
                    </NavLink>
                </div>
                <Route path='/auth/singUp' component={SingUpForm}/>
                <Route exact path='/auth' component={SingInForm}/>
            </div>
        );
    }
}

AuthForm.propTypes = {};

export default connect(state => ({loading: state.user.loading}))(AuthForm)
