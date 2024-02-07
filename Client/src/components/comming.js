import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Button from '@mui/material/Button';
import {useNavigate } from 'react-router-dom'
import { Grid } from "@mui/material";
import axios from "axios";
import { getAllContacts } from "../redux/action";

function mapStateToProps(state) {
  return {
    contactsList: state.contacts.contactsList,
    taskList: state.task.taskList
  };
}
export default connect(mapStateToProps)(function Comming(props) {
  const { contactsList, dispatch} = props;
  const [idContact, setIdContact] = useState('');
  const newNavigate = useNavigate()

  const getAllContactsList = async () => {
    try {
        const response = await axios.get('http://localhost:8000/contacts/')
        console.log(response.data);
        if (response.status == 200) {
            dispatch(getAllContacts(response.data))
        }
    }
    catch (error) {
        console.log("error")
    }
}
useEffect(() => {
    getAllContactsList()
}, [])

  const newUser = () => {
    newNavigate('/login')
  }

  const come = () => {
    console.log(idContact)
    const foundObject = contactsList.find(obj => obj.idNumber === idContact);
    if (foundObject) {
      alert(foundObject.firstName)
      newNavigate('/tasksListComp', { state: { idContact: idContact } })
    }
    else {
      if (idContact) {
        newNavigate('/login',{ state: { idContact: idContact } })
      }
      else {
        newNavigate('/Comming')
        alert("Enter ID")
      }
    }
  }
  return (<>
    <Grid container
      direction="column"
      justifyContent="flex-end"
      alignItems="flex-end">
      <Grid
       direction="column"
      marginRight={"20%"}
      marginBottom={54}
      paddingTop={18}>
        <AccountCircle style={{ fontSize: 65}} />
        <h1 id="title1"> Sign in </h1>
        <label id="title2"> Enter ID </label>
        <Grid>
          <TextField
            id="input-with-sx"
            label="id"
            variant="standard"
            value={idContact}
            onChange={(e) => setIdContact(e.target.value)}
          />
        </Grid>
        <Grid item s container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          paddingBottom={10}
          paddingTop={5}
          spacing={2}>
          <Grid item s >
            <Button variant="outlined" onClick={come} startIcon={<PeopleOutlineIcon />}>Sign in</Button>
          </Grid>
          <Grid item xs>
            <Button variant="outlined" onClick={newUser} startIcon={<SupervisorAccountIcon />}>Sign up</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
  );
})

