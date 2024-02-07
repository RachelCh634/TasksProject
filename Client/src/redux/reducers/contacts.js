import { produce } from 'immer';
import axios from "axios";

const initialState = {
    contactsList: [
    ],
};

export default produce( (state, action) => {
    switch (action.type) {
        case 'ADD_CONTACT': {
            state.contactsList.push(action.payLoad)
        }
            break;
        case 'UPDATE_USER': { state.usersList.find(x => x.id == action.payLoad.id).name = action.payLoad.name }
            break;
        case 'GET_ALL_CONTACTS_LIST':
            { state.contactsList = action.payLoad }
            break;
    }
}, initialState)