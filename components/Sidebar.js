import Image from 'next/image'
import SidebarMenuItem from './SidebarMenuItem'
import { HomeIcon } from '@heroicons/react/solid'
import { HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, ClipboardIcon, UserIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon } from '@heroicons/react/outline'

export default function Sidebar() {
  return (
    <div className='sm:flex flex-col p-2 items-center fixed h-full xl:ml-24'>
      {/* Twitter Logo */}
      <div className="hoverEffect xl:items-start">
        <Image width="50" height= "50" src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" />
      </div>

      {/* Menu */}
      <div className='mt-4 mb-2.5 xl:items-start'>
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="List" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      {/* Buttons */}
      <button className="twitter-btn">Tweet</button>

      {/* Mini profile */}
      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img src='https://i.ibb.co/RPy61W8/Untitled-design.jpg' alt='User Image' className="h-10 w-10 rounded-full xl:mr-2"/>
        <div className='leading-5 hidden xl:inline'>
          <h4 className='font-bold'>Hafiz Muhammad Aamir</h4>
          <p className='text-gray-500'>@aamirorbit</p>
        </div>
      </div>
    </div>
  )
}
