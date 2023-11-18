import React, { useEffect, useState } from 'react'
import './Post.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'

const Post = () => {

    const [postInfo, setPostInfo] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        const res = axios.get(`http://localhost:8080/post/${id}`)
            .then(res => setPostInfo(res.data))
    }, [])
    if (postInfo) {
        return (
            <section className='post-wrapper py-3 px-3 d-flex justify-content-center align-items-center w-100'>
                <div className="post-container py-4 px-5 d-flex flex-column justify-content-center align-items-center">
                    <div className="post-general-info mb-3 d-flex justify-content-start align-items-center w-100">
                        <img src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg" />
                        <div className='ms-2 d-flex flex-column align-items-start justify-content-center'>
                            <h5 className='mb-1'>{postInfo.author_id.username}</h5>
                            <h6 className='mb-0'>{format(new Date(postInfo.createdAt), 'MMM dd, yyyy')}</h6>
                        </div>
                    </div>
                    <h1>{postInfo.title}</h1>
                    <p>{postInfo.summary}</p>
                    <img src={`http://localhost:8080/${postInfo.thumb}`} className='banner' />
                    <div className='post-content w-100 mt-3' dangerouslySetInnerHTML={{ __html: postInfo.content }}>
                    </div>
                </div>
            </section>
        )
    }
}

export default Post
