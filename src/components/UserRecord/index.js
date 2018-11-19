import React from "react";
import PropTypes from "prop-types";
import Avatar from "../UI/Avatar";
import cx from "classnames";
import "./style.css";

function UserRecord({ user }) {
    const { src, nickname, isOnline } = user;
    const statusClassName = isOnline ? "UserRecord-status_is-online" : "UserRecord-status_is-offline";

    return (
        <div className="UserRecord">
            <Avatar src={src} alt={nickname} className="UserRecord-avatar" />
            <div className="UserRecord-text">
                <div className="UserRecord-text_nickname">{nickname}</div>
                <div className={cx("UserRecord-status", statusClassName)} />
            </div>
        </div>
    );
}

UserRecord.propTypes = {};

export default UserRecord;
