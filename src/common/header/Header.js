import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import { TabContext, TabPanel } from '@mui/lab';
import { Tab, Tabs } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  NavLink
} from 'react-router-dom';
import image from '../../assets/logo.png';
import Login from '../../screens/login/Login';
import Profile from '../../screens/profile/Profile';
import ViewProfile from '../../screens/profile/ViewProfile';
import { logoutUser } from '../../util/apiCalls';
import "./Header.css";

export default function Header({ loginHandler }) {

  //This js file is to design & api calls related to header section in ui screen

  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState("");
  const [value, setValue] = React.useState(1);
  let datas = {
    label: ""
  }
  const [logButtonName, setlogButtonName] = React.useState(isUserSessionAlreadyExist());


  //This function is to validate user session exists or not
  function isUserSessionAlreadyExist() {
    if (localStorage.getItem("email") !== "" && localStorage.getItem("email") !== undefined
      && localStorage.getItem("email") !== null) {
      loginHandler(true);
      return "LOGOUT";
    } else {
      loginHandler(false);
      return "LOGIN";
    }
  }

  function toggleModal() {
    //alert(selectValue);
    if (logButtonName === 'LOGOUT') {
      logoutUser(localStorage.getItem("userId")).then(resp => {
        console.log(resp);
        resp.json().then(data => {
          console.log(data);
        });
      });
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      setlogButtonName("LOGIN");
      window.location.replace("/")
    } else {
      setIsOpen(!isOpen);
    }
  }

  function toggleProfileModal() {
    setIsProfileOpen(!isProfileOpen);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };





  //alert(selectValue);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      //width: '300px !important',
      overflowY: 'unset'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      //width: '300px !important',
      overflowY: 'unset'
    },
    '& .MuiDialogActions-root': {
      // padding: theme.spacing(1),
      // minWidth: '700px'
    },
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      border: '2px SOLID red',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar position="fixed"  >
        <Toolbar className="toolBar" position="fixed" style={{ backgroundColor: '#262673', height: '75px', width: '100%', position: 'fixed', borderBottom: '0.1em solid #B1F4F1', padding: '0.5em' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <img src={image} className="img" style={{ height: '60px' }} />
          </IconButton>
          <Typography variant="h4" component="div" style={{ color: '#ffffff', fontFamily: 'monospace' }} >
          Upload Orders
          </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;

          {/* <NavLink className="navbar-item" to="/home" style={{ color: '#373C83', textDecoration: 'none' }}> */}
          {/* <Search style={{backgroundColor:'white', borderRadius:'20px'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={posts}
              defaultValue={selectValue}
             // getOptionLabel={(option) => option.label}
              onChange={(event, value) => setSelectValue(value.label)}
              sx={{ width: 700 }}
              PopperComponent={({ style, ...props }) => (
                <Popper
                  {...props}
                  style={{ ...style, height: 0 , color:'white', borderRadius:'20px'}} // width is passed in 'style' prop
                />
              )}
              style={{marginTop:'-4px', color:'white', backgroundColor:'white', borderRadius:'20px'}}
              renderInput={(params) => <TextField {...params} label="Seach post.." style={{color:'white', backgroundColor:'white  !important', borderRadius:'20px'}}/>}
            />
          </Search> */}




          <NavLink className="navbar-item" to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <IconButton>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '19px',
                color: '#ffffff',
              }}><HomeWorkIcon />&nbsp;<span>XML FILE UPLOAD</span>
              </div>
            </IconButton>
          </NavLink>
          <NavLink className="navbar-item" to="/search" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <IconButton>
              &nbsp;&nbsp;
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '19px',
                color: '#ffffff',
              }}><LibraryBooksIcon />&nbsp;<span>SEARCH</span>
              </div>
            </IconButton>
          </NavLink>

          <NavLink className="navbar-item" to="/report" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <IconButton>
              &nbsp;&nbsp;
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontSize: '19px',
                color: '#ffffff',
              }}><LocalPharmacyIcon />&nbsp;<span>REPORTS</span>
              </div>
            </IconButton>
          </NavLink>




          <div style={{ flex: '1' }}></div>
          &nbsp;&nbsp;&nbsp;
          {
            (localStorage.getItem("email") !== undefined && localStorage.getItem("email") !== null && localStorage.getItem("email").trim() !== "") ? (
              <div onClick={toggleProfileModal} style={{ cursor: 'pointer', color: '#ffffff', fontSize: '19px' }}><span> Hello {localStorage.getItem("firstname")}&nbsp;{localStorage.getItem("lastname")}!</span>&nbsp;&nbsp;</div>
            ) : ""
          }

          <Button variant="contained" style={{ backgroundColor: 'goldenrod', color: 'white' }} onClick={toggleModal} >{logButtonName}</Button>
          <BootstrapDialog
            onClose={toggleModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
              LOGIN
            </BootstrapDialogTitle>

            <Login toggleModal={toggleModal} loginButton={setlogButtonName} />
          </BootstrapDialog>

          <BootstrapProfileDialog
            onClose={toggleProfileModal}
            aria-labelledby="customized-dialog-title"
            open={isProfileOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleProfileModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
              PROFILE
            </BootstrapDialogTitle>
            <TabContext value={value}>
              <Tabs variant="fullWidth" value={value} onChange={handleChange} style={{ textAlign: 'center' }}>
                <Tab label="VIEW" value={1} />
                <Tab label="EDIT" value={2} />
              </Tabs>

              <TabPanel value={1} index={0}>
                <ViewProfile toggleModal={toggleProfileModal} />
              </TabPanel>

              <TabPanel value={2} index={1}>
                <Profile toggleModal={toggleProfileModal} />
              </TabPanel>

            </TabContext>

          </BootstrapProfileDialog>


        </Toolbar>
      </AppBar>
    </Box>
  );
}