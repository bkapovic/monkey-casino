import React from 'react'
import jsonData from './data.json';
import { useState } from 'react';
import { Formik, Values } from 'formik';
import * as Yup from 'yup'
import FormikUseField from './FormikUseField';
import FormContainer from './FormContainer';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { useForm } from "react-hook-form"

function App() {



    //initialize react-hook-form variables
    const { register, handleSubmit, watch } = useForm()
    console.log(watch("First Name"))
    //set initial state for step
    const [step, setStep] = useState(1)
    //form state
    const [formState, setFormState] = useState({})
    const formStateHandler=(oldState,newState)=>{
        let mergedState={...oldState,...newState}
        setFormState(()=>mergedState)
    }
    //Yup schema for validation
    let objSchema = Yup.object().shape(
        {
            code: Yup.string().required(),
            valueStr: Yup.string().required(),
            dataType: Yup.string().required()
        })
    let schema = Yup.array().of(objSchema)
    let testSchema = [{ valueStr: "testName", dataType: "string" }]


    schema.isValid(testSchema).then((res) => { console.log(res, testSchema) })



    //separate json data into 2 steps 
    const stepOne = []
    const stepTwo = []
    const stepSeparator = () => {
        for (let index = 0; index < jsonData.length; index++) {
            if (index < 3) { stepOne.push(jsonData[index]) }
            else { stepTwo.push(jsonData[index]) }
        }
        console.log("step one: ", stepOne, "step two: ", stepTwo)
    }
    stepSeparator()
    //grab names and default values from json data
    let initialValues = []
    jsonData.map((element) => initialValues.push({ code: element["code"], defaultValue: element["defaultValue"] }))
    console.log(initialValues)

    //handlers for setting step state
    const nextStep = (e, prevStep) => {
        e.preventDefault();

        (setStep(prevStep + 1))
        return false
    }
    const prevStep = (e, prevStep) => {
        e.preventDefault();
        return setStep(prevStep - 1)
    }
    //updating state on step change
    const updateState = (prevData) => {

    }

    //formats data to {fields:[{...}]} form before request
    //const formatDataForSending = (data) => {

    //}
    /* const submitHandler = (e) => {
        e.preventDefault();
        submitRegistration(testSchema).then((res)=>{
            console.log(res)}).catch((error)=>{console.log(error)})}
        
    
    

    //Dummy registration api call    
    const submitRegistration = (fields) => {
        return new Promise((fulfill, reject) => {
            //success
            if(schema.isValid(fields)){
            setTimeout(function (fields) {
                console.log(fields)
                fulfill(
                    {
                        "info": {
                            success: true,
                            
                        }
                    }
                );
            }, 1000)};
        },else{
            // error
            setTimeout(function () {
                reject(
                    {
                        "info": {
                            success: false
                        }
                    }
                );
            }, 1000);
        }});
    }
 */
    return (
        <div>
            <FormContainer>
                <div>
                    {step == 1 ?
                        <StepOne step={step}
                            nextStep={nextStep}
                            state={formState}
                            setState={formStateHandler}
                            data={stepOne} /> :
                        <StepTwo step={step}
                            prevStep={prevStep}
                            state={formState}
                            setState={formStateHandler}
                            data={stepTwo} />}

                    {step}{JSON.stringify(formState)}
                </div>
            </FormContainer></div>)

}

export default App
