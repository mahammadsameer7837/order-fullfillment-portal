import { Grid, Snackbar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Header from '../../common/header/Header';
import { parseXmlFile } from '../../util/apiCalls';

export default function Home() {

  //This js is home page, contains static data

  const [value, setValue] = React.useState(1);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [file, setFile] = React.useState('');
  const [orderData, setOrderData] = React.useState([]);
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  }
  React.useEffect(() => {
    getLoggedInStatus();

  }, [value]);


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
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      minWidth: '1000px !important',
      height: '800px'
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const BootstrapDialogForViewMovie = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      minWidth: '1200px !important',
      height: '900px'
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

  function handleFileChange(e){
    setFile(e.target.files[0]);
    // console.log(e.target.files);
    // parseXmlFile(e.target.files[0]).then(resp => {
    //   console.log(resp.data);
    //   setOrderData(resp.data);
    // }).catch(error => {
    //   console.log("login user err ", error);
    // })
  }

  function uploadXmlFile() {
    if (localStorage.getItem("email") !== "" && localStorage.getItem("email") !== undefined
      && localStorage.getItem("email") !== null) {
    } else {
      setSnackMessage("Please login to proceed!");
      setOpenSnack(true);
      return false;
    }
    if(file){
      if((file.name.substring(file.name.lastIndexOf('.')+1, file.name.length) || file.name)==="xml"){
        parseXmlFile(file).then(resp => {
          console.log(resp.data);
          setOrderData(resp.data);
        }).catch(error => {
          console.log("login user err ", error);
          setSnackMessage("XML file is not valid");
          setOpenSnack(true);
        })
      } else {
        setSnackMessage("File extension should be xml");
        setOpenSnack(true);
      }
       
    } else {
      setSnackMessage("Please select xml file");
      setOpenSnack(true);
    }
    

  }



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: 'sNo', label: 'S.NO', minWidth: 20 },
    { id: 'account', label: 'ACCOUNT NAME', minWidth: 100 },
    { id: 'dueDate', label: 'DUE DATE', minWidth: 100 },
    { id: 'productId', label: 'PRODUCT ID', minWidth: 100 },
    { id: 'category', label: 'PRODUCT CATEGORY', minWidth: 100 },
    { id: 'name', label: 'PRODUCT NAME', minWidth: 100 },
    { id: 'quantity', label: 'PRODUCT QUANTITY', minWidth: 100 }
  ];


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
          
          <Typography variant='h6' fontWeight={700}>
            UPLOAD XML FILE:
          </Typography>
          <Box style={{border:'1px SOLID #262673', padding:'10px', borderRadius:'10px'}}>
          <input type="file" id="myFile" class="hidden" name="filename" onChange={handleFileChange} placeholder="Saad" />
          <Button variant="contained" style={{ backgroundColor: 'goldenrod' }} onClick={uploadXmlFile} >&nbsp;SUBMIT</Button>
          </Box>
          <br></br><br></br><br></br>

          <Typography variant='h6' fontWeight={700}>
            PROCESS UPLOADED XML FILE:
          </Typography>
          <TableContainer sx={{ minHeight: 350, maxHeight: 350 }}>
            <Table stickyHeader aria-label="sticky table" >
              <TableHead style={{ backgroundColor: '#262673', color: 'white' }}>
                <TableRow style={{ backgroundColor: '#262673', color: 'white' }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor: '#262673', color: 'white' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData && orderData.length > 0 ? (orderData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, ind) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                        {columns.map((column) => {
                          const id = row["id"];
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} */}


                              {(column.id === 'action') ? (
                                <>

                                </>
                              ) :
                                (column.id === 'sNo') ? (
                                  ind + 1
                                ) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })) : <TableRow><TableCell colSpan={7} style={{ textAlign: 'center', color: 'red' }}>No Records found</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orderData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
        <Grid md={1}></Grid>






      </Grid>

      <Snackbar
        style={{ whiteSpace: 'pre-wrap', width: '300px', top: '50%', bottom: '50%', left: '40%', right: '50%', backgroundColor:'red' }}
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