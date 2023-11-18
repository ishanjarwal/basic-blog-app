import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


const Register = () => {

    const initData = {
        username: '',
        email: '',
        password: ''
    }
    const [data, setData] = useState(initData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:8080/register', data)
            .then((res) => {
                if (res.data.userExists) {
                    alert('You are already a user')
                } else {
                    alert('Registration Successful')
                }
            })
            .catch((err) => alert('Registration Unsuccessful. Something went wrong'))
        setData(initData)
    }
    return (
        <section className='login-wrapper w-100 py-4 px-2 d-flex justify-content-center align-items-center'>
            <div className='login-container'>
                <h2 className='mb-4'>Register</h2>
                <form className='login-form d-flex flex-column' autoComplete='off' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username</label>
                    <input className='my-2 px-3 py-2'
                        type="text"
                        name="username"
                        placeholder='eg : aryan_29'
                        value={data.username}
                        onChange={ev => setData({ ...data, username: ev.target.value })}
                    />
                    <label htmlFor='email'>E-mail</label>
                    <input
                        className='my-2 px-3 py-2'
                        type="email"
                        name="email"
                        placeholder='eg : aryan01@gmail.com'
                        value={data.email}
                        onChange={ev => setData({ ...data, email: ev.target.value })}
                    />
                    <label htmlFor="password">Create a Password</label>
                    <input
                        className='my-2 px-3 py-2'
                        type="password"
                        name="password"
                        placeholder='Create a Password'
                        value={data.password}
                        onChange={ev => setData({ ...data, password: ev.target.value })}
                    />
                    <button
                        className='my-2 px-3 py-2'>Register</button>
                </form>
                <p>Already have an Account ? <Link to='/login'>Login</Link></p>
            </div>
        </section>
    )
}

export default Register
