import React, { useState, useEffect, useContext } from 'react';
import './SideBar.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import SidebarOption from '../SideBarOption/SideBarOption';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import { getUserInfo } from '../../../utils/LocalStorageUtils';
import { useHistory, useParams } from 'react-router-dom';
import { ChannelService } from '../../../services/ChannelService';
import { Context } from '../../../store/store';
import { StoreActions } from '../../../store/reducer';

const Sidebar = (props: any) => {
  let history = useHistory();
  const [state, dispatch] = useContext<any>(Context);
  const { channelId } = useParams() as any;
  
  const [channels, setChannels] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [openUsers, setOpenUsers] = useState(true);
  const userInfo = getUserInfo();
  
  useEffect(() => {
    
    setUsers(props.allUsers);
  }, [props.allUsers]);

  const handleClickOpenUsers = () => {
    setOpenUsers(!openUsers);
  };

  const handleClickUser = async (indexUser: number) => {
    const currentUsers = [...users];
    // handle active user
    // currentUsers.forEach((item: any, index: number) => {
    //   if (index !== indexUser) {
    //     currentUsers[index].selected = false;
    //   } else {
    //     currentUsers[index].selected = true;
    //   }
    // });
    // setUsers(currentUsers);
    const otherUser = currentUsers[indexUser];
    if (currentUsers[indexUser].channelId) {
      history.push(`/channel/${currentUsers[indexUser].channelId}`);
      dispatch({type: StoreActions.SET_CURRENT_CHANNEL_ID, payload: channelId})
    } else {
      // create data to send
      const participants = [];
      participants.push({id: userInfo.id});
      participants.push({id: otherUser.id});
      const newChannel = {
        name: `${userInfo.username} - ${otherUser.lastname} ${otherUser.firstname}`,
        description: '',
        direct: true,
        members: participants
      };
      const res = await ChannelService.addNewChannel(newChannel);
      const channelId = res.data.data.id;
      props.refetchUsers();
      dispatch({type: StoreActions.SET_CURRENT_CHANNEL_ID, payload: channelId})
      history.push(`/channel/${channelId}`);
    }
  }

  return (
    <div className="sidebar">
      <div className="siderbar-header">
        <div className="sidebar-info">
          <h2>TalkChat</h2>
          <h3>
            <FiberManualRecordIcon />
            {userInfo.username}
          </h3>
        </div>
        {/* <CreateIcon /> */}
      </div>
      {/* <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Metions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr /> */}
      {/* <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} canAddChannel title="Add Channel" />

      {/* Connect to db and list all the channels*/}
      {/* SidebarOptionn */}
      {/* {channels.map((channel) => (
        <SidebarOption title={channel.name} id={channel.id} />
      ))}  */}
      <div className="list-container">
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClickOpenUsers}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Direct Messages" />
            {openUsers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUsers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {users.map((u: any, index: number) => (
                <ListItemButton sx={{ pl: 4 }} key={u.id} selected={state.currentChannelId ? state.currentChannelId === u.channelId : false} onClick={() => handleClickUser(index)}>
                  <ListItemText primary={`${u.lastname} ${u.firstname}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
