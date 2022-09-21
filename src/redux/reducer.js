
const initState = {
    stateList: false,
    todoList: JSON.parse(localStorage.getItem('listTask')) || []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'todoList/addTodo':
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    action.payload
                ]
            }
        case 'changeState':
            return {
                ...state,
                stateList: action.payload
            }
        case 'todoList/updateList':
            return {
                ...state,
                todoList: action.payload
            }
        default:
            return state;

    }
}

export default rootReducer