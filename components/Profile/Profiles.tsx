import { useRouter } from 'next/router'
import { IProfile } from '../../types/profile/IProfile'

interface IProp {
  profiles: IProfile[]
}

const styles = {
  wrapper: `flex flex-col space-y-4 m-5`,
  profileContainer: `flex items-center space-x-4 bg-slate-100 py-3 pl-2 rounded-xl`,
  avatar: `w-20 h-20 rounded-full object-cover`,
  profileInfoContainer: `flex flex-col`,
  buttonsContainer: `mt-2`,
  profileName: `hover:border-b cursor-pointer border-blue-600 text-blue-600 font-semibold text-lg`,
  profileStatus: `font-light`,
  writeMessageButton: `bg-blue-600/60 rounded-full px-3 py-1 text-white font-semibold text-sm`,
}

const Profiles = ({ profiles }: IProp) => {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      {profiles.map((profile) => (
        <div className={styles.profileContainer} key={profile.id}>
          <img
            className={styles.avatar}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.avatar}`}
          />
          <div className={styles.profileInfoContainer}>
            <h1
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/profile/${profile.id}`)
              }}
              className={styles.profileName}
            >
              {profile.name} {profile.secondName}
            </h1>
            <h2 className={styles.profileStatus}>{profile.status}</h2>
            <div className={styles.buttonsContainer}>
              <button
                onClick={() =>
                  router.push({
                    pathname: '/messanger',
                    query: {
                      receiverId: profile.id,
                    },
                  })
                }
                className={styles.writeMessageButton}
              >
                Write a message to {profile.name}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Profiles
