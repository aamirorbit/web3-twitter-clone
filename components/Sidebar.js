import Image from 'next/image'
import SidebarMenuItem from './SidebarMenuItem'
import { HomeIcon } from '@heroicons/react/solid'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import fetchNftMetadata from '../service/fetchNftMetadata';
import AuthBtn from './AuthBtn'

export default function Sidebar(display) {
  const { data: session } = useSession()
  return (
    <div className={`xl:flex bg-white flex flex-col p-2 items-center fixed h-full xl:ml-24 ${display.sidebarDisplay ? 'hidden' : ''}`}>
      {/* Twitter Logo */}
      <div className="xl:items-start">
        <Image
          onClick={()=> fetchNftMetadata("0xEd2c91c774cCCa85Cc219a012Fb1DD7C473ED847")}
          width="50"
          height="50"
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        />
      </div>

      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem
          onClick={() => router.push('/')}
          text="Home"
          Icon={HomeIcon}
          active
        />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {session ? (
          <>
            <SidebarMenuItem text="Notifications" Icon={BellIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItem text="List" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        ) : (
          <AuthBtn/>
        )}
      </div>

      {/* Buttons */}
      {session && (
        <>
          <button onClick={signOut} className="twitter-btn">
            Sign Out
          </button>
          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <img
              src={session.user.image || session.user.altImage}
              alt="User Image"
              className="h-10 w-10 rounded-full mr-2"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session.user.name}</h4>
              <p className="text-gray-500">@{session.user.username}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
