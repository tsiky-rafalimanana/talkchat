import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Login from './views/login/Login';
import SignUp from './views/signup/Signup';
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore as ToastsStoreDefault,
} from 'react-toasts';
import Home from './views/home/Home';
import Sidebar from './components/layout/Sidebar/SideBar';
import Header from './components/layout/Header/Header';
import Chat from './views/chat/Chat';
import { LOCAL_STORAGE_KEY } from './constants/LocalStorageKey';
import { useEffect, useState } from 'react';
import { UserService } from './services/UserService';
import Store from './store/store';
import { ChannelService } from './services/ChannelService';
import { getUserInfo } from './utils/LocalStorageUtils';

function App() {
  const theme = createTheme();
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_KEY);
  const [users, setUsers] = useState<any>([]);
  const [channels, setChannels] = useState<any>([]);
  useEffect(()=> {
    if (token) {
      getAllUsers();
      getAllChannels();
    }
  }, [])

  const getAllUsers = async () => {
    const allUsers = await UserService.getAllUsers();
    setUsers(allUsers.data.data);
  }
  const getAllChannels = async () => {
    const allChannels = await ChannelService.getUserChannel();
    setChannels(allChannels.data.data);
  }
  return (
    <Store>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          {token ? (
            <>
            <Header />
            <div className="app-body">
              <Sidebar allUsers={users} refetchUsers={getAllUsers} refetchChannels={getAllChannels} allChannels={channels}>
              </Sidebar>
              <Switch>
                <Redirect exact from="/" to={'/login'} />
                <Route component={Login} exact path="/login" />
                <Route component={SignUp} exact path="/signup" />
                <Route component={Home} exact path="/home" />
                <Route path="/channel/:channelId">
                  <Chat />
                </Route>
              </Switch>
            </div>
            </>
          ) : (
            <Switch>
              <Redirect exact from="/" to={'/login'} />
              <Route component={Login} exact path="/login" />
              <Route component={SignUp} exact path="/signup" />
              <Route component={Home} exact path="/home" />
            </Switch>
          )}
        </Router>
      </div>
      <ToastsContainer
        store={ToastsStoreDefault}
        position={ToastsContainerPosition.BOTTOM_CENTER}
        lightBackground
      />
    </ThemeProvider>
    </Store>
  );
}

export default App;
