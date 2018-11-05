import React from 'react'
import cx from 'classnames'
import './style.css'

export default function ({text, children, className, ...rest}) {
    return (
        <div {...rest} className={cx('button',className)}>
            {children}
        </div>)
}
