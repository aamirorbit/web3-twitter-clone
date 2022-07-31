import { useSession, signIn } from 'next-auth/react'

export default function AuthBtn() {
  const {data: session} = useSession()
  return (
    <div className="w-full sticky top-0 bg-white py-1.5 z-50 mt-4">
      {session ? ( 
        <button className="twitter-btn w-full">Connect Wallet</button>
      ) : (
        <button onClick={signIn} className="twitter-btn w-full">Login</button>
      )}
    </div>
  )
}
