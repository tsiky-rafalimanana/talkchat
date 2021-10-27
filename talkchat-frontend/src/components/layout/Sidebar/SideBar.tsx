import React, { useState, useEffect } from "react";
import "./SideBar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import SidebarOption from "../SideBarOption/SideBarOption";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";

const Sidebar = () => {
  const [channels, setChannels] = useState<any[]>([]);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  // const [{ user }] = useStateValue();

  useEffect(() => {
    // db.collection("rooms").onSnapshot((snapshot) => {
    //   setChannels(
    //     snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       name: doc.data().name,
    //     }))
    //   );
    // });
  }, []);

  return (
    <div className="sidebar">
      <div className="siderbar-header">
        <div className="sidebar-info">
          <h2>TalkChat</h2>
          <h3>
            <FiberManualRecordIcon />
            {'Name'}
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
      <List
      className="sidebar-list"
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} selected>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      </List>
    </div>
  );
}

export default Sidebar;