import { useRouter } from 'next/router'
import { useTypedSelector } from '../../../../app/hooks'
import Album from './Album'

const styles = {
  wrapper: ``,
  header: `m-5`,
  createAlbumContainer: `w-full my-3 rounded-full text-center py-2 bg-red-500 font-bold text-white`,
  createButton: `font-bold hover:border-b`,
  list: `flex items-center`,
  listItem: `border-b hover:border-blue-500 px-3 cursor-pointer`,
  albumsContainer: ``,
  noAlbumsText: `font-extralight text-center text-lg`,
  text: `font-semibold`,
}

const Albums = () => {
  const router = useRouter()

  const albums = useTypedSelector((store) => store.albumsReducer.albums)
  const profile = useTypedSelector((store) => store.profileReducer.profile)

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.createAlbumContainer}>
          <button
            onClick={() => router.push(`/album/create`)}
            className={styles.createButton}
          >
            Create an album
          </button>
        </div>

        <ul className={styles.list}>
          <li onClick={() => router.push(`/music`)} className={styles.listItem}>
            Songs
          </li>
          <li
            onClick={() => router.push(`/music/${profile.id}`)}
            className={styles.listItem}
          >
            My Songs
          </li>
          <li
            className={styles.listItem}
            onClick={() => router.push(`/albums`)}
          >
            Albums
          </li>
          <li
            className={styles.listItem}
            onClick={() => router.push(`/albums/${profile.id}`)}
          >
            My Albums
          </li>
        </ul>
      </header>
      <div className={styles.albumsContainer}>
        {albums.length === 0 ? (
          <h1 className={styles.noAlbumsText}>
            No Albums Created{' '}
            <span className={styles.text}>start creating some!</span>
          </h1>
        ) : (
          albums.map((album) => <Album key={album.id} album={album} />)
        )}
      </div>
    </div>
  )
}

export default Albums
