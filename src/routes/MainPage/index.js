import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import MessageBox from "../../components/MessageBox";
import Canvas from "../../components/Canvas";
import './style.css'

class MainPage extends Component {
    render() {
        return (
            <div className='MainPage'>
                <MessageBox/>
                <Canvas/>
            </div>
        );
    }
}

MainPage.propTypes = {};

export default MainPage;
