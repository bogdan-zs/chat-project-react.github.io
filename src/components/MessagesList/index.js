import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "../Message";
import Loader from "../Loader";
import { connect } from "react-redux";
import {
    messagesListSelector,
    fetchAllMessages,
    stateSelector
} from "../../ducks/messages";
import {
    List,
    AutoSizer,
    CellMeasurerCache,
    CellMeasurer
} from "react-virtualized";

import "./style.css";

class MessagesList extends Component {
    static propTypes = {
        messages: PropTypes.array,
        messagesStyle: PropTypes.object
    };

    static defaultProps = {
        messages: [],
        messagesStyle: {}
    };

    constructor(props) {
        super(props);
        this._cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 110
        });
    }

    componentDidMount() {
        this.props.fetchAllMessages();
    }

    rowRenderer = ({ index, key, parent, style }) => {
        const message = this.props.messages[index];
        return (
            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={key}
                rowIndex={index}
                parent={parent}
            >
                <div
                    key={message.uid}
                    className="MessagesList-record"
                    style={style}
                >
                    <Message
                        user={this.props.user}
                        message={message}
                        nextNickname={
                            this.props.messages[index + 1] &&
                            this.props.messages[index + 1].nickname
                        }
                    />
                </div>
            </CellMeasurer>
        );
    };

    render() {
        const { messages, loading } = this.props;

        if (loading)
            return (
                <div className="MessagesList">
                    <Loader />
                </div>
            );

        // return (
        //     <ul
        //         className="MessagesList"
        //         ref={this.messagesBoxRef}
        //         style={messagesStyle}
        //     >
        //         {messages.map((message, index) => (
        //             <li key={message.uid} className="MessagesList-record">
        //                 <Message
        //                     user={this.props.user}
        //                     message={message}
        //                     nextNickname={
        //                         messages[index + 1] &&
        //                         messages[index + 1].nickname
        //                     }
        //                 />
        //             </li>
        //         ))}
        //     </ul>
        // );

        return (
            <AutoSizer>
                {({ width, height }) => (
                    <List
                        height={height}
                        rowCount={messages.length}
                        rowHeight={this._cache.rowHeight}
                        rowRenderer={this.rowRenderer}
                        width={width}
                        style={{ outline: 0 }}
                        scrollToIndex={messages.length - 1}
                    />
                )}
            </AutoSizer>
        );
    }
}

export default connect(
    state => ({
        user: state.user.user,
        messages: messagesListSelector(state),
        loading: stateSelector(state).loading
    }),
    { fetchAllMessages }
)(MessagesList);
