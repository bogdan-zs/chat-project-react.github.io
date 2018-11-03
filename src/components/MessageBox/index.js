import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from "../Message";
import './style.css'
import MessageInput from "../MessageInput";
import {connect} from 'react-redux'
import {messagesListSelector, fetchAllMessages, stateSelector} from '../../ducks/messages'
import Loader from '../Loader'

class MessageBox extends Component {
    constructor(props) {
        super(props)
        this.messagesBoxRef = React.createRef()
    }
    componentWillMount() {
        this.props.fetchAllMessages()
    }


    componentWillReceiveProps(nextProps) {
        if (!this.messagesBoxRef.current) return;
        const {scrollHeight, clientHeight} = this.messagesBoxRef.current
        this.messagesBoxRef.current.scrollTop = scrollHeight - clientHeight
    }


    render() {
        const {messages, loading} = this.props

        if (loading) return <div className='MessageBox'><Loader/></div>

        return (
            <div className='MessageBox'>
                <ul className='MessageBox-messagesList' ref={this.messagesBoxRef}>
                    {messages.map(message =>
                        <li key={message.uid} className='MessageBox-record'>
                            <Message user={this.props.user} message={message}/>
                        </li>)}
                </ul>
                <div className='MessageBox-input'><MessageInput user={this.props.user}/></div>
            </div>
        );
    }
}

MessageBox.propTypes = {
    messages: PropTypes.array
}

MessageBox.defaultProps = {
    messages: []
}

export default connect(state => ({
    user: state.user.user,
    messages: messagesListSelector(state),
    loading: stateSelector(state).loading
}), {fetchAllMessages})(MessageBox);
