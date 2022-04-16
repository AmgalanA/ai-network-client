import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTypedSelector } from '../../../../app/hooks'
import { IChat } from '../../../../types/chat/IChat'
import { IProfile } from '../../../../types/profile/IProfile'

interface IProp {
  chat: IChat
}

const styles = {
  wrapper: `hover:bg-slate-100/40 cursor-pointer py-3 pl-3 flex items-center space-x-3`,
  avatar: `w-20 h-20 rounded-full object-cover`,
  chatContainer: ``,
}

const Chat = ({ chat }: IProp) => {
  const router = useRouter()

  const profile = useTypedSelector((store) => store.profileReducer.profile)

  const [receiver, setReceiver] = useState({} as IProfile)

  useEffect(() => {
    const getSender = async () => {
      if (profile) {
        const profileIds = [chat.firstProfileId, chat.secondProfileId]
        const receiverId = profileIds.filter((id) => id !== profile.id)[0]
        const response = await axios.post<IProfile>(`/api/profile/getById`, {
          id: receiverId,
        })
        setReceiver(response.data)
      }
    }

    getSender()
  }, [])
  return (
    <div
      onClick={() =>
        router.push({
          pathname: '/messanger',
          query: {
            receiverId: receiver.id,
          },
        })
      }
      className={styles.wrapper}
    >
      <img
        className={styles.avatar}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${receiver.avatar}`}
        alt="sender-avatar"
      />
      <div className={styles.chatContainer}>
        <h1>
          {receiver.name} {receiver.secondName}
        </h1>
        <h2>{chat?.messages?.[chat?.messages?.length - 1].text}</h2>
      </div>
    </div>
  )
}

export default Chat
