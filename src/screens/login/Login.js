import {
  FormControl, Grid, Snackbar, TextField, Typography
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
import { loginUser } from '../../util/apiCalls';
import ForgotPassword from '../forgotPassword/ForgotPassword';
import Register from '../register/Register';
export default function Login({ toggleModal, loginButton }) {


  //This js file is to handle login user related design & backend API calls
  const [openSnack, setOpenSnack] = React.useState(false);
  const [lusername, setLUsername] = React.useState("");
  const [lpassword, setLPassword] = React.useState("");
  const [invalidError, setInvalidError] = React.useState('');
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const [isForgotPassOpen, setIsForgotPassOpen] = React.useState(false);
  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const lpasswordChange = (event) => {
    setLPassword(event.target.value);
  }

  const lusernameChange = (event) => {
    setLUsername(event.target.value);
  }

  //This method is to call backend, once all validations success
  const clickSignUp = () => {

    toggleSignUpModal();
    //toggleModal();
    //setIsSignUpOpen(!isSignUpOpen);
  }

  const clickForgotPassword = () => {

    toggleForgotPassModal();
    //toggleModal();
    //setIsSignUpOpen(!isSignUpOpen);
  }



  const clickLogin = () => {
    if (lusername === "" || lusername === undefined || lpassword === "" || lpassword === undefined) {
      setOpenSnack(true);
    } else {
      loginUser(lusername, lpassword).then(resp => {
        console.log(resp);
        resp.json().then(data => {
          console.log(data);

          if (data !== null && data.email !== undefined && data.email !== "" && data.email !== "undefined"
            && data.email !== null) {
            localStorage.setItem("firstname", data.firstName);
            localStorage.setItem("lastname", data.lastName);
            localStorage.setItem("email", data.email);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("token", data.token);
            loginButton("LOGOUT");
            toggleModal();
          } else {
            setInvalidError('Invalid credentials!');
          }
        });
      }).catch(error => {
        console.log("login user err " + error);
      })
    }
  }

  const toggleSignUpModal = () => {
    setIsSignUpOpen(!isSignUpOpen);

  }

  const toggleForgotPassModal = () => {
    setIsForgotPassOpen(!isForgotPassOpen);
  }
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      overflowY: 'unset',
      padding: theme.spacing(2),

    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
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
      <Grid container style={{ width: '1500px !important' }}>

        {/* <Grid item xs={5}>
          <img
            className=""
            //src={require("../../assets/img/pattern_react.png").default}
            src={loginImg}

            alt="..."
          />


        </Grid> */}
        <Grid item xs={12}>
          <DialogContent>
            <FormControl required={true} fullWidth sx={{ m: 1 }} className="inputRounded" variant="outlined" style={{ textAlign: 'center' }}>
              <TextField
                size="small"
                label="Email"
                id="standard-adornment-lusername"
                className="inputRounded"
                type={'text'}
                defaultValue={lusername}
                onBlur={lusernameChange}
              />
            </FormControl><br></br><br></br>
            <FormControl required={true} fullWidth sx={{ m: 1 }} variant="outlined" style={{ textAlign: 'center' }}>

              <TextField
                size="small"
                label="Password"
                className="inputRounded"
                id="standard-adornment-lpassword"
                type={'password'}
                defaultValue={lpassword}
                onBlur={lpasswordChange}
              />
            </FormControl>
            <br></br>
            <span style={{
              fontWeight: 'bold',
              color: 'green',
            }}>{invalidError}</span>
            <Button color="primary" onClick={clickForgotPassword}>Forgot password?</Button>
          </DialogContent>
          <DialogActions align='center'>
            <Button variant="contained" style={{ backgroundColor: "green" }} onClick={clickLogin}>&nbsp;SIGNIN</Button>

            <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dont have an account? <Button color="secondary" onClick={clickSignUp}>Sign up</Button></Typography>
          </DialogActions>

          <Snackbar
            style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
            autoHideDuration={1300}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center"
            }}
            open={openSnack}
            onClose={handleSnackClose}
            message="Please fill out this field"
          />
          <BootstrapDialog
            onClose={toggleSignUpModal}
            aria-labelledby="customized-dialog-title"
            open={isSignUpOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleSignUpModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: '#262673', color: 'white' }}>
              REGISTER
            </BootstrapDialogTitle>


            <Register toggleModal={toggleSignUpModal} />

          </BootstrapDialog>


          <BootstrapDialog
            onClose={toggleForgotPassModal}
            aria-labelledby="customized-dialog-title"
            open={isForgotPassOpen}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleForgotPassModal} className="toolHeader" style={{ textAlign: 'center', backgroundColor: 'green', color: 'Pink' }}>
              FORGOT PASSWORD
            </BootstrapDialogTitle>


            <ForgotPassword toggleModal={toggleForgotPassModal} />

          </BootstrapDialog>
        </Grid>
      </Grid>
    </React.Fragment>

  );
}