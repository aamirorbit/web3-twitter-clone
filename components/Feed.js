import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "Hafiz Muhammad Aamir",
      username: "AamirOrbit",
      userImg: "https://i.ibb.co/RPy61W8/Untitled-design.jpg",
      img: "https://source.unsplash.com/random",
      text: "Rondom Unsplash",
      timestamp: "2 hours ago",
      nft: "false",
    },
    {
      id: "2",
      name: "Hafiz Muhammad Aamir",
      username: "AamirOrbit",
      userImg: "https://i.ibb.co/RPy61W8/Untitled-design.jpg",
      img: "https://img.seadn.io/files/5178c28fdac04ff7dec109968cdca290.jpg",
      text: "ROAR",
      timestamp: "5 days ago",
      nft: "true"
    },
    {
      id: "3",
      name: "Hafiz Muhammad Aamir",
      username: "AamirOrbit",
      userImg: "https://i.ibb.co/RPy61W8/Untitled-design.jpg",
      img: "https://source.unsplash.com/random/?city",
      text: "Unsplash Random City Image",
      timestamp: "1 year ago",
      nft: "false"
    },
  ];
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 sm:ml-[73px] flex-grow max-w-4xl">
      <div className="flex py-2 px-3 top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5"/>
        </div>
      </div>
      <Input/>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}