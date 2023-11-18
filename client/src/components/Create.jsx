import { useState } from 'react'
import './Create.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom'

const toolbar_options = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']                                         // remove formatting button
];

const Create = () => {
    const init_bloginfo = { 'title': '', 'summary': '', 'thumbnail': [] }
    const [bloginfo, setBloginfo] = useState(init_bloginfo)
    const [blogcontent, setBlogcontent] = useState({})
    const [redirect, setRedirect] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData()
        data.set('title', bloginfo.title)
        data.set('summary', bloginfo.summary)
        data.set('content', blogcontent)
        data.set('thumb', bloginfo.thumbnail)
        // console.log(data)
        const res = await axios.post('http://localhost:8080/create', data, { withCredentials: true })
            .then(res => {
                alert('Post Has been created')
                if (res.status === 200) {
                    setRedirect(true)
                }
            })
            .catch(err => alert('Something went wrong, Post not created'))
        setBloginfo(init_bloginfo)
        setBlogcontent('')
    }

    if (redirect) {
        return (
            <Navigate to={'/'} />
        )
    }

    return (
        <section className="create-form-wrapper py-3 px-4 d-flex flex-column justify-content-center align-items-center w-100">
            <h1>Create a New Blog.</h1>
            <form className='create-form d-flex flex-column ' autoComplete='off' onSubmit={handleSubmit}>
                <label htmlFor='title' className='mt-2 mb-0'>Title : </label>
                <input
                    className='my-2 px-3 py-2'
                    type="text"
                    name="title"
                    placeholder='Give a title to your Blog.'
                    value={bloginfo.title}
                    onChange={ev => setBloginfo({ ...bloginfo, 'title': ev.target.value })}
                />
                <label htmlFor="summary" className='mt-2 mb-0'>Short Summary :</label>
                <input
                    className='my-2 px-3 py-2'
                    type="text"
                    name="summary"
                    placeholder='Briefly describe your topic'
                    value={bloginfo.summary}
                    onChange={ev => setBloginfo({ ...bloginfo, 'summary': ev.target.value })}
                />
                <label htmlFor="thumb" className='mt-2 mb-0'>Upload a Thumbnail :</label>
                <input
                    className='my-2 px-3 py-2'
                    type="file"
                    name="thumb"
                    accept='image/'
                    onChange={ev => setBloginfo({ ...bloginfo, 'thumbnail': ev.target.files[0] })}
                />
                <label className='mt-2 mb-0'>Write your story :</label>
                <ReactQuill
                    value={blogcontent}
                    modules={
                        { toolbar: toolbar_options }
                    }
                    onChange={newval => setBlogcontent(newval)}
                />
                <button className='my-2 px-3 py-2'>Post</button>
            </form>
        </section>
    )
}

export default Create
