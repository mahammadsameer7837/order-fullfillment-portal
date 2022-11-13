import {
  FormControl, Snackbar, TextField, Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { registerUser } from '../../util/apiCalls';
export default function Register({ toggleModal }) {
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

  const nameFChange = (event) => {
    setFName(event.target.value);
  }

  const nameLChange = (event) => {
    setLName(event.target.value);
  }

  const clickRegister = () => {

    if (email === "" || email === undefined || password === "" || password === undefined ||
      fname === "" || fname === undefined || lname === "" || lname === undefined) {
      setSnackMessage('Please fill out this field');
      setOpenSnack(true);
    } else if (!ValidateEmail(email)) {
      return false;
    } else if (password != cpassword) {
      setcPasswordError('Password mismatched!');
      return false;
    } else {
      registerUser(fname, lname, email, password).then(res => {
        console.log(res)
        if (res.ok) {
          setFName("");
          setLName("");
          setEmail("");
          setPassword("");
          setCPassword("");
          setcPasswordError("");
          setSnackMessage('Registration success!, Please log in');
          setOpenSnack(true);
        } else {
          res.text().then(text => {
            let err = JSON.parse(text);
            console.log(err);
            if(err.error){
              setcPasswordError(err.errors[0].defaultMessage);
              setSnackMessage(err.errors[0].defaultMessage);
            } else {
              setcPasswordError(err.message);
              setSnackMessage(err.message);
            }
           
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

  function phonenumber(mobile) {
    var phoneno = /^\d{10}$/;
    if (mobile.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
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
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  return (
    <React.Fragment >
      <div>
        <DialogContent >
          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="outlined" style={{ textAlign: 'center' }}>
            <TextField
              label="First Name"
              size="small"
              className="inputRounded"
              id="standard-adornment-fname"
              type={'text'}
              value={fname}
              onChange={nameFChange}
            />
          </FormControl><br></br>

          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="outlined" style={{ textAlign: 'center' }}>
            <TextField
              label="Last Name"
              size="small"
              className="inputRounded"
              id="standard-adornment-fname"
              type={'text'}
              value={lname}
              onChange={nameLChange}
            />
          </FormControl><br></br>

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
              label="Password"
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
          <br></br>

          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{cpasswordError}</span>
        </DialogContent>
        <DialogActions align='center'>

          <Button variant="contained" style={{ backgroundColor: 'goldenrod' }} onClick={clickRegister} >&nbsp;REGISTER</Button>

          <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Already had an account? <Button color="primary" onClick={clickLogin} >Sign In here</Button></Typography>
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