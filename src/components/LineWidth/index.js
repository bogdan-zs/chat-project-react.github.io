import React, { Component } from "react";
import PropTypes from "prop-types";
import LineWidthIcon from "../../assets/lineWidth";
import Slider, { createSliderWithTooltip } from "rc-slider";

import "rc-slider/assets/index.css";
import "./style.css";

const SliderWithTooltip = createSliderWithTooltip(Slider);

function percentFormatter(v) {
    return `${v} px`;
}

class LineWidth extends Component {
    state = {
        isOpen: false,
        value: 1
    };

    handleChange = value => {
        this.setState({ value });
        this.props.canvasChanger(value);
    };

    handleClickOutSlider = ev => {
        const clickedElement = document.elementFromPoint(
            ev.clientX,
            ev.clientY
        );

        if (!this.node.contains(clickedElement)) {
            this.setState({ isOpen: false }, () =>
                document.removeEventListener("click", this.handleClickOutSlider)
            );
        }
    };

    handleClose = node => {
        this.node = node;
        document.addEventListener("click", this.handleClickOutSlider);
    };

    openSlider = () => {
        this.setState(prevState => ({
            isOpen: true
        }));
    };

    getSlider = () => {
        return (
            <div className="SliderWithTooltip-wrapper" ref={this.handleClose}>
                <SliderWithTooltip
                    value={this.state.value}
                    min={1}
                    tipFormatter={percentFormatter}
                    onChange={this.handleChange}
                />
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.state.isOpen && this.getSlider()}
                <LineWidthIcon onClick={this.openSlider} />
            </div>
        );
    }
}

LineWidth.propTypes = {};

export default LineWidth;
