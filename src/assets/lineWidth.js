import React from "react";
import cx from "classnames";
import "./style.css";

export default function({ className, ...rest }) {
    const tag = 'xlink:href="#a"';
    return (
        <svg
            {...rest}
            viewBox="0 0 24 24"
            className={cx("panel-svg", className)}
        >
            <defs>
                <path id="a" d="M0 0h24v24H0z" />
            </defs>
            <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
            </clipPath>
            <path
                fill="white"
                clip-path="url(#b)"
                d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"
            />
        </svg>
    );
}
