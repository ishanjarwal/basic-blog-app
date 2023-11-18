import React, { useContext } from 'react'
import './Login.css'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'

const Login = () => {

    const initData = {
        username: '',
        password: ''
    }
    const [data, setData] = useState(initData)
    const [redirect, setRedirect] = useState(false)
    const { setUserInfo } = useContext(UserContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8080/login', data, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    setUserInfo(res.data)
                    setRedirect(true);
                } else {
                    alert('Wrong credentials')
                }
            })
            .catch((err) => alert('Something went wrong'))
        setData(initData)
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <section className='login-wrapper w-100 py-4 px-2 d-flex justify-content-center align-items-center'>
            <div className='login-container'>
                <h2 className='mb-4'>Login</h2>
                <form className='login-form d-flex flex-column ' autoComplete='off' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username or E-mail</label>
                    <input
                        className='my-2 px-3 py-2'
                        type="text"
                        name="username"
                        value={data.username}
                        placeholder='eg : aryan_29'
                        onChange={ev => setData({ ...data, username: ev.target.value })}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        className='my-2 px-3 py-2'
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={data.password}
                        onChange={ev => setData({ ...data, password: ev.target.value })}
                    />
                    <button className='my-2 px-3 py-2'>Login</button>
                </form>
                <p>Dont have an Account ? <Link to='/register'>Register</Link></p>
            </div>
        </section>
    )
}

export default Login
