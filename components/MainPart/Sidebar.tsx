import { useRouter } from 'next/router'
import { useTypedSelector } from '../../app/hooks'

const styles = {
  wrapper: `flex-[0.2] sticky top-0 h-screen overflow-y-auto`,
  menuItem: `cursor-pointer hover:border-b border-blue-500 px-3 bg-slate-100/50 py-2`,
}

const Sidebar = () => {
  const router = useRouter()

  const profile = useTypedSelector((store) => store.profileReducer.profile)

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={styles.menuItem} onClick={() => router.push('/')}>
          Main
        </li>
        <li
          className={styles.menuItem}
          onClick={() => router.push(`/profiles/${profile.id}`)}
        >
          Profiles
        </li>
        <li
          className={styles.menuItem}
          onClick={() =>
            router.push({
              pathname: '/chats',
              query: {
                id: profile.id,
              },
            })
          }
        >
          Messanger
        </li>
        <li
          className={styles.menuItem}
          onClick={() => router.push(`/groups/${profile.id}`)}
        >
          Groups
        </li>
        <li className={styles.menuItem} onClick={() => router.push(`/music`)}>
          Music
        </li>
        <li className={styles.menuItem}>Photos</li>
      </ul>
    </div>
  )
}

export default Sidebar
