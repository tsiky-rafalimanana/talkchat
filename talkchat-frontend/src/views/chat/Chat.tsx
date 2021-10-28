import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderOutlineIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Message from "../../components/message/Message";
import ChatInput from "../../components/chat-input/ChatInput";
import { StoreActions } from "../../store/reducer";
import { Context } from "../../store/store";
import { ChannelService } from "../../services/ChannelService";

function Chat() {
  const { channelId } = useParams() as any;
  const [channelDetails, setChannelDetails] = useState<any>(null);
  const [channelMessages, setChannelMessages] = useState<any[]>([]);
  const [state, dispatch] = useContext<any>(Context);

  useEffect(() => {
    dispatch({type: StoreActions.SET_CURRENT_CHANNEL_ID, payload: channelId})
    // if (roomId) {
    //   db.collection("rooms")
    //     .doc(roomId)
    //     .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    // }

    // db.collection("rooms")
    //   .doc(roomId)
    //   .collection("messages")
    //   .orderBy("timestamp", "asc")
    //   .onSnapshot((snapshot) =>
    //     setRoomMessages(snapshot.docs.map((doc) => doc.data()))
    //   );
    getChannel(channelId);
  }, [channelId]);
  const getChannel = async (idChannel: string) => {
    const channelDetails = await ChannelService.getChannel(idChannel);
    setChannelDetails(channelDetails.data.data);
  }
  console.log(channelDetails);
  console.log("MESSAGES", channelMessages);

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
        
      </div>
      {/* <ChatInput channelName={roomDetails?.name} channelId={roomId} /> */}
      <ChatInput channelName={'Chanel 20'} channelId={'errr'} />
    </div>
  );
}

export default Chat;