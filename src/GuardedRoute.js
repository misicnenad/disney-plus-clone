import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { selectIsLoggedIn } from './features/user/userSlice'

const GuardedRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
            }
        />
    )
}

export default GuardedRoute
