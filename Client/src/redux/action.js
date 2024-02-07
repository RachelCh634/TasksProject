//פונקציות של contacts
export function addcontact(contact) {
    return { type: 'ADD_CONTACT', payLoad: contact }
}

export function updateContact(contact) {
    return { type: 'UPDATE_CONTACT_NAME', payLoad: contact }
}

export function deleteContact(contact) {
    return { type: 'DELETE_CONTACT', payLoad: contact }
}

export function getAllContacts(contacts){
    return{type:'GET_ALL_CONTACTS_LIST',payLoad: contacts}
}
//פונקציות של task

export function addTaskList(task) {
    return { type: 'ADD_TASK_LIST', payLoad: task }
}
export function deleteTask(task) {
    return { type: 'DELETE_TASK', payLoad: task }
}
export function getTaskList(tasks) {
    return { type: 'GET_TASK_LIST', payLoad: tasks }
}
export function updateDone(task) {
    return { type: 'UPDATE_DONE', payLoad: task }
}