import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "../Message";
import "./style.css";
import MessageInput from "../MessageInput";
import MessagesList from "../MessagesList";

const MAX_INPUT_HEIGHT = 40;

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.messagesBoxRef = React.createRef();
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        messagesHeight: 90,
        inputHeight: 10
    });

    handleKeyDownEnter = ev => {
        const textarea = ev.target;
        const heightPerCent =
            (textarea.scrollTop / textarea.scrollHeight) * 100;
        console.log(textarea.scrollTop);
        if (this.state.inputHeight > MAX_INPUT_HEIGHT) return;

        this.setState(prevState => ({
            inputHeight: prevState.inputHeight + heightPerCent,
            messagesHeight: prevState.messagesHeight - heightPerCent
        }));
    };

    resetInputHeight = () => {
        this.setState(this.getInitialState());
    };
    // handleKeyDownEnter = reset => {
    //     if (reset) return this.setState(this.initialState());

    //     this.setState(state => {
    //         if (state.inputHeight > MAX_INPUT_HEIGHT)
    //             return {
    //                 inputHeight: state.inputHeight,
    //                 messagesHeight: state.messagesHeight
    //             };
    //         return {
    //             inputHeight: state.inputHeight + 2,
    //             messagesHeight: state.messagesHeight - 2
    //         };
    //     });
    // };

    render() {
        const messagesStyle = {
            height: `${this.state.messagesHeight}%`
        };

        const inputStyle = {
            height: `${this.state.inputHeight}%`
        };

        return (
            <div className="MessageBox" style={{ width: this.props.width }}>
                <div
                    style={messagesStyle}
                    className={"MessageBox-messagesList"}
                >
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
