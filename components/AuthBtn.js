import { useSession, signIn } from 'next-auth/react'

export default function AuthBtn() {
  const {data: session} = useSession()
  return (
    <div className="sticky top-0 bg-white mt-4">
      {session ? ( 
        <button className="twitter-btn">Connect Wallet</button>
      ) : (
        <button onClick={signIn} className="twitter-btn">Login</button>
      )}
    </div>
  )
}
