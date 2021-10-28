import { useState, useEffect, useContext } from 'react';
import './SideBar.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore, Lock, LockOpen } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { getUserInfo } from '../../../utils/LocalStorageUtils';
import { useHistory, useParams } from 'react-router-dom';
import { ChannelService } from '../../../services/ChannelService';
import { Context } from '../../../store/store';
import { StoreActions } from '../../../store/reducer';
import { ToastsStore } from '../../../helpers';
import SocketIOService from '../../../services/SocketIOService';

const Sidebar = (props: any) => {
  let history = useHistory();
  const [state, dispatch] = useContext<any>(Context);
  const [open, setOpen] = useState<boolean>(false);
  const { channelId } = useParams() as any;

  const [channels, setChannels] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [openUsers, setOpenUsers] = useState(true);
  const [openChannels, setOpenChannels] = useState(true);
  const userInfo = getUserInfo();

  useEffect(()=>{
    SocketIOService.listenNewChannel((data: any) => {
      props.refetchUsers();
      props.refetchChannels();
    })
  }, [])

  useEffect(() => {
    setUsers(props.allUsers);
  }, [props.allUsers]);

  useEffect(() => {
    if (props.allChannels) {
      setChannels(props.allChannels);
    }
  }, [props.allChannels]);

  const handleClickOpenUsers = () => {
    setOpenUsers(!openUsers);
  };
  const handleClickOpenChannels = () => {
    setOpenChannels(!openChannels);
  };

  const handleClickUser = async (indexUser: number) => {
    const currentUsers = [...users];
    const otherUser = currentUsers[indexUser];
    if (currentUsers[indexUser].channelId) {
      history.push(`/channel/${currentUsers[indexUser].channelId}`);
      dispatch({
        type: StoreActions.SET_CURRENT_CHANNEL_ID,
        payload: channelId,
      });
    } else {
      // create data to send
      const participants = [];
      participants.push({ id: userInfo.id });
      participants.push({ id: otherUser.id });
      const newChannel = {
        name: `${userInfo.username} - ${otherUser.lastname} ${otherUser.firstname}`,
        description: '',
        direct: true,
        members: participants,
      };
      const res = await ChannelService.addNewChannel(newChannel);
      const channelId = res.data.data.id;
      props.refetchUsers();
      SocketIOService.emitNewChannel({channelId})
      dispatch({
        type: StoreActions.SET_CURRENT_CHANNEL_ID,
        payload: channelId,
      });
      history.push(`/channel/${channelId}`);
    }
  };

  // new channel form
  const [channelType, setChannelType] = useState('public');
  const handleChangeChannelType = (e: any) => {
    setChannelType(e.target.value);
  };
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const handleChangeMembers = (event: any) => {
    const {
      target: { value },
    } = event;
    
    setMembers(value);
  };

  const handleClickNewChannel = async () => {
    if (!name || !description) {
      ToastsStore.error('Check fields');
      return;
    }
    let newChannel;
    if (channelType === 'public') {
      const allMembers: any = users.map((i: any) => {
        return { id: i.id };
      });
      allMembers.push({ id: userInfo.id });
      newChannel = {
        name,
        description,
        public: true,
        members: allMembers,
      };
    } else {
      const allMembers: any = members.map((i: any) => {
        return { id: i };
      });
      allMembers.push({ id: userInfo.id });
      newChannel = {
        name,
        description,
        private: true,
        members: allMembers,
      };
    }
    const res = await ChannelService.addNewChannel(newChannel);
    const channelId = res.data.data.id;
    SocketIOService.emitNewChannel({channelId})
    props.refetchChannels();
    dispatch({
      type: StoreActions.SET_CURRENT_CHANNEL_ID,
      payload: channelId,
    });
    history.push(`/channel/${channelId}`);
    handleClose();
  };


  const handleClickChannel = (channelId: string) => {
    history.push(`/channel/${channelId}`);
    dispatch({
      type: StoreActions.SET_CURRENT_CHANNEL_ID,
      payload: channelId,
    });
  };
  const resetForm = () => {
    setName('');
    setDescription('');
    setChannelType('public');
    setMembers([]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

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
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={u.id}
                  selected={
                    state.currentChannelId
                      ? state.currentChannelId === u.channelId
                      : false
                  }
                  onClick={() => handleClickUser(index)}
                >
                  <ListItemText primary={`${u.lastname} ${u.firstname}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
      <div className="list-container">
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClickOpenChannels}>
            <ListItemIcon>
              <BookmarkBorderIcon />
            </ListItemIcon>
            <ListItemText primary="Channels" />
            {openChannels ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openChannels} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleClickOpen}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="New Channel" />
              </ListItemButton>
              {channels.map((u: any, index: number) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={u.id}
                  selected={
                    state.currentChannelId
                      ? state.currentChannelId === u.id
                      : false
                  }
                  onClick={() => handleClickChannel(u.id)}
                >
                  {u.private ? <LockIcon/> : <LockOpenIcon/>}
                  <ListItemText primary={`${u.name}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Channel</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <FormLabel component="legend" required>
                Type
              </FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                value={channelType}
                onChange={handleChangeChannelType}
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            {(channelType === 'private') && (
              <FormControl sx={{ m: 1, width: '100%'}} style={{marginTop: 25}}>
              <InputLabel id="demo-multiple-name-label">Members</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                fullWidth
                value={members}
                onChange={handleChangeMembers}
                input={<OutlinedInput label="Name" />}
              >
                {users.map((u: any) => (
                  <MenuItem key={u.id} value={u.id}>
                    {`${u.lastname} ${u.firstname}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            )}
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClickNewChannel}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Sidebar;
