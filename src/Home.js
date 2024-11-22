import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchResults,fetchError,isLoading} = useContext(DataContext)
  return (
    <main className='Home'>
      {isLoading && <p className='loading'> Your data is Loading....</p>}
      {!isLoading && fetchError && <p className='fetchError'>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResults.length ?(
    <Feed posts={searchResults} />
      ) : (
        <p style={{marginTop:"2rem"}}>No Posts to Display</p>
      ))}
    </main>
  )
}

export default Home