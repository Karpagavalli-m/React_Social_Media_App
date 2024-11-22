import {  createContext } from "react";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import api from "../api/posts"
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({})

export const DataProvider = ({children}) =>
{
    const [posts, setPosts] = useState([])
    const [search,setSearch]=useState('')
    const [searchResults,setSearchResults]=useState([])
    const [postTitle,setPostTitle]=useState('')
    const [postBody,setPostBody]=useState('')
    const [editPostTitle,setEditPostTitle]=useState('')
    const [editPostBody,setEditPostBody]=useState('')
    const navigate=useNavigate()
    const {width} = useWindowSize()
    const {data,fetchError,isLoading} = useAxiosFetch("http://localhost:3500/posts")

    useEffect(()=>{
      setPosts(data)
    },[data])
  
    useEffect( ()=>
    {
     const filteredResults=posts.filter((post)=>
     (
        ((post.title).toLowerCase()).includes(search.toLowerCase())
        || 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
     ))
      setSearchResults(filteredResults.reverse())
    },[posts,search])
  
  async function handlesubmit(e)
  {
    e.preventDefault()
    const id=posts.length ? posts[posts.length-1].id+1:1
    const postDate= format(new Date(),'MMMM dd, yyyy pp')
    const newPostItem = {id,title:postTitle,datetime:postDate,body:postBody}
    try{
      const newPost=await api.post('/posts',newPostItem)
      const allPosts=[...posts,newPost.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    }catch(err)
    {
      console.log(err.message);
      
    }
  }
 const handleEdit = async (id) =>
 {
  id=id.toString()
  console.log(typeof id)
  const postDate= format(new Date(),'MMMM dd, yyyy pp')
  const EditPostItem = {id,title:editPostTitle,datetime:postDate,body:editPostBody}
  try{
    const response=await api.put(`/posts/${id}`,EditPostItem)
      setPosts(posts.map(post=>post.id===id?{...response.data}:post))
      setEditPostTitle('')
      setEditPostBody('')
      navigate('/')
  }catch(err)
  {
    console.log(err.message);
  }
 }

 const handleDelete = async (id) =>
  {
    try{
      await api.delete(`/posts/${id}`)
      const updatedPosts=posts.filter(post=>post.id!==id)
      setPosts(updatedPosts)
      navigate('/')
    }catch(err)
    {
      console.log(err.message);
    }
     
  }
    return (
        <DataContext.Provider value={{
            width,search,setSearch,searchResults,fetchError,isLoading,handlesubmit,postTitle,setPostTitle,postBody,setPostBody,posts,handleDelete,handleEdit,editPostTitle,setEditPostTitle,editPostBody,setEditPostBody
        }}>
            
            {children}
        </DataContext.Provider>
    )
}

export default DataContext