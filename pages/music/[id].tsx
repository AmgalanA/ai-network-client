import React from 'react'
import Header from '../../components/MainPart/Header'
import MySongs from '../../components/MainPart/Music/Songs/MySongs'
import Sidebar from '../../components/MainPart/Sidebar'
const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}
const music = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <MySongs />
      </div>
    </div>
  )
}

export default music
