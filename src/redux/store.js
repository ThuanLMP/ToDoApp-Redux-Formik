import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const myMiddleware = store => next => action => {
    if(action.type==='todoList/addTodo' && action.payload.name === 'fuck'){
        action.payload.name = 'Đừng có láo';
    }
    return next(action);
} 
const myMiddleware1 = store => next => action => {
    if(action.type==='todoList/addTodo' && action.payload.name === 'love'){
        action.payload.name = 'Không có yêu đương';
    }
    return next(action);
} 

//const composedEnhancers = composeWithDevTools();

const store = createStore(rootReducer,applyMiddleware(myMiddleware,myMiddleware1,thunk));

export default store