import { SparklesIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import CommentModal from '../../components/CommentModal'
import Sidebar from '../../components/Sidebar'
import Widgets from '../../components/Widgets'
import Post from '../../components/Post'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import Comment from '../../components/Comment'
import { db } from '../../firebase'

export default function PostPage() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])

  useEffect(
    () => onSnapshot(doc(db, 'posts', id), (snapshot) => setPost(snapshot)),
    [db, id],
  )

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc'),
      ),
      (snapshot) => setComments(snapshot.docs),
    )
  }, [db, id])
  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen mx-auto">
        <Sidebar />

        <div className="xl:ml-[370px] border-l border-r border-gray-200 sm:ml-[73px] flex-grow max-w-5xl">
          <div className="flex py-2 px-3 top-0 z-50 bg-white border-b border-gray-200">
            <h2
              onClick={() => router.push('/')}
              className="text-lg sm:text-xl font-bold cursor-pointer"
            >
              Home
            </h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
              <SparklesIcon className="h-5" />
            </div>
          </div>
          <Post id={id} post={post} />
          {comments.length > 0 && (
            <div className="">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  commentId={comment.id}
                  originalPostId={id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>
        <Widgets />
        <CommentModal />
      </main>
    </div>
  )
}
