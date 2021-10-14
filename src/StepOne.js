import React from 'react'
import { useForm } from "react-hook-form"
//First step of the form, takes data from the stepOne array
// to dynamically generate input elements and labels 
function StepOne({ data,state,setState,step,nextStep }) {
    const {register,handleSubmit} = useForm()
    const onSubmit=(values)=>{
            console.log(values)
            setState(state,values);
            console.log(state)
    }
    const checkState =()=>{
        if(state.length>0){return true}
        else{return false}
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {data.map(element =>
            <div key={element.code}>
                <label>{element.name}</label>
                <input defaultValue={state[element.code]} {...register(element.code)} name={element.code} />
            </div>)}
            <button onClick={(e) =>{
             handleSubmit(onSubmit)(e.target.value)   
             nextStep(e, step)}}>forward</button>
        </form>)
}

export default StepOne
