import React from "react";
import cx from "classnames";

import "./style.css";

export default function({ src, alt, className, classNameImg, ...rest }) {
    return (
        <div className={cx("Avatar", className)} {...rest}>
            <img src={src} alt={alt} className={cx("Avatar-img", classNameImg)} />
        </div>
    );
}
