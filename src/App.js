import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import AnonymousGuardedRoute from './AnonymousGuardedRoute'
import './App.css'
import Detail from './components/Detail'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import GuardedRoute from './GuardedRoute'

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Switch>
                    <AnonymousGuardedRoute path='/login' component={Login} />
                    <GuardedRoute path='/detail/:id' component={Detail} />
                    <GuardedRoute path='/' component={Home} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
