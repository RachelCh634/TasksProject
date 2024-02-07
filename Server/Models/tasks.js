const mongoose = require('mongoose')
const TasksSchema=new mongoose.Schema({
taskId:String,
taskName:String,
taskTypeId:String,
contactTaskID:String,
contactTaskName:String,
done:String
})

module.exports=mongoose.model('Tasks',TasksSchema)

