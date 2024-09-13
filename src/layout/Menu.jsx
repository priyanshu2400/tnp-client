// src/components/layout/Menu.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../state';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; 
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';

const Menu = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role =  useSelector((state) => state.user.role);
  
  const handleLogout = () => {
    dispatch(resetUser());
    onClose();
    navigate('/login');
  };

  return (
    <Drawer
  variant="temporary"
  open={open}
  onClose={onClose}
  sx={{
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      display: 'flex',
        // Center items vertically
    },
  }}
>
  <List>
    <ListItem component={Link} to="/" onClick={onClose}>
      <ListItemIcon><HomeIcon style={{ fontSize: 30 }}/></ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', textDecoration: 'none', color: 'rgba(0, 0, 0, 0.60)' }}  primary="Home" />
    </ListItem>
    <ListItem component={Link} to="/jobs" onClick={onClose}>
      <ListItemIcon><WorkIcon style={{ fontSize: 30 }} /></ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '1.2rem' , textDecoration: 'none', color: 'rgba(0, 0, 0, 0.60)'}} primary="Jobs" />
    </ListItem>
    { role==="Student" && (<ListItem component={Link} to="/blogs" onClick={onClose}>
      <ListItemIcon><ArticleIcon style={{ fontSize: 30 }}/></ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', textDecoration: 'none', color: 'rgba(0, 0, 0, 0.60)' }} primary="Blogs" />
    </ListItem>)}
    { role==="Student" && (<ListItem component={Link} to="/help" onClick={onClose}>
      <ListItemIcon><HelpIcon style={{ fontSize: 30 }}/></ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', textDecoration: 'none', color: 'rgba(0, 0, 0, 0.60)' }} primary="Help" />
    </ListItem>)}
    { role==="Admin" && (<ListItem component={Link} to="/addjob" onClick={onClose}>
      {/* <ListItemIcon><WorkIcon style={{ fontSize: 30 }}/></ListItemIcon> */}
      <ListItemIcon><AddCircleOutlineIcon style={{ fontSize: 30 }}/></ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', textDecoration: 'none', color: 'rgba(0, 0, 0, 0.60)' }} primary="Add Job" />
    </ListItem>)}
    <ListItem component={Link} to="/announcements" onClick={onClose}>
      {/* <ListItemIcon><WorkIcon style={{ fontSize: 30 }}/></ListItemIcon> */}
      <ListItemIcon><AnnouncementOutlinedIcon style={{ fontSize: 30 }}/></ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', textDecoration: 'none', color: 'rgba(0, 0, 0, 0.60)' }} primary="Announcements" />
    </ListItem>
    <ListItem component={Link} to="/login" onClick={handleLogout}>
      <ListItemIcon><LogoutIcon style={{ fontSize: 30 }}/></ListItemIcon>
      <ListItemText primaryTypographyProps={{ fontSize: '1.2rem', textDecoration: 'none', color: 'rgba(0, 0, 0, 0.60)' }} primary="Logout" />
    </ListItem>
  </List>
</Drawer>

  );
};

export default Menu;
