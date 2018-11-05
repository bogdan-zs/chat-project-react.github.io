import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../../assets/panel'
import DeleteIcon from '../../assets/delete'
import './styles.css'

class Tools extends Component {
    state = {
        isOpen: false
    }

    handleOpen = () => {
        this.setState({isOpen: true})
    }

    handleClose = (ev) => {
        this.setState({isOpen: false})
    }
    render() {
        const {hidden, functions} = this.props
        const {isOpen} = this.state

        if (hidden) return null

        return (
            <div className='Tools'
                 onMouseEnter={this.handleOpen}
                 onMouseLeave={this.handleClose}>
                {!isOpen && <Icon className='Tools-icon'/>}
                {isOpen && <DeleteIcon onClick={functions['delete']}/>}
            </div>
        );
    }
}

Tools.propTypes = {};

export default Tools;
