import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Timeago from 'timeago-react'
import { useTypedSelector } from '../../../../app/hooks'

import { IMessage } from '../../../../types/message/IMessage'
import { IProfile } from '../../../../types/profile/IProfile'

const styles = {
  youWrapper: `flex rounded-lg items-start space-x-2 bg-pink-600/80 py-3 pl-2 w-[60%] lg:w-[30%] ml-auto`,
  wrapper: `flex rounded-lg items-start space-x-2 bg-blue-700/70 py-3 pl-2 w-[60%] lg:w-[30%] mr-auto`,
  avatar: `w-12 h-12 rounded-full object-cover`,
  messageContainer: `flex flex-col`,
  senderName: `cursor-pointer font-semibold text-white`,
  text: `text-[18px] mt-2 text-white`,
  senderContainer: `flex flex-1 justify-between pr-2 items-start space-x-2`,
  sentAt: `text-xs text-white wordspace-nowrap font-extralight mt-[6px]`,
}

interface IProp {
  message: IMessage
}

const Message = ({ message }: IProp) => {
  const router = useRouter()

  const [sender, setSender] = useState<IProfile>({} as IProfile)

  const profile = useTypedSelector((store) => store.profileReducer.profile)
  useEffect(() => {
    const getSender = async () => {
      const response = await axios.post(`/api/profile/getById`, {
        id: message.senderId,
      })
      setSender(response.data)
    }
    getSender()
  }, [])

  if (!sender || !profile) return <div>Loading</div>

  return (
    <div
      className={sender.id === profile.id ? styles.youWrapper : styles.wrapper}
    >
      <img
        className={styles.avatar}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/${sender?.avatar}`}
        alt="avatar"
      />
      <div className={styles.messageContainer}>
        <div className={styles.senderContainer}>
          <h1
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/profile/${sender.id}`)
            }}
            className={styles.senderName}
          >
            {sender?.name} {sender?.secondName}
          </h1>
          <Timeago className={styles.sentAt} datetime={message.sentAt} />
        </div>

        <span className={styles.text}>{message.text}</span>
      </div>
    </div>
  )
}

export default Message
