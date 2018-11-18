import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ColorIcon from '../../assets/colors'
import {SketchPicker} from 'react-color'
import Modal from 'react-modal'

import './style.css'

class ColorsPicker extends Component {
    state = {
        color: '#fff'
    }

    handleClick = () => {
        this.setState({isOpen: true})
    }

    handleClose = () => {
        this.setState({isOpen: false})
    }

    onColorChange = color => {
        this.setState({color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`})
        this.props.canvasChanger(color)
    }

    getPicker = () => {

        return (
            <Modal
                isOpen={this.state.isOpen}
                onRequestClose={this.handleClose}
                className={'Picker-card'}
                overlayClassName={'Picker-wrapper'}
                ariaHideApp={false}
            >
                <SketchPicker color={this.state.color} onChangeComplete={this.onColorChange}/>
            </Modal>
        )
    }

    render() {
        return (
            <div>
                <ColorIcon onClick={this.handleClick}/>
                {this.getPicker()}
            </div>
        );
    }
}

ColorsPicker.propTypes = {};

export default ColorsPicker;
