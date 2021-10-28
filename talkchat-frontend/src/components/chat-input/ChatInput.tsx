import React from "react";
import { useState } from "react";
import "./ChatInput.css";


const ChatInput = ({ channelName, onNewMessage }: any) => {
  const [input, setInput] = useState("");
  // const [{ user }] = useStateValue();

  const sendMessage = (e: any) => {
    e.preventDefault();

    if (!input) return false;

    onNewMessage(input);
    setInput("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Send a message to #${channelName}`}
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;