import { RiShareForwardLine } from 'react-icons/ri'
import { GrAdd } from 'react-icons/gr'
import { ImCancelCircle } from 'react-icons/im'

import { IAlbum } from '../../../../types/album/IAlbum'
import Song from '../../Music/Songs/Song'
import Player from '../Songs/Player'
import { useTypedSelector } from '../../../../app/hooks'
import CreateSongModal from '../../Modals/CreateSongModal'
import { useState } from 'react'

interface IProp {
  album: IAlbum
}

const styles = {
  picture: `w-fit h-60 object-contain`,
  header: `flex items-start border-b-2`,
  infoContainer: `py-4 pl-2 flex flex-col items-start justify-between`,
  name: 'text-lg font-bold',
  aimusic: `font-extralight font-extralight`,
  buttonsContainer: `flex mt-10 items-center justify-evenly w-80`,
  icon: `flex items-center space-x-2 hover:bg-gray-100 rounded-full cursor-pointer py-2 px-4`,
  text: `font-semibold text-[23px]`,
  addSongContainer: `w-full`,
  addSongButton: `w-full text-center bg-red-600 mt-2 text-white font-bold py-2 rounded-full hover:bg-red-700`,
  createContainer: `fixed top-0 w-80 transition-all duration-1000`,
  cancel: `absolute top-12 right-8 text-red-600 text-lg cursor-pointer`,
}

const AlbumScreen = ({ album }: IProp) => {
  const profile = useTypedSelector((store) => store.profileReducer.profile)

  const [isShowingModal, setIsShowingModal] = useState(false)

  return (
    <div>
      <header className={styles.header}>
        <img
          className={styles.picture}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${album.picture}`}
          alt=""
        />
        <div className={styles.infoContainer}>
          <h1 className={styles.name}>{album.name}</h1>
          <h3 className={styles.aimusic}>AI MUSIC</h3>
          <h4>{album.listens > 0 && album.listens}</h4>
          <div className={styles.buttonsContainer}>
            <div className={styles.icon}>
              <GrAdd fontSize={23} />
              <span className={styles.text}>Add</span>
            </div>
            <div className={styles.icon}>
              <RiShareForwardLine fontSize={23} />
              <span className={styles.text}>Share</span>
            </div>
          </div>
          {profile?.id === album.creatorId && (
            <div className={styles.addSongContainer}>
              <button
                className={styles.addSongButton}
                onClick={() => setIsShowingModal(!isShowingModal)}
              >
                Add Song
              </button>
              {isShowingModal && (
                <div className={styles.createContainer}>
                  <ImCancelCircle
                    onClick={() => setIsShowingModal(false)}
                    className={styles.cancel}
                  />
                  <CreateSongModal album={album} />
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <div>
        {album.songs.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </div>
      <Player />
    </div>
  )
}

export default AlbumScreen
