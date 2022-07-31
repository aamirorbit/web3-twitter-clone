import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { useSession } from 'next-auth/react'
import { useState, useRef } from 'react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { nftModalState, nftUrlState } from '../atom/modalAtom'
import { useMoralis } from "react-moralis";

export default function Input() {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const filePickerRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadingState, setUploadingState] = useState(false)
  const [nftState, setNftState] = useState(false)
  const [open, setOpen] = useRecoilState(nftModalState)
  const [nftUrl, setUrlNft] = useRecoilState(nftUrlState)
  const { authenticate, isAuthenticated } = useMoralis();

  const clearSelectedField = () => {
    setSelectedFile(null)
    setNftState(false)
  }

  const sendPost = async () => {
    setUploadingState(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      userId: session.user.id,
      text: input,
      userImg: session.user.image || session.user.altImage,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
      nft: nftState,
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      })
    }
    setInput('')
    setSelectedFile(null)
    setUploadingState(false)
    setNftState(false)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <>
      {session && (
        <div className="flex  border-b border-gray-200 p-3 space-x-3">
          <img
            src={session.user.image || session.user.altImage}
            alt="User image"
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div>
              <textarea
                className="p-2 w-full border-none focus:ring-0 text-lg tracking-wide min-h-[50px] text-gray-700"
                rows="3"
                placeholder="What is in your mind? share it to the world"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon
                  onClick={() => clearSelectedField}
                  className="w-5 m-2 border border-white text-white absolute cursor-pointer rounded-full bottom-0 right-0"
                />
                <img
                  src={selectedFile}
                  className={`w-full ${uploadingState ? 'animate-pulse' : ''}`}
                />
              </div>
            )}
            {!uploadingState && (
              <div className="flex items-center justify-between pt-2.5">
                <div className="flex">
                  <PhotographIcon
                    className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
                    onClick={() => filePickerRef.current.click()}
                  />
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  />
                  <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                </div>
                <FontAwesomeIcon
                  onClick={isAuthenticated ? (() => setOpen(!open)) : (() => authenticate())}
                  icon={faEthereum}
                  className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
                />
                <button
                  onClick={sendPost}
                  disabled={!input.trim()}
                  className="twitter-btn w-24 h-10 disabled:opacity-50"
                >
                  Tweet
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
