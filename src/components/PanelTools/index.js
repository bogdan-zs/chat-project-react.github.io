import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Icon from "../../assets/panel";
import DeleteIcon from "../../assets/delete";
import "./styles.css";
import ColorsPicker from "../ColorsPicker";
import LineWidth from "../LineWidth";

class Tools extends Component {
    getTools = () => {
        const { functions } = this.props;

        return (
            <div className={"Tools-icons"}>
                <DeleteIcon onClick={functions["delete"]} />
                <ColorsPicker canvasChanger={functions["color"]} />
                <LineWidth canvasChanger={functions["width"]} />
            </div>
        );
    };

    render() {
        return <div className="Tools">{this.getTools()}</div>;
    }
}

Tools.propTypes = {};

export default Tools;
