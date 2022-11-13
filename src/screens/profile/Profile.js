
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import { FormControl, Grid, Input, InputLabel, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { editUsers, getUser } from '../../util/apiCalls';
export default function Profile({ toggleModal }) {

  //This js file is to edit user data and also it have all email/mobilenumber/password validations
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


  const fnameChange = (event) => {
    setFName(event.target.value);
  }

  const lnameChange = (event) => {
    setLName(event.target.value);
  }


  //Whenever user clicked profile, below useEffect will trigger to fetch user data 
  React.useEffect(() => {
    getUser(localStorage.getItem("email")).then(resp => {
      resp.json().then(data => {
        console.log(data);
        setEmail(data.email);
        setFName(data.firstName);
        setLName(data.lastName);
        setPassword(data.password);
        setCPassword(data.password);
        console.log(data);
      });
    }).catch(error => {
      console.log("login user err " + error);
    });
  }, []);

  //Whenever user clicked edit & save, below editUser will trigger to save edited user data
  const editUser = () => {
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
      editUsers(fname, lname, email, password).then(resp => {
        console.log(resp);
        resp.json().then(data => {
          console.log(data);
          setSnackMessage('User updated successfully');
          setOpenSnack(true);
          localStorage.setItem("firstname", data.firstName);
          localStorage.setItem("lastname", data.lastName);
          localStorage.setItem("email", data.email);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("token", data.token);
          toggleModal();
        });
      })
        .catch(error => {
          console.log("User update failed" + error);
          setSnackMessage(error);
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
    <React.Fragment>
      <div style={{ background: 'linear-gradient(110deg, #f2f5e9 60%, #b3e0ff 60%)', width: '300px' }}>
        <DialogContent>
          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
            <InputLabel htmlFor="standard-adornment-fname">First Name</InputLabel>
            <Input
              id="standard-adornment-fname"
              type={'text'}
              value={fname}
              defaultValue={fname}
              onChange={fnameChange}
            />
          </FormControl><br></br><br></br>
          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
            <InputLabel htmlFor="standard-adornment-fname">Last Name</InputLabel>
            <Input
              id="standard-adornment-fname"
              type={'text'}
              value={lname}
              defaultValue={lname}
              onChange={lnameChange}
            />
          </FormControl><br></br><br></br>

          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
            <InputLabel htmlFor="standard-adornment-email">Your Email</InputLabel>
            <Input
              id="standard-adornment-email"
              type={'text'}
              value={email}
              defaultValue={email}
              onChange={emailChange}
            />
          </FormControl>
          <br></br>
          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{emailError}</span>
          <br></br>
          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
            <InputLabel htmlFor="standard-adornment-password">Your Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={'password'}
              value={password}
              defaultValue={password}
              onChange={passwordChange}
            />
          </FormControl>
          <br></br><br></br>
          <FormControl required={true} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'center' }}>
            <InputLabel htmlFor="standard-adornment-password">Your Confirm Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={'password'}
              value={cpassword}
              defaultValue={cpassword}
              onChange={cpasswordChange}
            />
          </FormControl>
          <br></br>
          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{cpasswordError}</span>
          <br></br>

          <span style={{
            fontWeight: 'bold',
            color: 'red',
          }}>{mobileError}</span>
          <br></br>

        </DialogContent>
        <DialogActions align='center'>
          <Grid container justify="center">
            <Button fullWidth variant="contained" color="primary" onClick={editUser} ><ThumbUpAlt />&nbsp;SAVE</Button>
          </Grid>
        </DialogActions>

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
      </div>
    </React.Fragment>
  );
}