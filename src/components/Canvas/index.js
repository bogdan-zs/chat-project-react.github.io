import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.css'
import Panel from '../PanelTools'

class Canvas extends Component {
    state = {
        isDrawing: false
    }
    constructor(props) {
        super(props)

        this.refCanvas = React.createRef()
        this.refContainer = React.createRef()
    }

    startDraw = (ev) => {
        const canvas = this.refCanvas.current

        this.setState({isDrawing: true})
        this.draw.prevX = ev.clientX - canvas.offsetLeft
        this.draw.prevY = ev.clientY - canvas.offsetTop
        canvas.addEventListener('mousemove', this.draw)

        ev.preventDefault()
    }

    componentDidMount() {
        this.refCanvas.current.width = this.refContainer.current.offsetWidth
        this.refCanvas.current.height = this.refContainer.current.offsetHeight
    }

    endDraw = () => {
        const canvas = this.refCanvas.current

        this.setState({isDrawing: false})
        canvas.removeEventListener('mousemove', this.draw)
    }

    draw = (ev) => {
        const ctx = this.refCanvas.current.getContext('2d')
        const canvas = this.refCanvas.current

        this.ctx = ctx
        ctx.beginPath()
        ctx.moveTo(this.draw.prevX, this.draw.prevY)
        ctx.lineTo(ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop)
        ctx.stroke()
        ctx.closePath()
        this.draw.prevX = ev.clientX - canvas.offsetLeft
        this.draw.prevY = ev.clientY - canvas.offsetTop
    }

    panelOptions = () => {
        const ctx = this.ctx

        return {
            delete: () => {
                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, 10000, 10000)
            }
        }
    }

    render() {
        return (
            <div className='Canvas' ref={this.refContainer}>
                <Panel hidden={this.state.isDrawing} functions={this.panelOptions()}/>
                <canvas
                    onMouseDown={this.startDraw}
                    onMouseUp={this.endDraw}
                    ref={this.refCanvas}
                    />
            </div>
        );
    }
}

Canvas.propTypes = {};

export default Canvas;
