const Contact = require('../Models/contacts')

exports.addContact = async (req, res) => {
    console.log(req.body);
    const contact = await Contact.create(req.body);
    res.json(contact)
}

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error('Failed to get contacts:', error);
        res.status(500).json({ message: 'Failed to get contacts' });
    }
};

exports.deleteContact = async (req, res) => {
    const idNumber = req.params.idNumber;
    console.log(idNumber);
    try {
        const deletedContact = await Contact.findOneAndDelete({ idNumber: idNumber });
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Failed to delete contact:', error);
        res.status(500).json({ message: 'Failed to delete contact' });
    }
};
