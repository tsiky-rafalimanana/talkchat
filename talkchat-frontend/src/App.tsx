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

function App() {
  const theme = createTheme();
  const token = localStorage.getItem('token');
  console.log('🚀 ~ file: App.tsx ~ line 22 ~ App ~ token', token);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          {token ? (
            <>
            <Header />
            <div className="app-body">
              <Sidebar />
              <Switch>
                <Redirect exact from="/" to={'/login'} />
                <Route component={Login} exact path="/login" />
                <Route component={SignUp} exact path="/signup" />
                <Route component={Home} exact path="/home" />
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
  );
}

export default App;
