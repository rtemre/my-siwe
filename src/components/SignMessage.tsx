import * as React from "react";
import { useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";

export function SignMessage() {
  //   const recoveredAddress = React.useRef<string>();
  const [recoveredAddress, setRecoveredAddress] = React.useState("");
  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
    variables,
  } = useSignMessage();

  React.useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        });
        setRecoveredAddress(recoveredAddress);
      }
    })();
  }, [signMessageData, variables?.message]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event?.currentTarget);
        const message = formData.get("message");
        if (message !== null) signMessage({ message: message.toString() });
      }}
    >
      <label htmlFor="message">Enter a message to sign</label>
      <br />
      <textarea
        id="message"
        name="message"
        placeholder="The quick brown fox…"
      />
      <br />
      <button disabled={isLoading}>
        {isLoading ? "Check Wallet" : "Sign Message"}
      </button>
      <br />
      {signMessageData && (
        <div>
          <div>Recovered Address: {recoveredAddress}</div>
          <div>Signature: {signMessageData}</div>
        </div>
      )}

      {error && <div>{error.message}</div>}
    </form>
  );
}
