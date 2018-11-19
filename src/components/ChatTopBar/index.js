import React, { Component } from "react";
import PropTypes from "prop-types";

import "./style.css";
export default class ChatTopBar extends Component {
    static propTypes = {};

    render() {
        return (
            <div className="ChatTopBar">
                <span onClick={this.props.onClick} className="ChatTopBar-title">
                    Best Chat
                </span>
            </div>
        );
    }
}
