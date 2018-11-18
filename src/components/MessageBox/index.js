import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "../Message";
import "./style.css";
import MessageInput from "../MessageInput";
import { connect } from "react-redux";
import {
    messagesListSelector,
    fetchAllMessages,
    stateSelector
} from "../../ducks/messages";
import Loader from "../Loader";

const MAX_INPUT_HEIGHT = 30;

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.messagesBoxRef = React.createRef();
        this.state = this.initialState();
    }

    initialState = () => ({
        messagesHeight: 90,
        inputHeight: 10
    });

    componentDidMount() {
        this.props.fetchAllMessages();
    }

    componentDidUpdate() {
        if (!this.messagesBoxRef.current) return;
        this.messagesBoxRef.current.scrollTop = this.messagesBoxRef.current.scrollHeight;
    }

    handleKeyDownEnter = reset => {
        if (reset) return this.setState(this.initialState());

        this.setState(state => {
            if (state.inputHeight > MAX_INPUT_HEIGHT)
                return {
                    inputHeight: state.inputHeight,
                    messagesHeight: state.messagesHeight
                };
            return {
                inputHeight: state.inputHeight + 2,
                messagesHeight: state.messagesHeight - 2
            };
        });
    };

    render() {
        const { messages, loading } = this.props;
        const messagesStyle = {
            height: `${this.state.messagesHeight}%`
        };

        const inputStyle = {
            height: `${this.state.inputHeight}%`
        };

        if (loading)
            return (
                <div className="MessageBox">
                    <Loader />
                </div>
            );

        return (
            <div className="MessageBox" style={{ width: this.props.width }}>
                <ul
                    className="MessageBox-messagesList"
                    ref={this.messagesBoxRef}
                    style={messagesStyle}
                >
                    {messages.map((message, index) => (
                        <li key={message.uid} className="MessageBox-record">
                            <Message
                                user={this.props.user}
                                message={message}
                                nextNickname={
                                    messages[index + 1] &&
                                    messages[index + 1].nickname
                                }
                            />
                        </li>
                    ))}
                </ul>
                <div className="MessageBox-input" style={inputStyle}>
                    <MessageInput
                        user={this.props.user}
                        handleKeyDownEnter={this.handleKeyDownEnter}
                    />
                </div>
            </div>
        );
    }
}

MessageBox.propTypes = {
    messages: PropTypes.array,
    width: PropTypes.string.isRequired
};

MessageBox.defaultProps = {
    messages: []
};

export default connect(
    state => ({
        user: state.user.user,
        messages: messagesListSelector(state),
        loading: stateSelector(state).loading
    }),
    { fetchAllMessages }
)(MessageBox);
