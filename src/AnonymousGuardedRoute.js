import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { selectIsLoggedIn } from './features/user/userSlice'

const AnonymousGuardedRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    return (
        <Route
            {...rest}
            render={(props) =>
                !isLoggedIn ? <Component {...props} /> : <Redirect to='/' />
            }
        />
    )
}

export default AnonymousGuardedRoute
