import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersList from '../UsersList';
import { connect } from 'react-redux';
import { usersSelector } from '../../ducks/user';

import './style.css';
class ChatTopBar extends Component {
    static propTypes = {};
    state = {
        isOpenUserList: false
    };
    onClick = () => this.setState(prev => ({ isOpenUserList: !prev.isOpenUserList }));
    render() {
        return (
            <div className="ChatTopBar">
                {/* {this.state.isOpenUserList && (
                    <div className="MessageBox-usersList">
                        <UsersList users={this.props.users} />
                    </div>
                )} */}
                <span onClick={this.onClick} className="ChatTopBar-title">
                    Best Chat
                    <span className="ChatTopBar-topbar">
                        {Object.values(this.props.users).filter(el => el[0]).length}/
                        {Object.values(this.props.users).length} online
                    </span>
                </span>
            </div>
        );
    }
}

export default connect(state => ({
    users: usersSelector(state)
}))(ChatTopBar);
