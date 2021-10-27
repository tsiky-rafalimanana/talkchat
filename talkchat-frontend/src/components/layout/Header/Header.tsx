import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Avatar, Button } from "@mui/material";
import { useHistory } from 'react-router-dom';

function Header() {
  let history = useHistory();
  const handleClickLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
    window.location.reload();
  }
  return (
    <div className="header">
      <div className="header-left">
        <Avatar
          className="header-avatar"
          alt={'img'}
          src={''}
        />
        <Button variant="outlined" className="logout-btn" onClick={handleClickLogOut}> Log Out</Button>
      </div>
      <div className="header-search">
        <SearchIcon />
        <input placeholder="Search" type="text" />
      </div>
      <div className="header-right">
        <HelpOutlineIcon />
      </div>
    </div>
  );
}

export default Header;