import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
  const {handlesubmit,postTitle,setPostTitle,postBody,setPostBody}=useContext(DataContext)
  return (
    <main className='NewPost'>
     <form className='newPostForm' onSubmit={handlesubmit}>
      <label htmlFor='postTitle'>Title</label>
      <input id='postTiltle'
      type='text'
      required
      value={postTitle}
      onChange={(e)=>setPostTitle(e.target.value)} 
      />
      <label htmlFor='postBody'>Content</label>
      <textarea id='postBody'
      required
      value={postBody}
      onChange={(e)=>setPostBody(e.target.value)}
      />
      <button type='submit'>Submit</button>

     </form>
    </main>
  )
}

export default NewPost