import React, { Component } from "react";
import PropTypes from "prop-types";
import User from "../UserRecord";
import "./style.css";

export default class UsersList extends Component {
    static propTypes = {};

    sortFunc(a, b) {
        return a.isOnline ? -1 : 1;
    }
    render() {
        const { users } = this.props;

        return (
            <ul className="UsersList">
                {users.sort(this.sortFunc).map(user => (
                    <li key={user.id}>
                        <User user={user} />
                    </li>
                ))}
            </ul>
        );
    }
}
