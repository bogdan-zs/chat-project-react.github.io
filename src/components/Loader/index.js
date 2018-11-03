import React from 'react'
import './style.css'

export default function (props) {
    return (
        <div className='Loader-wrapper'>
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
