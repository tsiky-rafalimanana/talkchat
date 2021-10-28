import React, { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Message from "../../components/message/Message";
import ChatInput from "../../components/chat-input/ChatInput";
import { StoreActions } from "../../store/reducer";
import { Context } from "../../store/store";
import { ChannelService } from "../../services/ChannelService";
import { MessageService } from "../../services/MessageService";
import SocketIOService from "../../services/SocketIOService";

function Chat() {
  const { channelId } = useParams() as any;
  const [channelDetails, setChannelDetails] = useState<any>(null);
  const [channelMessages, setChannelMessages] = useState<any[]>([]);
  const [state, dispatch] = useContext<any>(Context);
  const messagesEndRef = useRef(null)
  

  
  useEffect(() => {
    dispatch({type: StoreActions.SET_CURRENT_CHANNEL_ID, payload: channelId})
    getChannel(channelId);
    SocketIOService.listenNewMsg((data: any) => {
      if (data.channelId === channelId) {
        getChannel(channelId);
      }
    })
  }, [channelId]);

  const getChannel = async (idChannel: string) => {
    const channelDetails = await ChannelService.getChannel(idChannel);
    setChannelDetails(channelDetails.data.data);
  }

  useEffect(() => {
    scrollToBottom();
  }, [channelDetails])
  
  const handleNewMsg = async (textMsg: string) => {
    const dataMsg = {
      text: textMsg,
      channel: state.currentChannelId
    }
    const newMsg = await MessageService.addNewMessage(dataMsg);
    SocketIOService.emitNewMessage({channelId: state.currentChannelId});
  }

  const scrollToBottom = () => {
    messagesEndRef.current && ((messagesEndRef.current) as any).scrollIntoView({ behavior: "smooth" });
  }

  return channelDetails && (
    
    <div className="chat">
      <div className="chat-header">
        <div className="chat-headerLeft">
          <h4 className="chat-channelName">
            <strong>#{channelDetails.name}</strong>
            <StarBorderOutlineIcon />
          </h4>
        </div>
        <div className="chat-headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      <div className="chat-messages">
        {channelDetails.messages.map(({ id, text, created_at, owner, avatar }: any) => (
          <Message
            message={text}
            timestamp={created_at}
            user={owner}
            avatar={avatar}
            key={id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* <ChatInput channelName={roomDetails?.name} channelId={roomId} /> */}
      <ChatInput onNewMessage={handleNewMsg} channelName={channelDetails.name} />
    </div>
  );
}

export default Chat;