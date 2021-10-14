import { useForm } from 'react-hook-form'
import React from 'react'   
//Second step of the form, takes data from the stepTwo array
// to dynamically generate input elements and labels 

function StepTwo({ data,state,setState,step,prevStep}) {
    const {register,handleSubmit}=useForm()
    const onSubmit=(values,prevent,e)=>{
        
        console.log(prevent)
        console.log(values)
        setState(state,values);
        alert(JSON.stringify(state))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        {data.map(element =>
            <div key={element.code}>
                <label>{element.name}</label>
                <input defaultValue={state[element.code]} {...register(element.code)} name={element.code} />
            </div>)}
            <button onClick={(e) =>{
             let prevent=true;
             handleSubmit(onSubmit)(e.target.value,prevent,e)
             console.log(e.target.value)   
             prevStep(e, step)}}>back</button>
            <button type="submit">SUBMIT</button>
        </form>)
}

export default StepTwo
