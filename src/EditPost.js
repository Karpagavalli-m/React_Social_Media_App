import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContext'

const EditPost = () =>
     {
        const {posts,handleEdit,editPostTitle,setEditPostTitle,editPostBody,setEditPostBody}=useContext(DataContext)
        const {id}=useParams()
        const post = posts.find(post=>
            (post.id).toString()===id)
        console.log(id)
        console.log(post)
    useEffect(()=>{
        if(post)
        {
            setEditPostTitle(post.title)
            setEditPostBody(post.body)
        }
    },[post,setEditPostTitle,setEditPostBody])
  return (
    <main className='EditPost'>
        {post && <>
      <form className='EditPostForm' onSubmit={(e)=>e.preventDefault()}>
      <label htmlFor='postTitle'>Title</label>
      <input id='postTiltle'
      type='text'
      required
      value={editPostTitle}
      onChange={(e)=>setEditPostTitle(e.target.value)} 
      />
      <label htmlFor='postBody'>Content</label>
      <textarea id='postBody'
      required
      value={editPostBody}
      onChange={(e)=>setEditPostBody(e.target.value)}
      />
      <button type='submit'
      onClick={()=>handleEdit(post.id)}>Submit</button>
     </form>
     </> }
     {!post && <>
        <h2>Post Not Found</h2>
        <p>Well, That's Disappointing</p>
        <p><Link to='/'> Visit our Homepage</Link></p>
      
        </>
     }
    </main>
  )
}

export default EditPost