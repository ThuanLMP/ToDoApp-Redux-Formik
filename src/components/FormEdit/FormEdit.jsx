import {FormInput} from "../FormInput";

export default function FormEdit({handleEditForm,taskEdit}) {
    const setEditFormTask = (value) => {
        return handleEditForm(value)
    }
    return (
        <div className='modal'>
            <div className='overlay'>
                <button className='btn-close' onClick={()=>handleEditForm(false)}>&times;</button>
                <h1>Edit Task</h1>
                <div className='form-edit'>
                    <FormInput typeForm='edit' taskEdit = {taskEdit} handleEditForm={setEditFormTask} />
                </div>
            </div>
        </div>
    )
}


