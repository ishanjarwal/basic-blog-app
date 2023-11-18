import React, { useContext, useEffect, useState } from 'react'
import Logo from '../assets/images/logo.png'
import './Header.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

const Header = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)

    useEffect(() => {
        const res = axios.get('http://localhost:8080/profile', { withCredentials: true })
            .then(res => setUserInfo(res.data))
            .catch(err => console.log(err))
    }, [])

    async function logout() {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:8080/logout',
            withCredentials: true
        });
        setUserInfo(null)
    }

    const username = userInfo?.username

    return (
        <header className="header px-4 py-2 w-100 d-flex justify-content-md-evenly justify-content-between align-items-center">
            <Link to="/" className="logo">
                <img className='logo' src={Logo} alt="Brand Logo" />
            </Link>
            <nav className='nav-links-cont'>
                {username && (
                    <>
                        <Link className="mx-md-3 mx-xl-4 mx-1 text-decoration-none text-text-primary " to="/create">Create</Link>
                        <button className="mx-md-3 mx-xl-4 mx-1 text-decoration-none text-text-primary" onClick={logout}>Logout</button>
                    </>
                )}
                {!username && (
                    <>
                        <Link className="mx-md-3 mx-xl-4 mx-1 text-decoration-none text-text-primary " to="/login">Login</Link>
                        <Link className="mx-md-3 mx-xl-4 mx-1 text-decoration-none text-text-primary " to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header
