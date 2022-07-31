import { useSession, signIn } from "next-auth/react";
import { useMoralis } from "react-moralis";

export default function AuthBtn() {
  const { data: session } = useSession();
  const { logout, authenticate, isAuthenticated } = useMoralis();
  return (
    <div className="sticky top-0 bg-white mt-4">
      {session
        ? <div>
            {!isAuthenticated
              ? <button className="twitter-btn" onClick={() => authenticate()}>
                  Connect wallet
                </button>
              : <button className="twitter-btn" onClick={() => logout()}>
                  Diconnect Wallet
                </button>}
          </div>
        : <button onClick={signIn} className="twitter-btn">
            Login
          </button>}
    </div>
  );
}
