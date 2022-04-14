import axios from 'axios'
import { GetServerSideProps } from 'next'
import { wrapper } from '../app/store'
import Header from '../components/MainPart/Header'
import Messanger from '../components/MainPart/Messanger/Messanger'
import Sidebar from '../components/MainPart/Sidebar'
import { IProfile } from '../types/profile/IProfile'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

interface IProp {
  receiver: IProfile
}

const messanger = ({ receiver }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <Messanger receiver={receiver} />
      </div>
    </div>
  )
}

export default messanger

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/get-by-id/${query.receiverId}`
    )

    return {
      props: {
        receiver: response.data,
      },
    }
  })
