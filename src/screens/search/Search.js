import { Autocomplete, FormControl, Grid, Snackbar, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MUIDataTable from "mui-datatables";
import * as React from 'react';
import Header from '../../common/header/Header';
import { getAllCategoryFromBk, readData } from '../../util/apiCalls';
export default function Search() {

  //This js is home page, contains static data

  if (localStorage.getItem("email") === "" || localStorage.getItem("email") === undefined
  || localStorage.getItem("email") === null) {
    window.location.replace("/")
  }

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [orderData, setOrderData] = React.useState([]);
  const [selectStartTime, setSelectStartTime] = React.useState('');
  const [selectEndTime, setSelectEndTime] = React.useState('');
  const [categoryList, setCategoryList] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [searchData, setSearchData] = React.useState("");


  const searchDataChange = (event) => {
    setSearchData(event.target.value);
  }
  const handleStartTimeChange = (newValue) => {
    setSelectStartTime(newValue);
  };



  const handleEndTimeChange = (newValue) => {
    setSelectEndTime(newValue);
  };
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }
  React.useEffect(() => {
    getLoggedInStatus();

  }, [value]);

  React.useEffect(() => {
    readData(searchData, selectedCategory).then(resp => {
      console.log(resp.data);
      setOrderData(resp.data);
    }).catch(error => {
      console.log("login user err ", error);
    });

    getAllCategoryFromBk().then(resp => {

      console.log(resp);
      console.log(resp.data);
      setCategoryList(resp.data);
    }).catch(error => {
      console.log("login user err " + error);
    })

  }, []);


  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };

  function getLoggedInStatus() {
    if (localStorage.getItem("email") !== "" && localStorage.getItem("email") !== undefined
      && localStorage.getItem("email") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  //   const columns = [
  //     { id: 'sNo', label: 'S.NO', minWidth: 20 },
  //     { id: 'account', label: 'ACCOUNT NAME', minWidth: 100 },
  //     { id: 'dueDate', label: 'DUE DATE', minWidth: 100 },
  //     { id: 'productId', label: 'PRODUCT ID', minWidth: 100 },
  //     { id: 'category', label: 'PRODUCT CATEGORY', minWidth: 100 },
  //     { id: 'name', label: 'PRODUCT NAME', minWidth: 100 },
  //     { id: 'quantity', label: 'PRODUCT QUANTITY', minWidth: 100 }
  //   ];

  const columns = [
    {
      name: "account",
      label: "ACCOUNT NAME",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "dueDate",
      label: "DUE DATE",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "productId",
      label: "PRODUCT ID",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "category",
      label: "PRODUCT CATEGORY",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "name",
      label: "PRODUCT NAME",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "quantity",
      label: "PRODUCT QUANTITY",
      options: {
        filter: true,
        sort: false,
      }
    },
  ];

  function searchOrderData() {
    readData(searchData, selectedCategory, selectStartTime, selectEndTime).then(resp => {
      console.log(resp.data);
      setOrderData(resp.data);
    }).catch(error => {
      console.log("login user err ", error);
    });
  }

  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    download: false,
    print: false,
    filter: false,
    search: false
  };
  // const data = [
  //  ["Joe James", "Test Corp", "Yonkers", "NY"],
  //  ["John Walsh", "Test Corp", "Hartford", "CT"],
  //  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  //  ["James Houston", "Test Corp", "Dallas", "TX"],
  // ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Header loginHandler={loginHandler} />
      <br></br><br></br><br></br><br></br><br></br>

      <Grid container direction="row" spacing={1}
        style={{ paddingLeft: '100px' }} >



        <Grid md={1}></Grid>
        <Grid md={10}>

          <Grid container direction="row">

            <Grid item xs={3}>

              <FormControl required={true} variant="outlined" style={{ textAlign: 'center', width: '100%' }}>
                <TextField
                  label="Search Account / Product name"
                  id="standard-adornment-lusername"
                  type={'text'}
                  defaultValue={searchData}
                  onBlur={searchDataChange}
                />
              </FormControl>
            </Grid>&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item xs={2}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categoryList}
                //getOptionLabel={option => option.title}
                //sx={{ width: 300 }}
                onChange={(event, value) => setSelectedCategory(value)}
                renderInput={(params) => <TextField {...params} label="Select category" style={{ width: '100%' }} />}
              />
            </Grid>&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item xs={2}>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="From Date"
                  value={selectStartTime}
                  //disablePast="true"
                  format="yyyy-MM-dd"
                  onChange={handleStartTimeChange}
                  renderInput={(params) => <TextField {...params} style={{ width: '100%' }} />}
                /></LocalizationProvider> &nbsp;&nbsp;&nbsp;
            </Grid>&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="To Date"
                  value={selectEndTime}
                  //disablePast="true"
                  format="yyyy-MM-dd"
                  onChange={handleEndTimeChange}
                  renderInput={(params) => <TextField  {...params} style={{ width: '100%' }} />}
                /></LocalizationProvider> &nbsp;&nbsp;&nbsp;
            </Grid>

            &nbsp;&nbsp;&nbsp;&nbsp;
            <Grid item xs={2}>
              <Button size='large' variant="contained" style={{ backgroundColor: "#262673", padding: '15px', color: 'white' }} onClick={searchOrderData}>&nbsp;SEARCH</Button> &nbsp;&nbsp;&nbsp;
            </Grid>

          </Grid>
          <br></br>


          <MUIDataTable
            title={"ORDER DETAILS"}
            data={orderData}
            columns={columns}
            options={options}
          />

          <br></br><br></br>
        </Grid>
        <Grid md={1}></Grid>






      </Grid>

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