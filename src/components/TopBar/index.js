import React from 'react'
import {signOut} from '../../ducks/user'
import {connect} from 'react-redux'
import Button from '../UI/Button'
import Avatar from '../UI/Avatar'

import './style.css'

const TopBar = function ({signOut, user}) {

    const handleExit = () => {
        signOut()
    }

    return (
        <div className='TopBar'>
            <Avatar className='TopBar-avatar' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-I5E9Vn6dFsuJnrJfJVcpNp6KNQ74ZSjKoGn5t9-pGLddxDG'}/>
            <div>{user && user.email}</div>
            <div className='TopBar-button'>{user && <Button onClick={handleExit}>exit</Button>}</div>
        </div>
    )
}

export default connect(state => ({user: state.user.user}), { signOut })(TopBar)
