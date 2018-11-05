import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import toMaterialStyle from 'material-color-hash'
import './style.css'

class Message extends Component {
    render() {
        const {message, user} = this.props
        const {avatar, nickname, date, text} = message
        const email = user && user.email
        const ownClassName = nickname === email ? 'Message-text_own' : null

        const materialStyle= toMaterialStyle(nickname || '', '400')
        const {backgroundColor} = materialStyle
        const nickStyle = {color: backgroundColor, opacity: 0.9}
        // console.log(nickColor)
        return (
            <div className='Message'>
                <div className='Message-avatar'>
                    <img src={avatar} alt={nickname} className={'Message-avatar-img'}/>
                </div>
                <div className={classNames('Message-text', ownClassName)}>
                    <div className={'Message-nickname'} style={nickStyle}>{nickname}</div>
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
