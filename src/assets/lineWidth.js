import React from 'react'

export default function ({...rest}) {
    return (
        <svg {...rest} style={{width:45, height: 45, cursor: 'pointer'}} >
            <path fill='white' d="M6 34h36v-4H6v4zm0 6h36v-2H6v2zm0-14h36v-6H6v6zM6 8v8h36V8H6z"/>
        </svg>
    )
}


