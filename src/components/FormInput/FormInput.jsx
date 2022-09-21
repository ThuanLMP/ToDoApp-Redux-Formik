import React from "react"
import { Formik, Form, Field } from 'formik'
import *as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateList } from "../../redux/actions";
import '../../App.css'
import { todoListSelector } from "../../redux/selectors";


const ValidateInputSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
});

function FormInput({ typeForm,taskEdit,handleEditForm}) {

    const dispatch = useDispatch()
    const todoList = useSelector(todoListSelector)
    const handleAddTaskToList = (value) => {
        dispatch(addTodo(value))
    }
      // Edit Task
      const editTask = (values) => {
        const newList = [...todoList]
        newList[taskEdit.index] = values
        dispatch(updateList(newList))

    }

    return (
        <div className="form-formik">
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                }}
                validationSchema={ValidateInputSchema}
                onSubmit={
                    (values, onSubmitProps) => {
                        onSubmitProps.resetForm()
                        values.deadline = "9/23/2022 8:45"
                        values.completed = false
                        if(typeForm==='add'){
                            handleAddTaskToList(values)
                        }
                        else{
                            editTask(values)
                            handleEditForm(false)
                        }
                    }
                }
            >
                {
                    ({ errors, touched }) => (
                        <Form>
                            <div className="name-block">
                                <Field
                                    className='name'
                                    name="name"
                                    placeholder='Name'
                                />
                                {errors.name && touched.name ? (
                                    <div className="err"> <i class="fa-sharp fa-solid fa-circle-exclamation"></i> {errors.name}</div>
                                ) : null}
                            </div>
                            {typeForm === 'add' ? <button className='btn-add'><i className='fa-solid fa-plus'></i> Add new item</button> : <p></p>}
                            <div className="description-block">
                                <Field className='description' name="description" placeholder='Description...' />
                                {errors.name && touched.description ? (
                                    <div className="err"> <i class="fa-sharp fa-solid fa-circle-exclamation"></i> {errors.description}</div>
                                ) : null}

                            </div>
                            {typeForm === 'edit' ? <button className='btn-edit'> Save </button> : <p></p>}
                        </Form>
                    )
                }
            </Formik>
        </div >
    )
}

export default FormInput