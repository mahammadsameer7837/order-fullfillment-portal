//This file is one -> it have all backend API calls
import axios from 'axios';  
import moment from 'moment/moment';
const BACKEND_APP_URL = "http://localhost:8080/api";


export const loginUser = (username,password) => {
    return fetch(BACKEND_APP_URL+"/auth/signin", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "email":username,
              "password":password
              })
          });
}

export const updatePassword = (email,password) => {
  console.log("register user called"+JSON.stringify({
                  "password":password,
                  "email":email
                  }));
    return fetch(BACKEND_APP_URL+"/auth/reset-password", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                  "password":password,
                  "email":email
              })
          });
}

export const parseXmlFile = (file) => {
  const formData = new FormData();
  formData.append('file',file)
  return axios({
    url: BACKEND_APP_URL+"/file/upload/"+localStorage.getItem("userId"),
    method: "POST",
    headers: {'Content-Type': 'multipart/form-data','token': ''+localStorage.getItem('token')},
    data: formData
  });
}

export const readData = (name, category, selectStartTime, selectEndTime) => {
  let names = name?name:"";
  let categorys = category?category:"";
  let selectStartTimes = selectStartTime ? moment(selectStartTime).format("yyyy-MM-DD") : null;
  let selectEndTimes = selectEndTime ? moment(selectEndTime).format("yyyy-MM-DD") :null;
  return axios({
    url: BACKEND_APP_URL+"/file?name="+names+"&category="+categorys+"&startDate="+selectStartTimes+"&endDate="+selectEndTimes,
    method: "GET",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
}

export const searchOrder = (type, data) => {
  let uri = "";
  if(type==="date"){
    uri = BACKEND_APP_URL+"/file/report/"+type;
  } else {
    uri =  BACKEND_APP_URL+"/file/report/"+type+"/"+data;
  }

  return axios({
    url: uri,
    method: "GET",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
}

export const getAllCategoryFromBk = () => {
  return axios({
    url: BACKEND_APP_URL+"/file/category",
    method: "GET",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
}

export const getAllUsers = () => {
  return fetch(BACKEND_APP_URL+"/users_with_status", {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllMovies");
        })
}

export const logoutUser = (userId) => {
  console.log("logoutUser called"+userId);
  return fetch(BACKEND_APP_URL+"/auth/signout/"+userId, {
          method: "POST",
          headers: {'Content-Type': 'application/json'}
        });
}

export const registerUser = (fname, lname, email,password) => {
  console.log("register user called"+JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "email":email
                  }));
    return fetch(BACKEND_APP_URL+"/auth/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "email":email
              })
          });
}
export const getUser = (email) => {
  return fetch(BACKEND_APP_URL+"/user/"+email, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        });
}
export const editUsers = (fname, lname, email, password) => {
  console.log("register user called"+JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "email":email,
                }));
  return fetch(BACKEND_APP_URL+"/user/"+localStorage.getItem("userId"), {
          method: "PUT",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          body: JSON.stringify({
            "firstName":fname,
            "lastName":lname,
            "password":password,
            "email":email,
            })
        });
}
