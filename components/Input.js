import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons';

export default function Input() {
  return (
    <div className="flex  border-b border-gray-200 p-3 space-x-3">
      <img
        src="https://i.ibb.co/RPy61W8/Untitled-design.jpg"
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea className="p-2 w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700" rows="3" placeholder="What's happening?"></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
            <div className="flex">
                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                <FontAwesomeIcon icon={faEthereum} className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
            </div>
            <button className="twitter-btn w-24 h-10 disabled:opacity-50">Tweet</button>
        </div>
      </div>
    </div>
  );
}