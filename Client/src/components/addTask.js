import * as React from 'react';
import { useEffect, useState } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { addTaskList } from "../redux/action";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "axios";           
        


function mapStateToProps(state) {
    return {
        taskList: state.task.taskList,
        taskType: state.task.taskType,
        contactsList: state.contacts.contactsList
    };
}

export default connect(mapStateToProps)(function AddTask(props) {
    const { taskType, taskList, contactsList, dispatch } = props;
    const location = useLocation()
    const idContact = location.state && location.state.idContact
    let taskIdRef = useRef('')
    let taskTypeIdRef = useRef('')
    let taskNameRef = useRef('')
    const newNavigate = useNavigate()
    const [TaskType, setTaskType] = useState('')
    const [TaskDetails, setTaskDetails] = useState({ taskId: '', taskTypeId: '', taskName: '' })
    let contactName = ''
    let indexSelectOption = ""
    const contact = contactsList.find((user) => user.idNumber === idContact)
    if (contact)
        contactName = contact.firstName + " " + contact.lastName

    useEffect(function () {
        console.log("taskList", taskList)
    }, [, taskList]);

    const handleChange = (event) => {
        setTaskType(event.target.value)
    }

    const add = async () => {
        const find = taskType.find(x => x.taskTypeName == taskTypeIdRef.current.value)
        if (find)
            indexSelectOption = find.taskTypeId
        setTaskDetails({ taskId: taskIdRef.current.value, taskTypeId: indexSelectOption, taskName: taskNameRef.current.value })
        if (TaskDetails.taskId && TaskDetails.taskTypeId && TaskDetails.taskName) {
            try {
                const response = await axios.post('http://localhost:8000/tasks/', {
                    taskId: taskIdRef.current.value,
                    taskTypeId: indexSelectOption,
                    taskName: taskNameRef.current.value,
                    contactTaskName: contactName,
                    contactTaskID: idContact,
                    done: "false"
                })
                console.log("The Task Add")
                if (response.status == 200) {
                    dispatch(addTaskList({
                        taskId: taskIdRef.current.value,
                        taskTypeId: indexSelectOption,
                        taskName: taskNameRef.current.value,
                        contactTaskName: contactName,
                        contactTaskID: idContact,
                        done: "false"
                    }))
                    alert(`the task ${taskNameRef.current.value} adding`);
                    newNavigate('/tasksListComp', { state: { idContact: idContact } })
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
            alignItems="flex-end">
            <Box sx={{ fontWeight: 'light', m: 0, marginRight: "10%", paddingTop: "5%", paddingBottom: "27%" }}>
                <label>קוד משימה</label>
                <br></br>
                <br></br>
                <TextField
                    id="outlined-multiline-flexible"
                    label="TaskId"
                    multiline
                    maxRows={4}
                    inputRef={taskIdRef}
                />
                <br></br>
                <br></br>
                <label>סוג משימה</label>
                <br></br>
                <br></br>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">TaskType</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-standard"
                        label="TaskType"
                        value={TaskType}
                        onChange={handleChange}
                        inputRef={taskTypeIdRef}
                    >
                        {taskType.map(x => <MenuItem key={x.taskTypeId} value={x.taskTypeName}>{x.taskTypeName}</MenuItem>)}
                    </Select>
                </FormControl>

                <br></br>
                <br></br>
                <label>שם משימה </label>
                <br></br>
                <br></br>
                <TextField
                    id="outlined-multiline-flexible"
                    label="TaskName"
                    multiline
                    maxRows={4}
                    inputRef={taskNameRef}
                />
                <br></br>
                <br></br>
                <Stack spacing={20} direction="row-reverse" marginRight={"30%"} >
                    <Button variant="outlined" onClick={add} startIcon={<AddIcon />}> Add </Button>
                </Stack>
            </Box>
        </Grid>
    </>
    )
})


