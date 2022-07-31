import {
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import Moment from 'react-moment'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { deleteObject, ref } from "firebase/storage";
import { modalState, postIdState } from '../atom/modalAtom'
import { useRouter } from 'next/router'

export default function Post({ post, id }) {
  const { data: session } = useSession()
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const [comments, setComments] = useState([])
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  const router = useRouter()

  async function deletePost() {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteDoc(doc(db, 'posts', id))
      if (post?.data()?.image) {
        deleteObject(ref(storage, `posts/${id}/image`))
      }
      router.push('/')
    }
  }

  async function redirectToPost() {
    router.push(`/posts/${id}`)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'comments'),
      (snapshot) => setComments(snapshot.docs),
    )
  }, [db])

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs),
    )
  }, [db])

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.id) !== -1)
  }, [likes])

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session.user.id))
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session.user.id), {
          username: session.user.username,
        })
      }
    } else {
      signIn()
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 flex">
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={post?.data()?.userImg}
        alt="user-img"
      />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post?.data()?.username} -{' '}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {post?.data()?.nft && <span className="text-gray-500">NFT</span>}
        </div>
        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
          {post?.data()?.text}
        </p>
        <img
          onClick={() => redirectToPost()}
          className={`${
            post?.data()?.nft && 'border-2 border-sky-500'
          } rounded-2xl max-w-full mr-2`}
          src={post?.data()?.image}
          alt=""
        />
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn()
                } else {
                  setPostId(post?.id)
                  setOpen(!open)
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )}
          </div>
          {session?.user.id === post?.data()?.userId && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && 'text-red-600'} text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}
