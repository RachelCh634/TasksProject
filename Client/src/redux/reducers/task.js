import { produce } from 'immer';

const initialState = {
    taskType: [
        { taskTypeId: '1', taskTypeName: 'משימה' },
        { taskTypeId: '2', taskTypeName: 'באג' },
        { taskTypeId: '3', taskTypeName: 'עדכון' },
    ],
    taskList: [
    ]
};

export default produce((state, action) => {
    switch (action.type) {
        case 'UPDATE_DONE': {
            state.taskList.find(x => x.taskId == action.payLoad.taskId).done = "true";
        }
            break;
        case 'ADD_TASK_LIST': {
            state.taskList.push(action.payLoad)
        }
            break;
        case 'DELETE_TASK': {
            const index = state.taskList.findIndex(x => x.taskId === action.payLoad.id)
            state.taskList.splice(index, 1)
        }
            break;
        case 'GET_TASK_LIST':
            { state.taskList = action.payLoad; }
            break;
    }
}, initialState)

