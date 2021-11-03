import React, { useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from '@firebase/auth'
import { auth, provider } from '../firebase'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut } from '../features/user/userSlice'
import { Link, useHistory } from 'react-router-dom'

function Header() {
    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    const dispatchLoginUser = (user) => {
        dispatch(
            setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        )
        history.push('/')
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatchLoginUser(user)
            }
        })
    })

    const signIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user
            dispatchLoginUser(user)
        })
    }

    const signUserOut = () => {
        signOut(auth).then(() => {
            dispatch(setSignOut())
            history.push('/login')
        })
    }

    return (
        <Nav>
            <Logo src='/images/logo.svg' />
            {!userName ? (
                <LoginContainer>
                    <Login onClick={signIn}>Login</Login>
                </LoginContainer>
            ) : (
                <>
                    <NavMenu>
                        <StyledLink to={`/`}>
                            <img src='/images/home-icon.svg' alt='home' />
                            <span>HOME</span>
                        </StyledLink>
                        <StyledLink to={`/`}>
                            <img src='/images/search-icon.svg' alt='search' />
                            <span>SEARCH</span>
                        </StyledLink>
                        <StyledLink to={`/`}>
                            <img src='/images/watchlist-icon.svg' alt='watchlist' />
                            <span>WATCHLIST</span>
                        </StyledLink>
                        <StyledLink to={`/`}>
                            <img src='/images/original-icon.svg' alt='original' />
                            <span>ORIGINALS</span>
                        </StyledLink>
                        <StyledLink to={`/`}>
                            <img src='/images/movie-icon.svg' alt='movie' />
                            <span>MOVIES</span>
                        </StyledLink>
                        <StyledLink to={`/`}>
                            <img src='/images/series-icon.svg' alt='' />
                            <span>SERIES</span>
                        </StyledLink>
                    </NavMenu>
                    <ProfileMenuSection>
                        <ProfileInfo>
                            <span>{userName}</span>
                            <UserImg src={userPhoto} alt='profile image' />
                        </ProfileInfo>
                        <Dropdown id='dropdown'>
                            <Separator />
                            <AddProfileItem>
                                <AddIcon>+</AddIcon>
                                <span>Add Profile</span>
                            </AddProfileItem>
                            <DropdownItem>Edit Profiles</DropdownItem>
                            <DropdownItem>Account</DropdownItem>
                            <DropdownItem>Help</DropdownItem>
                            <DropdownItem onClick={signUserOut}>Log Out</DropdownItem>
                        </Dropdown>
                    </ProfileMenuSection>
                </>
            )}
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`

const Logo = styled.img`
    width: 80px;
`

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    color: #f9f9f9;
    text-decoration: none;

    img {
        height: 20px;
    }

    span {
        font-size: 13px;
        letter-spacing: 1.42px;
        position: relative;

        &:after {
            content: '';
            height: 2px;
            background: white;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -6px;
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform: scaleX(0);
        }
    }

    &:hover {
        span:after {
            transform: scaleX(1);
            opacity: 1;
        }
    }
`
const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
`
const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`
const Login = styled.button`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    color: #f9f9f9;
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const LoginContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`

const ProfileMenuSection = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 24px;

    background-color: #090b13;
    width: 300px;
    cursor: pointer;
    transition: background-color 250ms;
    z-index: 2;

    &:hover {
        border: 1px solid rgba(249, 249, 249, 0.2);
        border-radius: 2px;
        background-color: #222;
        z-index: 2;
        flex-direction: column;
        justify-content: start;

        #dropdown {
            max-height: 500px;
        }
    }
`

const ProfileInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;
    justify-content: end;
    color: rgb(249, 249, 249);
`

const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 0;
    transition: all 250ms;
    overflow: hidden;
`

const Separator = styled.hr`
    border-color: rgba(249, 249, 249, 0.1);
    width: 90%;
`

const DropdownItem = styled.a`
    width: 100%;
    height: 100%;
    opacity: 0.8;
    padding: 8px 12px;
    display: flex;
    align-items: center;

    &:hover {
        opacity: 1;

        button {
            background-color: #444;
        }
    }
`

const AddProfileItem = styled.a`
    width: 100%;
    height: 100%;
    opacity: 0.8;
    padding: 8px 12px;
    display: flex;
    align-items: center;

    &:hover {
        opacity: 1;

        button {
            background-color: #444;
        }

        span {
            opacity: 0.8;
        }
    }
`

const AddIcon = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: none;
    background-color: #333;
    cursor: pointer;
    font-size: 30px;
    color: white;
`
