import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { addcontact } from "../redux/action";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useLocation } from 'react-router-dom'
import { Grid } from "@mui/material";
import axios from "axios";           

function mapStateToProps(state) {
  return {
    contactsList: state.contacts.contactsList,
  };
}


export default connect(mapStateToProps)(function Login(props) {
  const { contactsList, dispatch } = props;
  const location = useLocation()
  const idContact = location.state && location.state.idContact
  let idNumberRef = useRef('')
  let firstNameRef = useRef('')
  let lastNameRef = useRef('')
  let enailAddressRef = useRef('')
  let phoneRef = useRef('')
  const [ContactDetails, setContactDetails] = useState({ idNumber: '', firstName: '', lastName: '', enailAddress: '', phone: '' })
  const newNavigate = useNavigate()


  useEffect(function () {
    console.log("contactsList", contactsList)
  }, [, contactsList]);

  const login = async () => {
    setContactDetails({
      idNumber: idNumberRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      enailAddress: enailAddressRef.current.value,
      phone: phoneRef.current.value
    })
    if (ContactDetails.idNumber && ContactDetails.firstName && ContactDetails.lastName && ContactDetails.enailAddress && ContactDetails.phone) {
      try {
        const response = await axios.post('http://localhost:8000/contacts/', {
          idNumber: idNumberRef.current.value,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          enailAddress: enailAddressRef.current.value,
          phone: phoneRef.current.value
        })
        if (response.status == 200) {
          dispatch(addcontact({
            idNumber: idNumberRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            enailAddress: enailAddressRef.current.value,
            phone: phoneRef.current.value
          }))
          alert(`Hello ${firstNameRef.current.value}`);
          newNavigate('/tasksListComp', { state: { idContact: idNumberRef.current.value } })
        }
      }
      catch {
        console.log("Erorr")
      }
    }
  }


  return (<>
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      alignItems="flex-end"
      spacing={2}>
      <Box sx={{ fontWeight: 'light', m: 0, marginRight: "10%", paddingTop: 10 }}>
        <label>תעודת זהות</label>
        <br></br>
        <br></br>
        <TextField
          id="outlined-multiline-flexible"
          label="IdNumber"
          multiline
          maxRows={4}
          defaultValue={idContact}
          inputRef={idNumberRef}
        />
        <br></br>
        <br></br>
        <label>שם פרטי</label>
        <br></br>
        <br></br>
        <TextField
          id="outlined-multiline-flexible"
          label="FirstName"
          multiline
          maxRows={4}
          inputRef={firstNameRef}
        />
        <br></br>
        <br></br>
        <label>שם משפחה </label>
        <br></br>
        <br></br>
        <TextField
          id="outlined-multiline-flexible"
          label="LastName"
          multiline
          maxRows={4}
          inputRef={lastNameRef}
        />
        <br></br>
        <br></br>
        <label>כתובת מייל</label>
        <br></br>
        <br></br>
        <TextField
          id="outlined-multiline-flexible"
          label="EnailAddress"
          multiline
          maxRows={4}
          inputRef={enailAddressRef}
        />
        <br></br>
        <br></br>
        <label>מספר פלאפון</label>
        <br></br>
        <br></br>
        <TextField
          id="outlined-multiline-flexible"
          label="PhoneNumber"
          multiline
          maxRows={4}
          inputRef={phoneRef}
        />
        <br></br>
        <br></br>
        <Stack spacing={20} direction="row-reverse" marginRight={"25%"} paddingBottom={"120%"}>
          <Button variant="outlined" onClick={login} startIcon={<CheckCircleOutlineIcon />}> sumbit </Button>
        </Stack>
        <br></br>
      </Box>
    </Grid>
  </>)
})

