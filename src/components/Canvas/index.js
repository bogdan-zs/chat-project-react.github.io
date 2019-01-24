import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Panel from "../PanelTools";
import { connect } from "react-redux";
import { sendPoint, deletePoints } from "../../ducks/points";
import { asyncEach } from "../../helpers";
import "paper/dist/paper-full";

class Canvas extends Component {
    state = {
        isDrawing: false,
        color: "black",
        lineWidth: 1
    };
    constructor(props) {
        super(props);

        this.refCanvas = React.createRef();
        this.refContainer = React.createRef();
    }

    startDraw = ev => {
        this.setState({ isDrawing: true });

        this.draw.prevX = ev.clientX - this.canvas.offsetLeft;
        this.draw.prevY = ev.clientY - this.canvas.offsetTop;

        this.drawPixel(this.draw.prevX, this.draw.prevY, this.draw.prevX - 1, this.draw.prevY - 1);
        this.canvas.addEventListener("mousemove", this.draw);

        ev.preventDefault();
    };

    componentWillReceiveProps(nextProps) {
        asyncEach(nextProps.points.toArray(), ({ x, y }, index, array) => {
            const prevElem = array[index - 1];

            if (!prevElem) this.drawPixel(x, y, x - 1, y - 1);
            else this.drawPixel(x, y, prevElem.x, prevElem.y);
        });

        //console.log(nextProps.points.toArray())
    }

    componentDidMount() {
        this.refCanvas.current.width = this.refContainer.current.offsetWidth;
        this.refCanvas.current.height = this.refContainer.current.offsetHeight;

        this.canvas = this.refCanvas.current;
        this.ctx = this.canvas.getContext("2d");
    }

    endDraw = () => {
        this.setState({ isDrawing: false });

        this.props.sendPoint(this.props.user.email, -1, -1); // end drawing
        this.canvas.removeEventListener("mousemove", this.draw);
    };

    drawPixel = (x, y, prevX, prevY) => {
        if (+prevX === -1 && +prevY === -1) {
            prevX = x - 1;
            prevY = y - 1;
        }
        if (+x === -1 && +y === -1) return;
        this.ctx.strokeStyle = this.state.color;
        this.ctx.lineWidth = this.state.lineWidth;

        this.ctx.lineJoin = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(prevX, prevY);
        this.ctx.lineTo(x, y);
        this.ctx.closePath();
        this.ctx.stroke();
    };

    draw = ev => {
        const x = ev.clientX - this.canvas.offsetLeft;
        const y = ev.clientY - this.canvas.offsetTop;
        const email = this.props.user.email;

        this.props.sendPoint(email, x, y);
        this.drawPixel(x, y, this.draw.prevX, this.draw.prevY);

        this.draw.prevX = x;
        this.draw.prevY = y;
    };

    panelOptions = () => {
        const ctx = this.ctx;
        const { deletePoints } = this.props;

        return {
            delete: () => {
                deletePoints();
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            },
            color: color => {
                this.setState({
                    color: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                });
            },
            width: lineWidth => {
                this.setState({ lineWidth });
            },
            save: () => {
                return this.canvas.toDataURL("image/png");
            }
        };
    };

    render() {
        return (
            <div className="Canvas" ref={this.refContainer} style={{ width: this.props.width }}>
                <Panel functions={this.panelOptions()} />
                <canvas onMouseDown={this.startDraw} onMouseUp={this.endDraw} ref={this.refCanvas} />
            </div>
        );
    }
}

Canvas.propTypes = {
    width: PropTypes.string.isRequired
};

export default connect(
    state => ({ user: state.user.user, points: state.points.points }),
    { sendPoint, deletePoints }
)(Canvas);
