import { useTypedSelector } from '../../app/hooks'
import { IProfile } from '../../types/profile/IProfile'
const randomImage = 'https://source.unsplash.com/1600x900/?nature,technology'

const styles = {
  wrapper: `flex flex-col`,
  randomImageContainer: ``,
  banner: `h-80 w-full object-cover `,
  avatar: `w-20 h-20 object-cover  mx-auto -mt-10 rounded-full`,
  name: `font-bold text-xl text-blue-600 text-center`,
  status: `font-extralight text-center text-black`,
}

interface IProp {
  showingProfile: IProfile
}

const UserProfile = ({ showingProfile }: IProp) => {
  const profile = useTypedSelector((store) => store.profileReducer.profile)

  return (
    <div className={styles.wrapper}>
      <div className={styles.randomImageContainer}>
        <img className={styles.banner} src={randomImage} alt="" />
        <img
          className={styles.avatar}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${showingProfile?.avatar}`}
          alt=""
        />
        <h1 className={styles.name}>
          {showingProfile.name} {showingProfile.secondName}
        </h1>
        <h2 className={styles.status}>{showingProfile.status}</h2>
      </div>
    </div>
  )
}

export default UserProfile
