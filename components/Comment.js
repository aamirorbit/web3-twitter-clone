import {
  ChatIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import Moment from 'react-moment'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'
import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../atom/modalAtom'

export default function Comment({ comment, commentId, originalPostId }) {
  const { data: session } = useSession()
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const [open, setOpen] = useRecoilState(modalState)
  const [postId, setPostId] = useRecoilState(postIdState)
  useEffect(() => {
    onSnapshot(
      collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'),
      (snapshot) => setLikes(snapshot.docs),
    )
  }, [db, originalPostId, commentId])

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
  }, [likes])

  async function deleteComment() {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId))
    }
  }

  return (
    <div className="flex cursor-pointer border-b border-gray-200 pl-20">
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={comment?.userImg}
        alt="user-img"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {comment?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{comment?.username} -{' '}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
        </div>
        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
          {comment?.comment}
        </p>
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn()
                } else {
                  setPostId(originalPostId)
                  setOpen(!open)
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
          </div>
          {session?.user.uid === comment?.userId && (
            <TrashIcon
              onClick={deleteComment}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
        </div>
      </div>
    </div>
  )
}
