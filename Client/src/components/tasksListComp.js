import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom'
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import axios from "axios";
import { getTaskList } from "../redux/action";
import { updateDone } from "../redux/action";
import { deleteTask } from "../redux/action";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ListIcon from '@mui/icons-material/List';
import Carousel from './carouselImage';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

import img1 from '../img/1.png'
import img2 from '../img/2.png'
import img3 from '../img/3.png'

function mapStateToProps(state) {
    return {
        taskList: state.task.taskList,
        taskType: state.task.taskType
    };
}

export default connect(mapStateToProps)(function TaskList(props) {
    const location = useLocation()
    const [img, setImg] = useState(false)
    const idContact = location.state && location.state.idContact
    const { taskList, dispatch, taskType } = props;
    const newNavigate = useNavigate()
    const getAllTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/tasks/')
            console.log(response.data);
            if (response.status == 200) {
                dispatch(getTaskList(response.data))
            }
        }
        catch (error) {
            console.log("error")
        }
    }
    useEffect(() => {
        getAllTasks()
    }, [])

    const add = (() => {
        newNavigate('/addTask', { state: { idContact: idContact } })
    })

    const update = async (taskId) => {
        try {
            const task = Number(taskId)
            const response = await axios.put(`http://localhost:8000/tasks/${task}`, { taskId: taskId, done: "true" });
            console.log("The Task Updated");
            if (response.status == 200) {
                dispatch(updateDone({ taskId: taskId }))
            }
        }
        catch {
            console.log("Erorr")
        }
        //בשביל מצב הרוח
        finally{  dispatch(updateDone({ taskId: taskId }))}
    }

    const deleteThisTask = async (taskId) => {
        try {
            const task= Number(taskId)
            const response = await axios.delete(`http://localhost:8000/tasks/${task}`)
            console.log("The Task Deleted")
            if (response.status == 200) {
                dispatch(deleteTask({ id: taskId })) 
            }
        }
        catch {
            console.log("Erorr")
        }
    }

    const filterTask = taskList.filter((task) => task.contactTaskID === idContact)
    return (<>

        <Grid
            paddingTop={"5%"}
            paddingRight={"5%"}
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="flex-end"
        >
            <IconButton onClick={() => { newNavigate('/comming') }}>
                <HomeIcon color="primary" fontSize="large" />
            </IconButton>
            {filterTask.map(item =>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography startIcon={< ListIcon />}>{item.taskName + " "}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <Grid container
                                direction="column"
                                justifyContent="flex-end"
                                alignItems="flex-end"
                                paddingTop={"1%"}>
                                <Grid direction="column"
                                >
                                    <label class="titels"> :שם המשימה</label>
                                    <br></br>
                                    <span>{item.taskName}</span>
                                    <br></br>
                                    <label class="titels"> :סוג המשימה</label>
                                    <br></br>
                                    <span>{taskType.find(obj => obj.taskTypeId === item.taskTypeId).taskTypeName}</span>
                                    <br></br>
                                    <label class="titels">  :מבצע המשימה</label>
                                    <br></br>
                                    <span>{item.contactTaskName}</span>
                                    <br></br>
                                    <label class="titels">:ת.ז. של מבצע המשימה</label>
                                    <br></br>
                                    <span >{item.contactTaskID}</span>
                                    <br></br>
                                    <label class="titels">:האם בוצע</label>
                                    <br></br>
                                    <span>{item.done}</span>
                                    <br></br>
                                    <Grid
                                        container
                                        direction="row-reverse"
                                        justifyContent="flex-end"
                                        alignItems="flex-end"
                                        paddingBottom={10}
                                        paddingTop={5}
                                        marginRight={"20%"}
                                        spacing={2}
                                    >
                                        <Grid item xs >
                                            <Button variant="outlined" onClick={() => { deleteThisTask(item.taskId) }} startIcon={<DeleteIcon />} >  DeleteTask </Button>
                                        </Grid>
                                        <Grid item xs>
                                            <Button variant="outlined" onClick={() => { update(item.taskId) }} startIcon={<BorderColorIcon />}> Update </Button>
                                        </Grid>
                                        <Grid item xs>
                                            <Button variant="outlined" onClick={() => setImg(!img)} startIcon={<PhotoCameraBackIcon />}> Pictures </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            )}
            <br></br>
        </Grid>
        {img && <Carousel>
            <img src={img1} width={400}></img>
            <img src={img2} width={400}></img>
            <img src={img3} width={400}></img>
        </Carousel>}
        <Stack spacing={20} direction="row-reverse" marginRight={"12%"} marginTop={"2%"} paddingBottom={"39%"}>
            <Button variant="outlined" onClick={add} startIcon={<Add />}>להוספת משימה</Button>
        </Stack>
    </>)
})

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}