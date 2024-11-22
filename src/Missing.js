import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
    <h2>Missing ! Post Not Found</h2>
        <p>Well, That's Disappointing</p>
        <p><Link to='/'> Visit our Homepage</Link></p>
    </main>
  )
}

export default Missing