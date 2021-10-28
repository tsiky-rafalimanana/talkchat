import React from "react";
import "./Message.css";
import tempAvatar from '../../assets/img/avatar-msg.png'

interface MessageProps {
  message: string;
  timestamp: Date;
  user: any;
  avatar?: string;
}

const Message = ({ message, timestamp, user, avatar } : MessageProps) => {
  return (
    <div className="message">
      <img src={tempAvatar} alt="" />
      <div className="message-info">
        <h4>
          {user.lastname} {user.firstname}
          <span className="message-timestamp">
            {new Date(timestamp).toLocaleString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;