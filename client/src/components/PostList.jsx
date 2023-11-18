import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import './PostList.css'
import axios from 'axios'

const PostList = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const res = axios.get('http://localhost:8080/posts')
            .then(res => setPosts(res.data))
    }, [])
    return (
        <section className="posts-wrapper d-flex justify-content-center align-items-center w-100">
            <div className="posts-cont">
                {
                    posts.map((el, index) => {
                        return (
                            <PostCard
                                key={index}
                                id={el._id}
                                title={el.title}
                                summary={el.summary}
                                thumb={el.thumb}
                                author={el.author_id.username}
                                date={el.createdAt}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default PostList
