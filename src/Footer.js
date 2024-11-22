import React from 'react'

const Footer = () => {
  const date = new Date()
  return (
    <footer className='Footer'>
         <h3>Copyright &copy; {date.getFullYear()}</h3>
    </footer>
  )
}

export default Footer