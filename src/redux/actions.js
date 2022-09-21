
export const addTodo = (data) => {
    return{
        type: 'todoList/addTodo',
        payload: data
    }
}

export const changeStateList = (data) => {
    return {
        type: 'changeState',
        payload: data
    }
}

export const updateList = (data) => {
    return{
        type: 'todoList/updateList',
        payload: data
    }
}

