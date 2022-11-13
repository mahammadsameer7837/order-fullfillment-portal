import CancelIcon from '@mui/icons-material/Cancel';
import {
  FormControl, Grid, Input,
  InputLabel
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { getUser } from '../../util/apiCalls';
export default function ViewProfile({ toggleModal }) {
  //This js is to fetch user details, for only view purpose

  const [email, setEmail] = React.useState("");
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const emailChange = (event) => {
    setEmail(event.target.value);
  }

  const fnameChange = (event) => {
    setFName(event.target.value);
  }

  const lnameChange = (event) => {
    setLName(event.target.value);
  }


  const clickUpdateProfile = () => {
    toggleUpdateProfileModal();
  }

  const toggleUpdateProfileModal = () => {
    setIsEditOpen(!isEditOpen);

  }
  React.useEffect(() => {
    getUser(localStorage.getItem("email")).then(resp => {
      resp.json().then(data => {
        console.log(data);
        setEmail(data.email);
        setFName(data.firstName);
        setLName(data.lastName);
        console.log(data);
      });
    }).catch(error => {
      console.log("login user err " + error);
    });
  }, []);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      //padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      overflowY: 'unset',
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
      maxWidth: '400px'
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
    <React.Fragment>
      <div style={{ background: 'linear-gradient(110deg, #f2f5e9 60%, #b3e0ff 60%)', width: '300px' }}>
        <DialogContent >
          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
            <InputLabel htmlFor="standard-adornment-fname">Your First Name</InputLabel>
            <Input
              id="standard-adornment-fname"
              type={'text'}
              value={fname}
              disabled={true}
            />
          </FormControl><br></br><br></br>
          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
            <InputLabel htmlFor="standard-adornment-fname">Your Last Name</InputLabel>
            <Input
              id="standard-adornment-fname"
              type={'text'}
              value={lname}
              disabled={true}
            />
          </FormControl><br></br><br></br>

          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
            <InputLabel htmlFor="standard-adornment-email">Your Email</InputLabel>
            <Input
              id="standard-adornment-email"
              type={'text'}
              value={email}
              disabled={true}
            />
          </FormControl>
          <br></br><br></br>


        </DialogContent>
        <DialogActions align='center'>
          <Grid container justify="center">
            <Button variant="contained" fullWidth style={{ backgroundColor: 'orange' }} onClick={toggleModal} > <CancelIcon />CLOSE</Button>
          </Grid>
          {/* <Grid xs={12}>
          You want to update? <Button color="primary" onClick={clickUpdateProfile}> <EditIcon/>Edit Profile</Button>
        </Grid> */}
        </DialogActions>
        {/* <BootstrapDialog
            onClose={toggleUpdateProfileModal}
            aria-labelledby="customized-dialog-title"
            open={isEditOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleUpdateProfileModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'orange', color: 'white' }}>
              EDIT PROFILE
            </BootstrapDialogTitle>

            
                <Profile toggleModal={toggleUpdateProfileModal} viewToggleModal={toggleModal} />
             
          </BootstrapDialog> */}
      </div>
    </React.Fragment>
  );
}