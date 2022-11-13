import {
  FormControl, Snackbar, TextField, Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { updatePassword } from '../../util/apiCalls';
export default function ForgotPassword({ toggleModal }) {
  //This js file is mainly to register users and it will take care all validations as well
  const [openSnack, setOpenSnack] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const [cpasswordError, setcPasswordError] = React.useState('');
  const [invalidError, setInvalidError] = React.useState('');
  const [snackMessage, setSnackMessage] = React.useState('');
  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  const cpasswordChange = (event) => {
    setCPassword(event.target.value);
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
    if (!ValidateEmail(event.target.value)) {
      setEmailError('Enter valid Email!');
    } else {
      setEmailError('');
    }
  }


  const clickRegister = () => {

    if (email === "" || email === undefined || password === "" || password === undefined) {
      setSnackMessage('Please fill out this field');
      setOpenSnack(true);
    } else if (!ValidateEmail(email)) {
      return false;
    } else if (password != cpassword) {
      setcPasswordError('Password mismatched!');
      return false;
    } else {
      updatePassword(email, password).then(res => {
        console.log(res)
        if (res.ok) {

          setEmail("");
          setPassword("");
          setCPassword("");
          setcPasswordError("");
          setSnackMessage('Password reset successfull!, Please log in');
          setOpenSnack(true);
        } else {
          res.text().then(text => {
            let err = JSON.parse(text);
            console.log(err);
            setcPasswordError(err.message);
            setSnackMessage(err.message);
            setOpenSnack(true);
          })
        }

      })
        .catch(error => {
          console.log("Regiter failed" + error);
          setInvalidError('Registration Failed!');
        })
    }
  }

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }


  const clickLogin = () => {
    toggleModal();
  }

  const [logButtonName, setlogButtonName] = React.useState("LOGIN");

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  return (
    <React.Fragment >
      <div>
        <DialogContent >

          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="outlined" style={{ textAlign: 'center' }}>
            <TextField
              label="Email"
              size="small"
              className="inputRounded"
              id="standard-adornment-email"
              type={'text'}
              value={email}
              onChange={emailChange}
            />
          </FormControl>
          <br></br>
          <span style={{
            color: 'red',
          }}>{emailError}</span>

          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="outlined" style={{ textAlign: 'center' }}>
            <TextField
              label="New Password"
              size="small"
              className="inputRounded"
              id="standard-adornment-password"
              type={'password'}
              value={password}
              onChange={passwordChange}
            />
          </FormControl>
          <br></br>
          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="outlined" style={{ textAlign: 'center' }}>
            <TextField
              label="Confirm Password"
              size="small"
              className="inputRounded"
              id="standard-adornment-password"
              type={'password'}
              value={cpassword}
              onChange={cpasswordChange}
            />
          </FormControl>

          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{cpasswordError}</span>
        </DialogContent>
        <DialogActions align='center'>

          <Button variant="contained" style={{ backgroundColor: 'goldenrod' }} onClick={clickRegister} >&nbsp;RESET PASSWORD</Button>

          <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Got your password? <Button color="primary" onClick={clickLogin} >Try Sign In</Button></Typography>
        </DialogActions>
      </div>
      <Snackbar
        style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%' }}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        open={openSnack}
        onClose={handleSnackClose}
        message={snackMessage}
      />
    </React.Fragment>
  );
}