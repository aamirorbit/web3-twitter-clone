import { getProviders, signIn } from "next-auth/react";

export default function login({ providers }) {
  return (
    <div className="flex justify-center h-full content-center">
        {Object.values(providers).map((provider) => (
          <div className="flex flex-col items-center align-middle">
            <img
              className="w-36 object-cover"
              src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
              alt="twitter logo"
            />
            <p className="text-center text-sm italic my-10">
              Welcome to Web3 Twitter Application
            </p>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className="twitter-btn"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}