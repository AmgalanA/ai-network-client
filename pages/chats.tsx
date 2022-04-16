import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import { wrapper } from '../app/store'
import Header from '../components/MainPart/Header'
import Chats from '../components/MainPart/Messanger/Chats/Chats'
import Sidebar from '../components/MainPart/Sidebar'
import { IChat } from '../types/chat/IChat'
import { IProfile } from '../types/profile/IProfile'

const styles = {
  wrapper: `w-full flex`,
  contentContainer: `flex flex-[0.8] flex-col`,
}

interface IProp {
  chats: IChat[]
}

const chats = ({ chats }: IProp) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <Header />
        <Chats chats={chats} />
      </div>
    </div>
  )
}

export default chats

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const response = await axios.get<IProfile>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/get-by-id/${query.id}`
    )
    if (response.data) {
      const chatsResponse = await axios.get<IChat[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chat/get-chats/${response.data.id}`
      )

      return {
        props: {
          chats: chatsResponse.data,
        },
      }
    }
    return {
      props: {
        chats: [],
      },
    }
  })
