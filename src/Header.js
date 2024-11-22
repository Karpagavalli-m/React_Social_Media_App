import React, { useContext } from 'react'
import { FaLaptop,FaTabletScreenButton,FaMobileScreen } from "react-icons/fa6";
import DataContext from './context/DataContext';

const Header = ({title}) => {
   const {width} = useContext(DataContext)
  return (
    <header className='Header'>
        <h2>{title}</h2>
        {width< 768 ? <FaMobileScreen />:width< 992 ? <FaTabletScreenButton /> : <FaLaptop />}
    </header>
  )
}

export default Header