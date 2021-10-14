import { useField } from 'formik'
import React from 'react'

function FormikUseField(props) {
    const [field, meta] = useField(props.name)
    return (
        <div>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <input
                {...field}
                {...props}
            />
            {meta.error && meta.touched && <p>{meta.error}</p>}
        </div>
    )
}

export default FormikUseField
