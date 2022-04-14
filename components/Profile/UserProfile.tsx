import { useTypedSelector } from '../../app/hooks'
import { IProfile } from '../../types/profile/IProfile'
const randomImage = 'https://source.unsplash.com/1600x900/?nature,technology'

const styles = {
  wrapper: `flex flex-col`,
  randomImageContainer: ``,
  banner: `h-80 w-full object-cover `,
  avatar: `w-20 h-20 object-cover  mx-auto -mt-10 rounded-full`,
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
      </div>
    </div>
  )
}

export default UserProfile
