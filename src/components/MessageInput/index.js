import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMessage } from "../../ducks/messages";
import moment from "moment";

import "./style.css";

const user = {
    avatar:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
    nickname: "jeronima"
};

class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    state = {
        text: ""
    };
    onChange = ev => {
        // if (!this.state.text) this.props.handleKeyDownEnter(true); // reset height

        this.setState({ text: ev.target.value });
    };

    handleEnter = ev => {
        const email = this.props.user && this.props.user.email;
        if (ev.keyCode === 13 && !ev.shiftKey) {
            const date = moment().format("DD-MM-YYYY HH:mm");

            !/^[ \t\r\n]*$/.test(this.state.text) && // is not this regex
                this.props.addMessage({
                    ...user,
                    nickname: email,
                    text: this.state.text,
                    date
                });
            this.setState({ text: "" });
            this.props.handleKeyDownEnter(true);
            ev.preventDefault();
        } else if (ev.keyCode === 13 && ev.shiftKey) {
            this.props.handleKeyDownEnter(false);
        }
    };

    render() {
        return (
            <form className="MessageInput" ref={this.formRef}>
                <textarea
                    onKeyDown={this.handleEnter}
                    onChange={this.onChange}
                    className="MessageInput-textarea"
                    placeholder="Type some..."
                    value={this.state.text}
                />
            </form>
        );
    }
}

MessageInput.propTypes = {
    addMessage: PropTypes.func,
    handleKeyDownEnter: PropTypes.func
};

export default connect(
    null,
    { addMessage }
)(MessageInput);
