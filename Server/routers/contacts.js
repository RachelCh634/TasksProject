const express = require("express")
const router = express.Router()
const Contact = require("../Models/contacts");
const {addContact,getAllContacts,deleteContact} = require("../controllers/contacts");

router.post('/', addContact);
router.delete('/:idNumber', deleteContact);
router.get('/', getAllContacts);

module.exports = router;


