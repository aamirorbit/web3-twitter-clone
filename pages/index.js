import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import CommentModal from "../components/CommentModal";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Web3 Twitter Clone App</title>
        <meta name="description" content="A basic Web3 Twitter clone app using NextJS and firebase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex min-h-screen mx-auto'>
        <Sidebar/>
        <Feed/>
        <Widgets/>
        <CommentModal/>
      </main>
    </div>
  )
}
