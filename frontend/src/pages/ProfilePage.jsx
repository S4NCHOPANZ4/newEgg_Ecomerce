import React, { useState } from 'react'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import styles from '../styles/styles'
import ProfileSideBar from '../components/Profile/ProfileSideBar'
import ProfileContent from '../components/Profile/ProfileContent'

const ProfilePage = () => {

    const [active, setActive] = useState(1)

  return (
    <div>
        <Header />
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
                <ProfileSideBar active={active} setActive={setActive}/>
            </div>
            <ProfileContent active={active} />

        </div>
        <Footer/>
    </div>
  )
}

export default ProfilePage