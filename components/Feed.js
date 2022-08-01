import { MenuIcon } from '@heroicons/react/outline'
import Input from './Input'
import Post from './Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Feed(display) {
  const [posts, setPosts] = useState([])
  const router = useRouter()

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        },
      ),
    [],
  )

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 sm:ml-[73px] flex-grow max-w-5xl">
      <div className="flex py-2 px-3 top-0 z-50 bg-white border-b border-gray-200">
        <h2
          onClick={() => router.push('/')}
          className="text-lg sm:text-xl font-bold cursor-pointer"
        >
          Home
        </h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <MenuIcon className="h-5" onClick={()=> display.setSidebarDisplay(!display.sidebarDisplay)} />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Post key={post.id} id={post.id} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
