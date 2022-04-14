import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { BiSend } from 'react-icons/bi'

import { IProfile } from '../../../types/profile/IProfile'
import axios from 'axios'
import { useTypedSelector } from '../../../app/hooks'
import { IChat } from '../../../types/chat/IChat'
import { IMessage } from '../../../types/message/IMessage'
import Message from './Messages/Message'
import { useRouter } from 'next/router'

interface IProp {
  receiver: IProfile
}

const styles = {
  wrapper: ``,
  header: `flex sticky top-12 bg-slate-100 py-3 justify-between px-10 items-center`,
  back: `cursor-pointer hover:scale-105 transition-all duration-600`,
  icon: ``,
  receiverName: `font-semibold`,
  avatar: `w-16 h-16 rounded-full object-cover`,
  chatContainer: ` pt-4 px-5 h-screen bg-gray-50`,
  formContainer: `fixed bottom-10 flex mt-5 rounded-full w-full items-center border-2 p-3`,
  input: `flex flex-1 outline-none font-bold placeholder:font-light bg-transparent`,
  button: `hover:bg-gray-300/40 p-1 rounded-full`,
  messagesContainer: `overflow-y-auto flex flex-col space-y-4`,
}

const Messanger = ({ receiver }: IProp) => {
  const router = useRouter()

  const [text, setText] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<IMessage[]>([])

  const profile = useTypedSelector((store) => store.profileReducer.profile)
  useEffect(() => {
    const getMessages = async () => {
      if (profile) {
        const payload = {
          firstProfileId: profile.id,
          secondProfileId: receiver.id,
        }
        const response = await axios
          .post(`/api/messanger/getMessages`, payload)
          .then((res) => {
            if (res.data.messages) {
              setMessages(res.data.messages)
            }
          })
      }
    }
    getMessages()
  }, [profile])

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text || loading || !profile) return

    setLoading(true)

    const response = await axios.post(`/api/messanger/createChat`, {
      firstProfileId: profile.id,
      secondProfileId: receiver.id,
    })

    const payload = { text, senderId: profile.id, chatId: response.data }

    const message = await axios
      .post(`/api/messanger/sendMessage`, payload)
      .then((res) => {
        if (messages) {
          setMessages([...messages, res.data])
        } else {
          setMessages([res.data])
        }
        setText('')
        setLoading(false)
      })
    setLoading(false)
  }
  if (!messages) return <div>Loading</div>

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div
          onClick={() => router.back()}
          className={styles.back}
          style={{ fontSize: '30px' }}
        >
          <IoMdArrowBack />
        </div>

        <h1 className={styles.receiverName}>
          {receiver.name} {receiver.secondName}
        </h1>
        <img
          className={styles.avatar}
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${receiver.avatar}`}
          alt="receiver-avatar"
        />
      </header>
      <div className={styles.chatContainer}>
        {/* Messages goes here... */}
        <div className={styles.messagesContainer}>
          {messages && messages.map((message) => <Message message={message} />)}
        </div>
        <form onSubmit={sendMessage} className={styles.formContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            style={{ fontSize: '28px' }}
            className={styles.button}
            type="submit"
          >
            <BiSend />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Messanger
