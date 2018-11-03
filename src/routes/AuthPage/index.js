import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../../components/AuthForm/index'
import './style.css'

class AuthPage extends Component {
    render() {
        return (
            <div className='AuthPage-wrapper'>
                <AuthForm/>
            </div>
        );
    }
}

AuthPage.propTypes = {};

export default AuthPage;
