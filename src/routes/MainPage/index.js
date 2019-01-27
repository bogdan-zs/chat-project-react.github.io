import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../components/MessageBox';
import Canvas from '../../components/Canvas';
import './style.css';

class MainPage extends Component {
    state = this.getInitialState();

    getInitialState() {
        return {
            messagesWidth: 20.0,
            canvasWidth: 80.0
        };
    }

    handleResize = startX => ev => {
        const delta = (ev.clientX / window.innerWidth) * 100;
        this.setState(prevState => ({
            messagesWidth: delta,
            canvasWidth: 100 - delta
        }));
    };

    handleStartResize = ev => {
        ev.preventDefault();

        this.resizingFunc = this.handleResize(ev.clientX);
        document.addEventListener('mousemove', this.resizingFunc);
        document.addEventListener('mouseup', this.handleEndResizing);
    };

    handleEndResizing = ev => {
        document.removeEventListener('mousemove', this.resizingFunc);
        document.removeEventListener('mouseup', this.handleEndResizing);
    };

    render() {
        const { messagesWidth, canvasWidth } = this.state;
        return (
            <div className="MainPage">
                <MessageBox width={`${messagesWidth}%`} />
                <div className="MainPage-changerWidth" onMouseDown={this.handleStartResize} />
                <Canvas width={`${canvasWidth}%`} />
            </div>
        );
    }
}

MainPage.propTypes = {};

export default MainPage;
