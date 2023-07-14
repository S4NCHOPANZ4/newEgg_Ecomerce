import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data.jsx'
import styles from '../../styles/styles'



const Navbar = ({active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
        {
            navItems && navItems.map((i, index)=>{
                return (
                    <div className="flex" key={index}>
                        <Link to={i.url}
                        className={`${active === index + 1? "text-orange-400" : "text-black  800px:text-[#fff]"} font-[500] px-6 cursor-pointer pb-[20px] 800px:pb-[0]`}
                        >
                        {i.title}
                        </Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Navbar