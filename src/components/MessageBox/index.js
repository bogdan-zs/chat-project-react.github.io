import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "../Message";
import "./style.css";
import MessageInput from "../MessageInput";
import MessagesList from "../MessagesList";
import ChatTopBar from "../ChatTopBar";
import UsersList from "../UsersList";
const users = [
    { id: "787878", nickname: "zaseka.bogdan@yandex.com", isOnline: true, src: "https://picsum.photos/100/100" },
    { id: "78787we8", nickname: "zaseka.bogdan@yandex.com", isOnline: false, src: "https://picsum.photos/100/100" },
    { id: "7878ee78", nickname: "zaseka.bogdan@yandex.com", isOnline: true, src: "https://picsum.photos/100/100" }
];
const MAX_INPUT_HEIGHT = 40;

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.messagesBoxRef = React.createRef();
        this.state = { ...this.getInitialState(), isOpenUserList: false };
    }

    getInitialState = () => ({
        messagesHeight: 80,
        inputHeight: 10
    });

    handleKeyDownEnter = ev => {
        const textarea = ev.target;
        const heightPerCent = (textarea.scrollTop / textarea.scrollHeight) * 100;
        console.log(textarea.scrollTop);
        if (this.state.inputHeight > MAX_INPUT_HEIGHT) return;

        this.setState(prevState => ({
            inputHeight: prevState.inputHeight + heightPerCent,
            messagesHeight: prevState.messagesHeight - heightPerCent
        }));
    };

    handleShowUsers = () => {
        this.setState(prevState => ({
            isOpenUserList: !prevState.isOpenUserList
        }));
    };

    resetInputHeight = () => {
        this.setState(this.getInitialState());
    };

    render() {
        const messagesStyle = {
            height: `${this.state.messagesHeight}%`
        };

        const inputStyle = {
            height: `${this.state.inputHeight}%`
        };

        return (
            <div className="MessageBox" style={{ width: this.props.width }}>
                {this.state.isOpenUserList && (
                    <div className="MessageBox-usersList">
                        <UsersList users={users} />
                    </div>
                )}
                <div className="MessageBox-topBar">
                    <ChatTopBar onClick={this.handleShowUsers} />
                </div>
                <div style={messagesStyle}>
                    <MessagesList />
                </div>
                <div className="MessageBox-input" style={inputStyle}>
                    <MessageInput
                        resetInputHeight={this.resetInputHeight}
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

export default MessageBox;
