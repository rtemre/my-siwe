import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Profile } from "@/components/Profile";
import { SignMessage } from "@/components/SignMessage";
import { ConnectWallet } from "@/components/ConnectWallet";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Unhandled Runtime Error
  // Error: Hydration failed because the initial UI does not match what was rendered on the server.
  // Warning: Expected server HTML to contain a matching <div> in <div>.
  // See more info here: https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  // To fix the react-hydration-error
  // Ensure that the component renders the same content server-side as it does during the initial client-side render to prevent a hydration mismatch.
  // You can intentionally render different content on the client with the useEffect hook.
  // During React hydration, useEffect is called.
  // This means browser APIs like window are available to use without hydration mismatches.
  return (
    isClient && (
      <div>
        <h2>Connect to wallet</h2>
        <ConnectWallet />
        <br />
        <hr />
        <h2>Sign Message</h2>
        <SignMessage />
        <br />
        <hr />
        <h2>SignInWithEhereum</h2>
        <Profile />
      </div>
    )
  );
}
