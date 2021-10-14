import React from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
//container for the form, renders children prop
function FormContainer({children}) {
    //spread children for render to avoid can't render object error
    return ({...children})
}

export default FormContainer
