import { useEffect } from "react";
import {FormInput} from "../FormInput";
import {ShowList} from "../ShowList";
import { useSelector } from "react-redux";
import { todoListSelector } from "../../redux/selectors";
export default function TodoList(){

    const listTask = useSelector(todoListSelector)
    useEffect(() => {
        const jsonJobs = JSON.stringify(listTask)
        localStorage.setItem('listTask', jsonJobs)
      }, [listTask])

    return(
        <div className="App">
            <div className="App-header">
                <h1>ToDo App</h1>
            </div>
            
            <FormInput typeForm={'add'} />
            <ShowList />
        </div>
        
    )
}