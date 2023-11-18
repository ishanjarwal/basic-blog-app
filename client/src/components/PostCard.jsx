import React from 'react'
import './PostCard.css'
import facebook from '../assets/images/facebook.png'
import instagram from '../assets/images/instagram.png'
import twitter from '../assets/images/twitter.png'
import linkedin from '../assets/images/linkedin.png'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const PostCard = ({ id, title, summary, thumb, author, date }) => {
    return (
        <div className='post-card-cont p-2 d-flex flex-column justify-content-start'>
            <Link to={`/post/${id}`}>
                <img src={`http://localhost:8080/${thumb}`} className='post-thumb' />
            </Link>
            <div className='post-details pt-3'>
                <div className="post-details-1">
                    <a className='post-author-profile' href="/">
                        <img src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg" alt="" />
                    </a>
                    <a className='post-social-link' href="/">
                        <img src={facebook} alt="" />
                    </a>
                    <a className='post-social-link' href="/">
                        <img src={instagram} alt="" />
                    </a>
                    <a className='post-social-link' href="/">
                        <img src={twitter} alt="" />
                    </a>
                    <a className='post-social-link' href="/">
                        <img src={linkedin} alt="" />
                    </a>
                </div>
                <div className="post-details-2">
                    <p className='mb-1'>{author}</p>
                    <p className='mb-1'>{format(new Date(date), 'MMM dd, yyyy')}</p>
                    <Link to={`/post/${id}`}>
                        <h6>{title}</h6>
                        <p>{summary}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard
