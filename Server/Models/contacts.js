const mongoose = require('mongoose')

const ContactsSchema=new mongoose.Schema({
    idNumber:String,
    firstName:String,
    lastName:String,
    enailAddress:String,
    phone:String
})

module.exports=mongoose.model('contacts',ContactsSchema)
