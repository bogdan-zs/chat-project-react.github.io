import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SingUpForm from './SingUpForm'
import SingInForm from './SingInForm'
import Loader from '../Loader'
import cx from 'classnames'
import {NavLink, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import './style.css'

class AuthForm extends Component {
    state = {
        isSignIn: true
    }

    handleClick = isSignIn => () => {
        this.setState({isSignIn})
    }

    render() {
        if (this.props.loading) return <Loader/>

        let activeClassSignIn = null;
        let activeClassSignUp = null;

        this.state.isSignIn && (activeClassSignIn = 'AuthForm-NavLink_active')
        !this.state.isSignIn && (activeClassSignUp = 'AuthForm-NavLink_active')



        return (
            <div className='AuthForm'>
                <div className='AuthForm-NavLink-group'>
                    <div
                        onClick={this.handleClick(true)}
                        className={cx('AuthForm-NavLink', activeClassSignIn)}
                    >
                        Sign in
                    </div>
                    <div
                        onClick={this.handleClick(false)}
                        className={cx('AuthForm-NavLink', activeClassSignUp)}
                    >
                        Sign up
                    </div>
                </div>
                {this.state.isSignIn ?
                    < SingInForm/> :
                    <SingUpForm/>
                }
            </div>
        );
    }
}

AuthForm.propTypes = {};

export default connect(state => ({loading: state.user.loading}))(AuthForm)
