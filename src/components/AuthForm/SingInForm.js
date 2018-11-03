import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {signIn} from '../../ducks/user'
import './formStyle.css'

class SingInForm extends Component {
    state = {
        email: '',
        password: ''
    }

    handleOnChange = type => ev => {
        this.setState({[type]: ev.target.value})
    }

    handleOnSubmit = ev => {
        const {email, password} = this.state
        console.log(email, password)
        this.props.signIn({email, password})

        ev.preventDefault()
    }
    render() {
        const {email, password} = this.state

        return (
            <form className='Auth-form' onSubmit={this.handleOnSubmit}>
                <input
                    className='Auth-input'
                    placeholder='email'
                    name='email'
                    type='email'
                    value={email}
                    onChange={this.handleOnChange('email')}/>
                <input
                    className='Auth-input'
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={this.handleOnChange('password')}/>
                <input className='Auth-input' type='submit' value='sing in'/>
            </form>
        );
    }
}

SingInForm.propTypes = {};

export default connect(null, { signIn })(SingInForm);
