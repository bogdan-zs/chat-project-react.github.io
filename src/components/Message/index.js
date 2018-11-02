import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.css'

class Message extends Component {
    render() {
        const {message} = this.props
        const {avatar, nickname, date, text} = message
        return (
            <div className='Message'>
                <div className='Message-avatar'>
                    <img src={avatar} alt={nickname} className={'Message-avatar-img'}/>
                </div>
                <div className={'Message-text'}>
                    <div className={'Message-nickname'}>{nickname}</div>
                    <div>{text}</div>
                    <div className={'Message-date'}>{date}</div>
                </div>
            </div>
        );
    }
}

Message.propTypes = {
    message: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })
};

export default Message;
